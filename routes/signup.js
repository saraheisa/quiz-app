const express = require('express');
const router = express.Router();
const { User, validate } = require('../models/users');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const asyncMiddleware=require('../middlewares/async');
const validateRequest=require('../middlewares/validate');

router.get('/', asyncMiddleware(async (req, res) => {
    res.render('signup');
}));

router.post('/', validateRequest(validate),asyncMiddleware(async (req, res) => {

    let user = await User.findOne({
        email: req.body.email
    });

    if (user) return res.status(400).send('User Already registered');

    user = new User(_.pick(req.body, ['fName', 'lName', 'email', 'org', 'password']));

    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token=user.generateAuthToken();
    req.header.token = token;
    res.redirect('/');
}));

module.exports = router;