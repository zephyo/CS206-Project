const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Response = new Schema(
    {
        quizId: Number,
        answers: [{
            questionId: Number,
            answer: Object
        }]
    },
    { timestamps: true },
)

module.exports = mongoose.model('responses', Response)