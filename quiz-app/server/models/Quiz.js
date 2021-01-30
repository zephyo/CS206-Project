const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Quiz = new Schema(
    {
        id: Number,
        name: String,
        questions: [
            { id: Number, text: String, photoId: String, answers: [
                {answerId: Number, answerText: String, correct: Boolean}
            ]}
        ],
    },
    { timestamps: true },
)

module.exports = mongoose.model('quizzes', Quiz)