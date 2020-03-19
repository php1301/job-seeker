const express = require('express')
const jobController = require('./controller')
const router = express.Router()
const passportService = require('../../../middlewares/auth');
const requireCredentials = passportService.authenticateJWT;
router.get("/", requireCredentials, jobController.getJob)
router.post("/", jobController.createJob)
module.exports = router