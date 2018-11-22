const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

//------------------------------
//  LOCAL STRATEGY
//------------------------------
// by default looks for username on username field
const localOptions = {
    usernameField: 'email'
};

const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
    // Verify username & password -> call done with the user if correct
    // otherwise call done with false
    User.findOne({ email: email }, function(err, user) {
        if(err) { return done(err); }
        if(!user) { return done(null, false); }

        // compare passwords - is (password) === user.password
        user.comparePassword(password, function(err, isMatch){
            if(err) { return done(err); }
            if(!isMatch) { return done(null, false); }

            return done(null, user);
        })
    })

})

//------------------------------
//  JWT STRATEGY
//------------------------------
// Setup options for JWT Strategy
const jwtOptions = {
    // specify where to look for jwt tokens
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    // the secret
    secretOrKey: config.secret
};

// Create JWT strategy
// arg1 - options
// arg2 - function called whenever authentication occurs
//      payload - object called with jwt.encode method - here = sub, iat
//      done - callback executed with authentication status(false/user) and err
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    // See if the user ID in the payload exists in our database
    // If it does, call 'done' with that user object
    // otherwise, call done without a user object
    User.findById(payload.sub, function(err, user) {
        if(err) { return done(err, false); }

        if(user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
});


// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);