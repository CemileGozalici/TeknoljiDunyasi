const mongoose = require('mongoose');
const Content = require('./content');
const { isEmail } = require('validator');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Kulanıcı adı boş bırakılamaz'],
        minlength: [5, 'Kullanıcı ismi için minimum 5 karakter girmelisiniz.'],
        maxlength: [20, 'Kullanıcı ismi için maksimum 20 karakter girmelisiniz.']
    },
    email: {
        type: String,
        validate: [isEmail, 'email alanı boş bırakılamaz']
    },
    password: {
        type: String,
        required: [true,'Parola boş bırskılamaz'],
        minlength: [3, 'parala minimum 3 karakter olmalıdır.']
    }
});

module.exports = mongoose.model('User', userSchema);