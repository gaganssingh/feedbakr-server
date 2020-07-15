const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

// Import the "users" schema create inside models/Users.js
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
   done(null, user.id); // user.id comes from MondoDB assigned id
});

passport.deserializeUser((id, done) => {
   User.findById(id).then((user) => {
      done(null, user);
   });
});

passport.use(
   new GoogleStrategy(
      {
         clientID: keys.googleClientID,
         clientSecret: keys.googleClientSecret,
         // after the user grants permission
         // they'll be redirected to the following url
         callbackURL: "/auth/google/callback",
         // trust the heroku proxy upon redirect
         proxy: true,
      },
      // Callback function automatically called after
      //  a user is redirected after logging in using google
      (accessToken, refreshToken, profile, done) => {
         // Check if user already exists in the db
         User.findOne({ googleId: profile.id }).then((existingUser) => {
            if (existingUser) {
               // User already exists in the db => do nothing
               // Tell passport that we are "done"
               done(null, existingUser);
            } else {
               // User dowsn't exist => make a new user
               // Inside the mongoose model, create a userId
               // by getting profile.id after Google OAuth flow
               // Saving to mongoDB database
               new User({ googleId: profile.id })
                  .save()
                  .then((user) => done(null, user));
            }
         });
      }
   )
);
