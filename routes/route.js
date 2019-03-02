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
        scope: ['email']
    })(req,res,next)
})

router.get('/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/auth'}), function(req, res) {
     res.send(req.user);
})

router.get('/me', ensureAuthenticated, (req, res)=>{
    res.send(req.user);
})

module.exports = router

