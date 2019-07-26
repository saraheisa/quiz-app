const express = require('express');
const router = express.Router();
const { User } = require('../models/users');
const auth = require('../middlewares/auth');
const asyncMiddleware=require('../middlewares/async');
const validateRequest=require('../middlewares/validate');

// check if there's a valid token 
// if true render the home
// if false render login

router.get('/', [auth],asyncMiddleware(async (req, res) => {
    const id = req.user._id;
    // get user data from db and render
    console.log(id);
    console.log(req.header.token);

    const user = await User.findById(id);
    if (!user) return res.status(404).send(`the user with id: ${id} can't be found`);
    
    res.render('home', {
        name: user.fName + ' ' + user.lName,
        org: user.org,
        quizes: user.quizes,
        token: req.header.token
    });
}));

module.exports = router;