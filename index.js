const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const app = express()

const blogsRouter = require('./controllers/blogs')
//const middleware = require('./utils/middleware')

const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')

//CONNECT TO MONGODB
mongoose.connect(config.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        logger.info('Connected to MongoDB')
    })
    .catch ((error) => {
        logger.error('Error during connection to MongoDB', error.message)
    })


app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan('tiny'))

app.use('/api/blogs', blogsRouter)

//app.use(middleware.requestLogger)
//app.use(middleware.unknownEndpoint)
//app.use(middleware.errorHandler)

app.get('/', (req, res) => {
    res.send('<h1>Welcome to Blogilista-app!</h1>')
})

const server = http.createServer(app)

server.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})