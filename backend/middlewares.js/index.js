const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { ACCESS_TOKEN_SECRET } = process.env;

exports.verifyAccessToken = async (req, res, next) => {
	const token = req.header("Authorization");
	if (!token)
		return res.status(400).json({ status: false, msg: "Token not found" });
	let user;
	try {
		// Verify the token with the secret key
		user = jwt.verify(token, ACCESS_TOKEN_SECRET);
	} catch (err) {
		return res.status(401).json({ status: false, msg: "Invalid token" });
	}

	try {
		// Find the user in the database
		user = await User.findById(user.id);
		if (!user) {
			return res.status(401).json({ status: false, msg: "User not found" });
		}
		// Attach the user to the request object
		req.user = user;
		next();
	} catch (err) {
		console.error(err);
		return res
			.status(500)
			.json({ status: false, msg: "Internal Server Error" });
	}
};
