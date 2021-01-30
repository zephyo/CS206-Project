const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db')
const quizRouter = require('./routes/quiz-router')

const app = express()
const apiPort = 3000

app.use(session({secret: "somestring"}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', quizRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))