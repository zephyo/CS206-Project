const express = require('express')

const QuizCtrl = require('../controllers/quiz-ctrl')

const router = express.Router()

router.get('/schema', QuizCtrl.getQuizSchema)
router.get('/question/:id', QuizCtrl.getQuestionById)
router.get('/photo/:id', QuizCtrl.getPhotoById)
router.post('/answer', QuizCtrl.sendAnswer)
router.get('/results', QuizCtrl.getResults)

module.exports = router