const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose'); //Link passport to user model

const UserSchema = new Schema({
    email: { //We don't need to add a password here as passport covers that
        type: String,
        required: true,
        unique: true
    }
});

UserSchema.plugin(passportLocalMongoose);
//Adds username, hash, and salt field to store username, hashed password
//and the salt value

module.exports = mongoose.model('User', UserSchema);