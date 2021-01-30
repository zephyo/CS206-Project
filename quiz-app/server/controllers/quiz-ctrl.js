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
    // return res.status(200).json({ success: true, data: {
    //     "number_of_questions": 2,
    //     "quiz_name": "houses",
    //     "quiz_instructions": "foooobarrr"
    // } })

    await Quiz.find({}, (err, quizzes) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!quizzes.length) {
            return res
                .status(404)
                .json({ success: false, error: `No Quizzes` })
        }
        return res.status(200).json({ success: true, data: {
            "questions": _.map(quizzes[0].questions, (v) => v.id),
            "quiz_name": quizzes[0].name,
            "quiz_instructions": "test instructions"
        } })
    }).catch(err => console.log(err))
}

/*
{
    "question_text": string,
    "question_photo_id": integer
}
*/
getQuestionById = async (req, res) => {
    return res.status(200).json({ success: true, data: {
        "question_text": "Whose House is this?",
        "question_photo_id": "3"
    } })

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

/*
{
    "url": url
}
*/
getPhotoById = async (req, res) => {
    return res.status(200).json({ success: true, data: {
        "url": req.headers.host+"house3"
    } })

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
    return res.status(201).json({
        success: true,
        // id: movie._id,
        message: 'Movie created!',
    })

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
    getResults
}