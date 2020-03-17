const express = require('express')
const router = express.Router()
router.use("/jobs", require("./job/index"))
module.exports = router