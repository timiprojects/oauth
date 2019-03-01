const facebookStrategy = require('passport-facebook').Strategy
const User = require('../models/data')
const keys = require('./keys')

module.exports = (passport) => {
  passport.use(new facebookStrategy({
      clientID: keys.FB_APP_CLIENT_ID,
      clientSecret: keys.FB_APP_CLIENT_SECRET,
      callbackURL: "http://127.0.0.1:12345/api/home"
    },
    function (accessToken, refreshToken, profile, done) {
      User.findById(profile.id, (err, user) => {
        if (err) return done(null, false, {
          message: 'Error Found!'
        })
        if (!user) {
            const newuser = new User({

            })
            newuser.save().then((userInfo)=>{
              return done(null, userInfo);
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