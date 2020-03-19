const express = require('express')
const jobController = require('./controller')
const router = express.Router()
const passportService = require('../../../middlewares/auth');
const { authorize } = require('../../../middlewares/auth');
const requireToken = passportService.authenticateJWT;
router.get("/", requireToken, authorize(["Recruiter"]), jobController.getJob)
router.post("/", jobController.createJob)
module.exports = router