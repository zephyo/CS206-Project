const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

const db = require('./db')
const quizRouter = require('./routes/quiz-router')

const app = express()
const apiPort = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use('/api', quizRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))