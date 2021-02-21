const express = require('express')
const multer = require('multer')

const QuizCtrl = require('../controllers/quiz-ctrl')

const router = express.Router()

const upload = multer({ dest: __dirname + '/../uploads/' })

router.get('/schema/:quiz_id', QuizCtrl.getQuizSchema)
router.post('/schema', QuizCtrl.newQuizSchema)
router.delete('/schema/:quiz_id', QuizCtrl.deleteQuizSchema)
router.get('/question/:quiz_id/:question_id', QuizCtrl.getQuestionById)
router.get('/photo/:photo_id', QuizCtrl.getPhotoURL)
router.get('/photo/display/:photo_id', QuizCtrl.getPhotoById)
router.post('/photo', upload.single('image'), QuizCtrl.uploadPhoto)
router.post('/answer/', QuizCtrl.sendAnswer)
router.get('/results/:quiz_id/:response_id', QuizCtrl.getResults)

module.exports = router