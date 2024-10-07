// config/passport-setup.js
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/User"); // Adjust the path based on your project structure
const dotenv = require("dotenv");

dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user.id); // Store user ID in session
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user); // Attach user to request
  });
});

// Google Strategy configuration
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback", // The URL to which Google redirects
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists
        let user = await User.findOne({ googleId: profile.id });
        if (user) {
          done(null, user); // User exists, return the user
        } else {
          // If not, create a new user
          user = await new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
          }).save();
          done(null, user); // Return the new user
        }
      } catch (err) {
        console.error(err);
        done(err, null);
      }
    }
  )
);
