const User = require("../models/User");
const bcrypt = require("bcrypt"); 
const { createAccessToken } = require("../utils/token"); 
const { validateEmail } = require("../utils/validation"); 
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ msg: "Please fill all the fields" });
        }

        if (typeof name !== "string" || typeof email !== "string" || typeof password !== "string") {
            return res.status(400).json({ msg: "Please send string values only" });
        }

        // Validate password length and email format
        if (password.length < 4) {
            return res.status(400).json({ msg: "Password length must be at least 4 characters" });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({ msg: "Invalid Email" });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "This email is already registered" });
        }

        // Hash password and create the user
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ name, email, password: hashedPassword });

        // Return success message
        res.status(200).json({ msg: "Congratulations!! Account has been created for you.." });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ status: false, msg: "Please enter all details!!" });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ status: false, msg: "This email is not registered!!" });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ status: false, msg: "Password incorrect!!" });
        }

        // Generate token and send response
        const token = createAccessToken({ id: user._id });

        // Remove password from user object
        delete user.password;

        res.status(200).json({ token, user, status: true, msg: "Login successful.." });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }
};

exports.googleLogin = async (req, res) => {
    const { tokenId } = req.body; // Google ID token from frontend

    try {
        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const { email, name } = ticket.getPayload(); // Get email and name from the payload

        // Check if user already exists
        let user = await User.findOne({ email });
        if (!user) {
            // If not, create a new user
            user = await User.create({ name, email, password: null }); // Password is null for social login
        }

        // Generate token
        const jwtToken = createAccessToken({ id: user._id }); // Use a different variable name to avoid conflict

        // Remove password from user object
        delete user.password;

        res.status(200).json({ token: jwtToken, user, msg: "Google login successful" });
    } catch (error) {
        console.error("Google login error:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};
