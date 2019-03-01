module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        // req.send({

        // })
         res.redirect('/api');
    }
};