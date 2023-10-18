// DEPENDENCIES
const express = require('express')
const app = express()
const { Sequelize } = require('sequelize')


// CONFIGURATION / MIDDLEWARE
require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// CONTROLLERS 
//Bands
const bandsController = require('./controllers/bands_controller')
app.use('/bands', bandsController)
//Events
const eventsController = require('./controllers/events_controller')
app.use('/events', eventsController)
//Stages
const stageController = require('./controllers/stage_controller')
app.use('/stage', stageController)


// ROOT
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Tour API'
    })
})

// LISTEN
app.listen(process.env.PORT, () => {
    console.log(`🎸 Rockin' on port: ${process.env.PORT}`)
})