const express = require('express')
const app = express()
const cors = require('cors')
const swaggerUI = require('swagger-ui-express')
const swaggerSpec = require('./swagger')

const fileRouter = require('./routes/file.router')

app.use(
  cors({
    origin: 'http://localhost:3001',
    methods: 'GET',
    allowedHeaders: 'Content-Type, Authorization'
  })
)

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

app.use(express.json())
app.use('/files', fileRouter)

module.exports = app
