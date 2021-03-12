const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const uest = require('uest')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')


const db = require('./db')
const quizRouter = require('./routes/quiz-router')

const serverApp = express()
const apiPort = 3000

serverApp.use(bodyParser.urlencoded({ extended: true }))
serverApp.use(cors())
serverApp.use(uest())
serverApp.use(bodyParser.json())



db.on('error', console.error.bind(console, 'MongoDB connection error:'))

serverApp.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
serverApp.use('/api', quizRouter)

serverApp.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))