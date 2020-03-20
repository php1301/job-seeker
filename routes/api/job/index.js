const express = require('express')
const jobController = require('./controller')
const router = express.Router()
const passportService = require('../../../middlewares/auth');
const { authorize } = require('../../../middlewares/auth');
const { uploadImage } = require("../../../middlewares/uploadImage")
const requireToken = passportService.authenticateJWT;
router.get("/", jobController.getJob)
router.post("/", requireToken, authorize(["Recruiter"]), jobController.createJob)
router.post("/:jobId", requireToken, authorize(["Job Seeker"]), uploadImage("cv"), jobController.sendCV)
module.exports = router