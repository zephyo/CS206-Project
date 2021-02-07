const _ = require('lodash')
const Quiz = require('../models/Quiz')
const Response = require('../models/Response')

/*
{
    quiz: {
        "quiz_id": integer
        "questions": [integer (of questionIDs)],
        "quiz_name": string,
        "quiz_instructions": string
    },
    response_id: integer
}
*/
getQuizSchema = async (req, res) => {

    await Quiz.findOne({ id: req.params.quiz_id }, (err, quiz) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!quiz) {
            return res
                .status(404)
                .json({ success: false, error: `No Quiz found` })
        }

        const quiz_id = req.params.quiz_id

        const response = new Response({
            quiz_id: quiz_id,
            answers: []
        })

        if (!response) {
            return res.status(400).json({ success: false, error: err })
        }
    
        response
            .save()
            .then(() => {

                const response_id = response._id

                return res.status(200).json({ success: true, data: {
                    quiz: {
                        quiz_id: quiz_id,
                        questions: _.map(quiz.questions, (v) => v.id),
                        quiz_name: quiz.name,
                        quiz_instructions: quiz.instructions
                    },
                    response_id: response_id
                }
                })
            })
            .catch(error => {
                return res.status(400).json({
                    error,
                    message: 'Response not created!',
                })
            })
    }).catch(err => console.log(err))
}

newQuizSchema = async (req, res) => {

    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a quiz',
        })
    }

    const quiz = new Quiz(body)

    if (!quiz) {
        return res.status(400).json({ success: false, error: err })
    }

    quiz
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: quiz._id,
                message: 'Quiz created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Quiz not created!',
            })
        })
}

deleteQuizSchema = async (req, res) => {

    const id = req.params.quiz_id

    if (!id) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a quiz',
        })
    }

    Quiz.deleteOne({ id: id }, function (err) {
        if(err) return res.status(400).json({ success: false, error: err });
        return res.status(201).json({
            success: true,
            message: 'Quiz deleted!',
        })
    })

}



//correct is a 0 or 1 if question type is mutliple_choice or a zero indexed index corresponding to the correct order if it’s a ranking question
/*
{
    "question_text": string,
    "question_photo_id": string,
    "question_type": multiple_choice | ranking
    "answers" : [{answerId: Number, answerPhoto: String, answerText: String, correct: Number, percentOfAnswer: Number}],
    "hidden_text": string
}
*/
getQuestionById = async (req, res) => {
    await Quiz.findOne({ id: req.params.quiz_id }, (err, quiz) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!quiz) {
            return res
                .status(404)
                .json({ success: false, error: `Quiz not found` })
        }

        question = _.find(quiz.questions, (q) => q.id == req.params.question_id)

        if (!question) {
            return res
                .status(404)
                .json({ success: false, error: `Question not found` })
        }

        return res.status(200).json({ success: true, data: {
            "question_text": question.text,
            "question_photo_id": question.photoId,
            "question_type": question.question_type,
            "answers" : _.map(question.answers, (a) => {
                return {
                    percentOfAnswer: 50,
                    answerId: a.answerId,
                    answerText: a.answerText,
                    answerPhoto: a.answerPhoto,
                    correct: a.correct,
                }
            }),
            "hidden_text": question.hiddenText
        } })
    }).catch(err => console.log(err))
}

/*
{
    "url": url
}
*/
getPhotoById = async (req, res) => {
    // TODO need to add in a way to add the base URL to the quiz Schema
    return res.status(200).json({ success: true, data: {
        "url": req.protocol+"://"+req.hostname+":8000/photos/politicianshouses/"+req.params.id,
        "test": req.headers
    } })
}

/*
payload:
{
    "quiz_id": integer,
    "question_id": integer,
    "response_id": integer,
    "answer": multiple_choice: {
        "answer_number": integer,
        "area_selected":{
            "x": integer,
            "y": integer
        }
    } | ranking: {
        answer_order: [answer_ids]
    }

}
*/
sendAnswer = (req, res) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide information to update with',
        })
    }

    Response.findOne({ _id: req.body.response_id}, (err, response) => {
        if (err || !response) {
            return res.status(404).json({
                err,
                message: 'Response not found!',
            })
        }
        
        response.answers = _.concat(response.answers, {
            questionId: req.body.question_id,
            answer: req.body.answer,
        })

        response
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: response._id,
                    message: 'Response updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Response not updated!',
                })
            })
    })
}

/*
{
    "correct": integer,
    "wrong": integer
}
*/
getResults = async (req, res) => {
    //Hardcoded for only one quiz
    Quiz.findOne({id: req.params.quiz_id || 0}, (err, quiz) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!quiz) {
            return res
                .status(404)
                .json({ success: false, error: `Quiz not found` })
        }
        total_correct = 0; 
        total_wrong = 0; 
        Response.findOne({_id: req.params.response_id}, (err, response) => {
            if (err) {
                return res.status(400).json({ success: false, error: err })
            }
            if (!response) {
                return res
                    .status(404)
                    .json({ success: false, error: `Response not found` })
            }
            num_questions = 0
            total_correct = _.sumBy(response.answers, (response_answer) => {
                quiz_question = _.find(quiz.questions, (quiz_question) => quiz_question.id == response_answer.questionId)
                switch (quiz_question.question_type){
                    case 'multiple_choice':
                        num_questions += 1
                        quiz_question_answer = _.find(quiz_question.answers, (quiz_question_answer) => quiz_question_answer.answerId == response_answer.answer.answer_number)
                        return quiz_question_answer.correct
                    case 'ranking':
                        index = 0
                        return _.sumBy(response_answer.answer.answer_order, (answerId) => {
                            num_questions += 1
                            quiz_question_answer = _.find(quiz_question.answers, (quiz_question_answer) => quiz_question_answer.answerId == answerId)
                            toReturn = quiz_question_answer.correct == index ? 1 : 0
                            index += 1
                            return toReturn
                        })
                    default:
                        return 0
                }
            })
            console.log(num_questions)
            console.log(total_correct)
            total_wrong = num_questions - total_correct;
            req.params.response_id = null; 
            return res.status(200).json({ success: true, data: {
                "numCorrect" : total_correct,
                "numWrong" : total_wrong
            } })
        }).catch(err => console.log(err))
    }).catch(err => console.log(err))
}


module.exports = {
    getQuizSchema,
    getQuestionById,
    getPhotoById,
    sendAnswer,
    getResults,
    newQuizSchema,
    deleteQuizSchema
}