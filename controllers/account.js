const User = require('../models/user');
const Login = require('../models/login');
const bcrypt = require('bcrypt');

exports.getLogin = (req, res, next) => {
    var errorMessage = req.session.errorMessage;
    delete req.session.errorMessage;
    res.render('account/login', {
        path: '/login',
        title: 'Login',
        errorMessage: errorMessage
    });
}

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const loginModel = new Login({
        email: email,
        password: password
    });

    loginModel
        .validate()
        .then(() => {
            User.findOne({ email: email })
                .then(user => {
                    if (!user) {
                        req.session.errorMessage = 'Bu mail adresi ile bir kayıt bulunamamıştır.';
                        req.session.save(function (err) {
                            return res.redirect('/login');
                        })
                    }

                    bcrypt.compare(password, user.password)
                        .then(isSuccess => {
                            if (isSuccess) {
                                req.session.user = user;
                                req.session.isAuthenticated = true;
                                return req.session.save(function (err) {
                                    var url = req.session.redirectTo || '/';
                                    delete req.session.redirectTo;
                                    return res.redirect(url);
                                });
                            }
                            req.session.errorMessage = 'hatalı parola girdiniz.';
                            req.session.save(function (err) {
                                return res.redirect('/login');
                            })
                        })
                        .catch(err => {
                            console.log(err);
                        })
                })
                .catch(err => console.log(err));
        })
        .catch(err => {
            if (err.name == 'ValidationError') {
                let message = '';
                for (field in err.errors) {
                    message += err.errors[field].message + '<br>';
                }
                res.render('account/login', {
                    path: '/login',
                    title: 'Login',
                    errorMessage: message
                });
            } else {
                next(err);
            }
        });
}

exports.getRegister = (req, res, next) => {
    var errorMessage = req.session.errorMessage;
    delete req.session.errorMessage;
    res.render('account/register', {
        path: '/register',
        title: 'Register',
        errorMessage: errorMessage
    });
}

exports.postRegister = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const userModel = new User({
        name: name,
        email: email,
        password: password
    });

    userModel
        .validate()
        .then(() => {
            User.findOne({ email: email })
                .then(user => {
                    if (user) {
                        req.session.errorMessage = 'Bu mail adresi ile daha önce kayıt yapılmıştır.';
                        req.session.save(function (err) {
                            console.log(err);
                            return res.redirect('/register');
                        })
                    }
                    else {
                        return bcrypt.hash(password, 10)
                            .then(hashedPassword => {
                                const newUser = new User({
                                    name: name,
                                    email: email,
                                    password: hashedPassword
                                });
                                return newUser.save();
                            })
                            .then(() => {
                                res.redirect('/login');
                            }).catch(err => {
                                console.log(err);
                            })
                    }
                })

        }).catch(err => {
            if (err.name == 'ValidationError') {
                let message = '';
                for (field in err.errors) {
                    message += err.errors[field].message + '<br>';
                }
                res.render('account/register', {
                    path: '/register',
                    title: 'Register',
                    errorMessage: message
                });
            } else {
                next(err);
            }
        })

}

exports.getReset = (req, res, next) => {
    res.render('account/reset', {
        path: '/reset',
        title: 'Reset'
    });
}

exports.postReset = (req, res, next) => {
    res.redirect('/login');
}

exports.getLogout = (req, res, next) => {

    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    })
}