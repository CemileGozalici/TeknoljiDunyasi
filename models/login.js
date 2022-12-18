const mongoose = require('mongoose');
const Content = require('./content');
const { isEmail } = require('validator');

const loginSchema = mongoose.Schema({
    email: {
        type: String,
        validate: [isEmail, 'eposta adresi boş bırskılamaz']
    },
    password: {
        type: String,
        required: [true,'Parola boş bırskılamaz']
    }
});

module.exports = mongoose.model('Login', loginSchema);