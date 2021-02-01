const express = require('express')

const QuizCtrl = require('../controllers/quiz-ctrl')

const router = express.Router()

router.get('/schema', QuizCtrl.getQuizSchema)
router.post('/schema', QuizCtrl.newQuizSchema)
router.get('/question/:quiz_id/:question_id', QuizCtrl.getQuestionById)
router.get('/photo/:id', QuizCtrl.getPhotoById)
router.post('/answer', QuizCtrl.sendAnswer)
router.get('/results/:quiz_id/:response_id', QuizCtrl.getResults)

module.exports = router