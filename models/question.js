const joi = require('joi');
const mongoose = require('mongoose');

const queSchema = new mongoose.Schema({
    que: {
        type: String,
        required: true,
        maxlength: 255
    },
    answers: {
        type: Array,
        required: true,
        minlength: 2
    },
    correct: {
        type: String,
        required: true
    },
    explanation: {
        type: String,
        required: true
    }
});

const Question = mongoose.model('Question', queSchema);

function validateQue(que) {
    const schema = {
        que: joi.string().max(255).required(),
        answers: joi.array().min(2).required(),
        correct: joi.string().required(),
        explanation: joi.string().required()
    };
    return joi.validate(que, schema);
}

exports.Question = Question;
exports.validate = validateQue;
