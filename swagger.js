const swaggerJSDoc = require('swagger-jsdoc')

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API TEST TBX',
    version: '1.0.0',
    description: 'API TEST SOLUTION TBX'
  }
}

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js']
}

const swaggerSpec = swaggerJSDoc(options)
module.exports = swaggerSpec
