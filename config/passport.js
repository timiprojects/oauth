const FacebookStrategy = require('passport-facebook').Strategy
const User = require('../models/data')
const keys = require('./keys')

module.exports = (passport) => {
  passport.use(new FacebookStrategy({
      clientID: keys.FB_APP_CLIENT_ID,
      clientSecret: keys.FB_APP_CLIENT_SECRET,
      callbackURL: "https://nodeoauth.heokuapp.com/auth/facebook/callback",
      enableProof: true
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({fbId: profile.id}, (err, user) => {
        if (err) return done(null, false, {
          message: 'Error Found!'
        })
        if (user) {
            return done(null, user);
        } else {
          const newuser = new User({
            fbId: profile.id,
            firstname: profile.name.givenName,
            lastname: profile.name.familyName,
            username: profile.displayName,
            //email: profile.emails['type'][0],
            accessToken
          })
          newuser.save().then((new_user)=>{
            return done(null, new_user);
            //return new_user
          })
        }
      })
    }
  ));

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (obj, done) {
    User.findById(obj, function (err, user) {
      done(err, user);
    });
  });
}