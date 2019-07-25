const joi = require('joi');
const mongoose = require('mongoose');

const queSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 255
    },
    topiic: {
        type: String,
        required: true,
        maxlength: 255
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    questions: {
        type: Array,
        default: []
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

exports.question = Question;
exports.validate = validateQue;
