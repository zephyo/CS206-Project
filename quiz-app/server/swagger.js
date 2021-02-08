const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./index.js']

const doc = {
    info: {
        title: "News Quiz API",
        description: "API to assist with news quiz application"
    },
    host: "localhost:3000",
    schemes: ['http']
}

swaggerAutogen(outputFile, endpointsFiles, doc)