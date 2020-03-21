const express = require('express')
const userController = require('./controller')
const router = express.Router()
const passportService = require('../../../middlewares/auth');
const { authorize } = require('../../../middlewares/auth');
const { uploadImage } = require("../../../middlewares/uploadImage")
const requireToken = passportService.authenticateJWT;
const { validateCreateUser } = require('../../../middlewares/validate.createUser')
const randomize = require('randomatic')
const randomString = randomize('0', 10)
console.log(randomString)
module.exports.string = {
    randomString
}
router.post('/register', validateCreateUser, userController.register)
router.post('/login', userController.login)
router.post("/post-job", requireToken, authorize(["Recruiter"]), userController.createJob)
router.post("/avatar", requireToken, authorize(["Job Seeker", "Recruiter", "Admin"]), uploadImage("avatar"), userController.uploadAvatar)
router.post("/change-password", requireToken, authorize(["Job Seeker", "Recruiter", "Admin"]), userController.changePassword)
router.post("/auth/reset-password", userController.resetPasswordLink)
// router.get(`/auth/reset-password-page/([\${randomString}])`, userController.renderResetPage)
// router.post(`/auth/reset-password-page/[\${randomString}]`, userController.resetPassword)
router.get('/auth/reset-password-page/reset', userController.renderResetPage)
router.post('/auth/reset-password-page/reset', userController.resetPassword)
// router.get('/auth/reset-password-page/:token', userController.renderResetPage)
// router.post('/auth/reset-password-page/:token', requireToken, userController.resetPassword)
router.get('/posted/:jobId', requireToken, authorize(["Recruiter"]), userController.recruiterCheck)
router.get('/applied', requireToken, authorize(["Job Seeker"]), userController.seekerCheck)
router.delete('/:jobId', requireToken, authorize(["Recruiter", "Admin"]), userController.deleteJob)
router.put('/:jobId', requireToken, authorize(["Recruiter"]), userController.replaceJob)
router.patch('/:jobId', requireToken, authorize(["Recruiter"]), userController.updateJob)
router.patch('/', requireToken, authorize(["Job Seeker", "Recruiter", "Admin"]), userController.updateProfile)
module.exports = router