const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Response = new Schema(
    {
        quizId: Number,
        answers: [{
            questionId: Number,
            answerId: Number,
            coordinates: {x: Number, y: Number}
        }]
    },
    { timestamps: true },
)

module.exports = mongoose.model('responses', Response)