const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Quiz = new Schema(
    {
        id: Number,
        name: { type: String, required: true },
        questions: [
            { id: Number, text: String, photoId: Number, answers: [
                {answerId: Number, answerText: String, correct: Boolean}
            ], required: true }
        ],
    },
    { timestamps: true },
)

module.exports = mongoose.model('quizes', Quiz)