const mongoose = require('mongoose')
const detectEnvironment = require('detect-environment')

const ENVIRONMENT = detectEnvironment();

mongoose
.connect('mongodb://127.0.0.1:27017/quiz', { useNewUrlParser: true })
.catch(e => {
    console.error('Connection error', e.message)
})


const db = mongoose.connection

module.exports = db