const passport = require("passport");

module.exports = (app) => {
   // OAuth route for Google OAuth
   app.get(
      "/auth/google",
      passport.authenticate("google", {
         scope: ["profile", "email"],
      })
   );

   // Use the code received from the Google OAuth above
   // to get info about the user from google
   app.get("/auth/google/callback", passport.authenticate("google"));
};
