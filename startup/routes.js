const homeEndPoint = '/';
const loginEndPoint = '/login';
const signupEndPoint = '/signup';
const quizesEndPoint = '/quizes';

const express = require('express');
const home = require('../routes/home');
const quizes = require('../routes/quizes');
const login = require('../routes/login');
const signup = require('../routes/signup');
// const error = require('../middlewares/error');



module.exports = function (app) {
    app.use(express.json());
    app.use(homeEndPoint, home);
    app.use(quizesEndPoint, quizes);
    app.use(loginEndPoint, login);
    app.use(signupEndPoint, signup);
    // app.use(error);
}