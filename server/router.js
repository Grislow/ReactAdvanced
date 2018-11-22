const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// by default passport tries to open a cookie session - hence { session: false }
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
    // req -> incoming http request
    // res -> outgoing response to http request
    // next -> used for error handling
    // app.get('/', function(req, res, next) {
    //     res.send(['water', 'phone', 'whatever']);
    // });

    app.get('/', requireAuth, function(req, res) {
        res.send({ hi: 'there' });
    })

    app.post('/signin', requireSignin, Authentication.signin);

    app.post('/signup', Authentication.signup);
}