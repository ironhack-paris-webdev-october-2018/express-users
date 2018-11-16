const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const User = require("../../models/user-model.js");


passport.use(new GoogleStrategy({
  // settings object for the GoogleStrategy class
  clientID: "blah",
  clientSecret: "blah",
  callbackURL: "/google/user-info",
  proxy: true, // need this for production version to work 🤷‍♀️
}, (accessToken, refreshToken, userInfo, done) => {
  // callback function that runs whenever a user accepts the Google login
  // (here we receive their information and decide how to save it)
  console.log("GOOGLE user info -----------------------------------", userInfo);
  const { displayName, emails } = userInfo;

  // search the database to see if they already have a user account
  User.findOne({ email: { $eq: emails[0].value } })
    .then(userDoc => {
      if (userDoc) {
        // use the existing account if we found one
        done(null, userDoc);
        return;
      }
      // otherwise create a new user account for them
      User.create({ fullName: displayName, email: emails[0].value })
        .then(userDoc => {
          // call done() with null and the result if it's successful
          // (the result is the user document from the database)
          done(null, userDoc);
        })
        // call done() with the error object if it fails
        .catch(err => done(err));
    })
    // call done() with the error object if it fails
    .catch(err => done(err));
}));
