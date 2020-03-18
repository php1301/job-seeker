const express = require('express')
const router = express.Router()
router.use("/jobs", require("./job/index"))
router.use("/user", require("./user/index"))
module.exports = router