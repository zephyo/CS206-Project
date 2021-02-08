const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Quiz = new Schema(
    {
        id: {type: Number, required: true},
        name: String,
        questions: [
            { id: Number, text: String, hiddenText: String, photoId: String, answers: [
                {answerId: Number, answerText: String, correct: Boolean}
            ]}
        ],
        instructions: String
    },
    { timestamps: true },
)

module.exports = mongoose.model('quizzes', Quiz)