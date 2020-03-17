const express = require('express')
const jobController = require('./controller')
const router = express.Router()
router.get("/", jobController.getJob)
router.post("/", jobController.createJob)
module.exports = router