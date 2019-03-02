const express = require('express')
const router = express.Router()

const passport = require('passport')
const { ensureAuthenticated } = require('../config/auth')

router.get('/', (req, res)=>{
    res.render('index', {
        title: 'login'
    })
})

router.get('/authenticate', (req, res, next)=>{
    passport.authenticate('facebook', {
        scope: ['email', 'public_profile', 'user_location']
    })(req,res,next)
})

router.get('/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/'}), function(req, res) {
     res.redirect('/home');
})

router.get('/home', ensureAuthenticated, (req, res)=>{
    res.render('pages/home', {
        title: 'home'
    });
})

module.exports = router

