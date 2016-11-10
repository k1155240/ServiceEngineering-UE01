var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;



exports.init = function(app) {
    passport.use(new FacebookStrategy({
        clientID: '559105414283188',
        clientSecret: '2bfd1e271df4c63f8788d588ef17b43f',
        callbackURL: "http://localhost:7777/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        console.log('profile');
    }
    ));

    app.get('/auth/facebook', passport.authenticate('facebook'));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { 
            successRedirect: '/',
            failureRedirect: '/login' 
    }));
}