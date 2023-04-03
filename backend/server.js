require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')

const { processCommand } = require('./utils/processCommand')

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/', (req, res) => {
  const response = processCommand(req.body.command)
  res.json({
    response: `executed method ${response.method} with status ${response.status}`,
    result: response.result
  })
})

app.listen(process.env.SERVER_PORT, () => console.log('Server started'))
