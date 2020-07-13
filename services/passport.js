const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

// Import the "users" schema create inside models/Users.js
const User = mongoose.model("users");

passport.use(
   new GoogleStrategy(
      {
         clientID: keys.googleClientID,
         clientSecret: keys.googleClientSecret,
         // after the user grants permission
         // they'll be redirected to the following url
         callbackURL: "/auth/google/callback",
      },
      // Callback function automatically called after
      //  a user is redirected after logging in using google
      (accessToken, refreshToken, profile, done) => {
         // Inside the mongoose model, create a userId
         // by getting profile.id after Google OAuth flow
         // Saving to mongoDB database
         new User({ googleId: profile.id }).save();
      }
   )
);
