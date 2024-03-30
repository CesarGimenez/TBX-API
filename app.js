const express = require('express')
const app = express()
const cors = require('cors')

const fileRouter = require('./routes/file.router')

app.use(
  cors({
    origin: 'http://localhost:3001',
    methods: 'GET',
    allowedHeaders: 'Content-Type, Authorization'
  })
)

app.use(express.json())
app.use('/files', fileRouter)

module.exports = app
