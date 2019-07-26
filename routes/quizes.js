const express = require('express');
const router = express.Router();
const { Quiz, validate } = require('../models/quiz');
const { User} = require('../models/users');
const { Question} = require('../models/question');
const _ = require('lodash');
const auth = require('../middlewares/auth');
const asyncMiddleware=require('../middlewares/async');
const validateRequest=require('../middlewares/validate');

// check if there's a valid token 
// if true render the home
// if false render login

router.post('/', [auth, validateRequest(validate)],asyncMiddleware(async (req, res) => {
    const id = req.user._id;
    
    const quiz = new Quiz(_.pick(req.body, ['name', 'topic', 'date', 'isPublished']));

    let user = await User.findOne({
        _id: id
    });

    user.quizes.push(quiz);
    await user.save();
    
    res.status(200).send({id: quiz._id});
    
}));

router.get('/', [auth],asyncMiddleware(async (req, res) => {
    const userId = req.user._id;
    const quizId = req.query.id;

    let user = await User.findOne({
        _id: userId
    });
    
    const quiz = user.quizes.filter(quiz => quiz._id == quizId);
    
    res.render('quizview',{
        quiz: quiz[0],
        token: req.header.token
    });
    
}));

router.put('/', [auth],asyncMiddleware(async (req, res) => {
    const id = req.user._id;
    const quizId = req.query.id;

    let user = await User.findOne({
        _id: id
    });

    let index;

    for (let i = 0, len = user.quizes.length; i < len; i++) {
        const element = user.quizes[i];
        if (element._id == quizId) {
            index = i;
            break;
        }
    }

    if (req.body.que) {
        
        const question = new Question(_.pick(req.body, ['que', 'answers', 'correct', 'explanation']));

        user.quizes[index].questions.push(question);
        user.markModified('quizes');
        await user.save();
        
        res.status(200).send({id: question._id});
    }else{
        user.quizes[index].isPublished = true;
        user.markModified('quizes');
        await user.save();
        
        res.status(200).send({message: 'published'});
    }
    
}));

module.exports = router;