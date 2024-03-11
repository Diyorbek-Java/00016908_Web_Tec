const express = require('express')
const volanturing_event = require('./volunteering_events')

const router = express.Router()

// registering child routers
router.use('/volunteering_events', volanturing_event)

module.exports = router
