const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const UserEmaily = mongoose.model('emaily_users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  UserEmaily.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      UserEmaily.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          // we already have a GoogleId record
          done(null, existingUser); // 'null' is the error
        } else {
          new UserEmaily({ googleId: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
