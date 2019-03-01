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
        successRedirect: '/api/home',
        successMessage: 'Login Successful',
        failureRedirect: '/api'
    })(req,res,next)
})

router.get('/home', ensureAuthenticated, (req, res)=>{
    console.log(req.profile)
    res.render('pages/home', {
        title: 'home'
    });
})

module.exports = router

