const facebookStrategy = require('passport-facebook').Strategy
const User = require('../models/data')
const keys = require('./keys')

module.exports = (passport) => {
  passport.use(new facebookStrategy({
      clientID: keys.FB_APP_CLIENT_ID,
      clientSecret: keys.FB_APP_CLIENT_SECRET,
      callbackURL: "https://nodeoauth.herokuapp.com/api/home"
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({fbId: profile.id}, (err, user) => {
        if (err) return done(null, false, {
          message: 'Error Found!'
        })
        if (!user) {
            const newuser = new User({
              fbId: profile.id,
              firstname: profile.name.givenName,
              lastname: profile.name.familyName,
              username: profile.displayName,
              email: profile.emails[0].type
            })
            newuser.save().then((user)=>{
              return done(null, user);
            })
        } 
        return done(null, user);
      })
    }
  ));

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
}