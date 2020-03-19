const express = require('express')
const userController = require('./controller')
const router = express.Router()
const { validateCreateUser } = require('../../../middlewares/validate.createUser')
router.post('/register', validateCreateUser, userController.register)
router.post('/login', userController.login)
module.exports = router