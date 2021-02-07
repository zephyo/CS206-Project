const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Quiz = new Schema(
    {
        id: {type: Number, required: true},
        name: String,
        questions: [
            { id: Number, question_type: String, text: String, hiddenText: String, photoId: String, answers: [
                {answerId: Number, answerPhoto: String, answerText: String, correct: Number}
            ]}
        ],
        instructions: String
    },
    { timestamps: true },
)

module.exports = mongoose.model('quizzes', Quiz)