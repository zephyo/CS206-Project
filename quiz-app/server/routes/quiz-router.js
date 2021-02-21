const express = require('express')

const QuizCtrl = require('../controllers/quiz-ctrl')

const router = express.Router()

router.get('/schema/:quiz_id', QuizCtrl.getQuizSchema)
router.post('/schema', QuizCtrl.newQuizSchema)
router.delete('/schema/:quiz_id', QuizCtrl.deleteQuizSchema)
router.get('/question/:quiz_id/:question_id', QuizCtrl.getQuestionById)
router.post('/photo/:quiz_id', QuizCtrl.getPhotoById)
router.post('/answer/', QuizCtrl.sendAnswer)
router.get('/results/:quiz_id/:response_id', QuizCtrl.getResults)

module.exports = router