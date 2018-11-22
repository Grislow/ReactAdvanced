const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

// this function encodes a users password using the random string from config
// sub - as convention jwt have subjects - who the token is about
// iat - issued at time
function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret)
}

exports.signin = function(req, res, next) {
    // user had email/pass auth'd, give them a token 
    res.send({ token: tokenForUser(req.user) });
}

exports.signup = function(req, res, next) {
    const email     = req.body.email,
          password  = req.body.password;
    
    if(!email || !password) {
        return res.status(422).send({ error: 'You must provide an email and password'});
    }

    // Check if email exists in db
    User.findOne({ email: email }, function(err, existingUser) {
        // handle db errors
        if (err) { 
            return next(err); 
        }

        // If true return error
        if (existingUser){
            //error code 422 = unprocessable entity
            return res.status(422).send({ error: 'Email is in use'});
        }

        // If false create and save user record
        const user = new User({ email: email, password: password});

        user.save(function(err){
            if (err) { 
                return next(err); 
            }

            // Respond to request indicating the user was created
            res.json({ token: tokenForUser(user) });
        });

    });
}