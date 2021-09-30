const express = require('express')
const AuthController = require('../controllers/user')

const router = express.Router()

router.post('/auth/login', AuthController.login)
router.post('/auth/register', AuthController.register)

module.exports = router
