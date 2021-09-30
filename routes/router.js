const express = require('express')
const router = express.Router()

const userRoutes = require('./user')

const childRoutes = require('./child')
const creditCardRoutes = require('./credit_card')

router.use('/users', userRoutes)
router.use('/children', childRoutes)
router.use('/credit-cards', creditCardRoutes)

module.exports = router
