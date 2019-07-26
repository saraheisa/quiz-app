const joi = require('joi');
const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 255
    },
    topic: {
        type: String,
        required: true,
        maxlength: 255
    },
    date: {
        type: String,
        required: true
    },
    isPublished: {
        type: Boolean,
        required: true,
        default: false
    },
    questions: {
        type: Array,
        default: []
    }
});

const Quiz = mongoose.model('Quiz', quizSchema);

function validateQuiz(quiz) {
    const schema = {
        name: joi.string().max(255).required(),
        topic: joi.string().max(255).required(),
        date: joi.string().required(),
        isPublished: joi.boolean().required()
    };
    return joi.validate(quiz, schema);
}

exports.Quiz = Quiz;
exports.validate = validateQuiz;
