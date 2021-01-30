const _ = require('lodash')
const Quiz = require('../models/Quiz')
const Response = require('../models/Response')

/*
{
    "questions": [integer (of questionIDs)],
    "quiz_name": string,
    "quiz_instructions": string
}
*/
getQuizSchema = async (req, res) => {

    await Quiz.find({}, (err, quizzes) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!quizzes.length) {
            return res
                .status(404)
                .json({ success: false, error: `No Quizzes` })
        }
        req.session.response_id = null

        req.session.quiz_id = 0

        const response = new Response({
            quiz_id: req.session.quiz_id,
            answers: []
        })

        if (!response) {
            return res.status(400).json({ success: false, error: err })
        }
    
        response
            .save()
            .then(() => {
                req.session.response_id = response._id
            })
            .catch(error => {
                return res.status(400).json({
                    error,
                    message: 'Response not created!',
                })
            })

        return res.status(200).json({ success: true, data: {
            "questions": _.map(quizzes[0].questions, (v) => v.id),
            "quiz_name": quizzes[0].name,
            "quiz_instructions": "test instructions"
        } })
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


/*
{
    "question_text": string,
    "question_photo_id": integer,
    "answers" : [{answerId: Number, answerText: String, correct: Boolean}]
}
*/
getQuestionById = async (req, res) => {
    await Quiz.findOne({ id: req.session.quiz_id || 0 }, (err, quiz) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!quiz) {
            return res
                .status(404)
                .json({ success: false, error: `Quiz not found` })
        }

        question = _.find(quiz.questions, (q) => q.id == req.params.id)

        if (!question) {
            return res
                .status(404)
                .json({ success: false, error: `Question not found` })
        }

        return res.status(200).json({ success: true, data: {
            "question_text": question.text,
            "question_photo_id": question.photoId,
            "answers" : question.answers
        } })
    }).catch(err => console.log(err))
}

/*
{
    "url": url
}
*/
getPhotoById = async (req, res) => {
    return res.status(200).json({ success: true, data: {
        "url": req.protocol+"://"+req.host+":8000/photos/politicianshouses/"+req.params.id,
        "test": req.headers
    } })
}

/*
payload:
{
    "answer_number": integer,
    "question_id": integer,
    "area_selected":{
        "x": integer,
        "y": integer
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

    Response.findOne({ _id: req.session.response_id }, (err, response) => {
        if (err || !response) {
            return res.status(404).json({
                err,
                message: 'Response not found!',
            })
        }
        
        response.answers = _.concat(response.answers, {
            questionId: req.body.question_id,
            answerId: req.body.answer_number,
            coordinates: {x: req.body.area_selected.x, y: req.body.area_selected.y}
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
    return res.status(200).json({ success: true, data: {
        "correct": 2,
        "wrong": 0
    } })
    await Movie.find({}, (err, movies) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!movies.length) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }
        return res.status(200).json({ success: true, data: movies })
    }).catch(err => console.log(err))
}


//old stuff

createMovie = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a movie',
        })
    }

    const movie = new Movie(body)

    if (!movie) {
        return res.status(400).json({ success: false, error: err })
    }

    movie
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: movie._id,
                message: 'Movie created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Movie not created!',
            })
        })
}

updateMovie = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Movie.findOne({ _id: req.params.id }, (err, movie) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Movie not found!',
            })
        }
        movie.name = body.name
        movie.time = body.time
        movie.rating = body.rating
        movie
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: movie._id,
                    message: 'Movie updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Movie not updated!',
                })
            })
    })
}

deleteMovie = async (req, res) => {
    await Movie.findOneAndDelete({ _id: req.params.id }, (err, movie) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!movie) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }

        return res.status(200).json({ success: true, data: movie })
    }).catch(err => console.log(err))
}

getMovieById = async (req, res) => {
    await Movie.findOne({ _id: req.params.id }, (err, movie) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!movie) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }
        return res.status(200).json({ success: true, data: movie })
    }).catch(err => console.log(err))
}

getMovies = async (req, res) => {
    await Movie.find({}, (err, movies) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!movies.length) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }
        return res.status(200).json({ success: true, data: movies })
    }).catch(err => console.log(err))
}

module.exports = {
    createMovie,
    updateMovie,
    deleteMovie,
    getMovies,
    getMovieById,
    getQuizSchema,
    getQuestionById,
    getPhotoById,
    sendAnswer,
    getResults,
    newQuizSchema
}