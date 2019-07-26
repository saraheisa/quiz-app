const joi = require('joi');
const mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    lName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    org: {
        type: String,
        default: ''
    },
    quizes: {
        type: Array,
        default: []
    }
});

userSchema.methods.generateAuthToken = function (){
    return jwt.sign({
        _id: this._id,
        email: this.email
    }, config.get('jwtPrivateKey'));
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
        fName: joi.string().min(3).max(255).required(),
        lName: joi.string().min(3).max(255).required(),
        email: joi.string().min(5).max(255).required().email(),
        password: joi.string().min(5).max(1024).required(),
        org: joi.string()
    };
    return joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
