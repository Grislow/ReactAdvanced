const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define our model
// key = schema field name
// value = object with the fields attributes
const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: String
});

// On Save Hook, encrypt password
// pre - run before a specified action
// 'save' - specific action, in this case saving a model
// function(next){..} - ran before saving
userSchema.pre('save', function(next) {
    // get access to the user model
    const user = this;

    // generate a salt then run callback
    bcrypt.genSalt(10, function(err, salt) {
        if (err) { return next(err); }

        // hash(encrypt) our password using the salt
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) { return next(err) ; }

            // overwrite plain text password with encrypted password
            user.password = hash;
            next();
        });
    })
})

// methods = whenever a user is instantiated it will have access to the defined instance method
userSchema.methods.comparePassword = function(candidatePassword, callback) {
    // hashes candidatePassword and adds salt then compares to the user instances password
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if(err) { return callback(err) };

        callback(null, isMatch);
    })
}


// Create the model class
// -loads schema into mongoose
// -connects schema to the 'user' collection
const ModelClass = mongoose.model('user', userSchema);


// Export the model
module.exports = ModelClass;