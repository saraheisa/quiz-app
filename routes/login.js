const express = require('express');
const router = express.Router();
const { User } = require('../models/users');
const bcrypt = require('bcrypt');
const Joi=require('joi');
const auth = require('../middlewares/auth');
const asyncMiddleware=require('../middlewares/async');
const validateRequest=require('../middlewares/validate');

router.get('/', asyncMiddleware(async (req, res) => {
    res.render('login');
}));

router.post('/', validateRequest(validate),asyncMiddleware(async (req, res) => {
    let user = await User.findOne({
        email: req.body.email
    });
    
    if (!user) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password');

    const token=user.generateAuthToken();
    req.header.token = token;
    res.redirect('/');
}));

function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required(),
    };

    return Joi.validate(req, schema);
}
module.exports = router;