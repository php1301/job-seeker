const validator = require('validator')
const _ = require('lodash')
const { User } = require('../models/User')
module.exports.validateCreateUser = async (req, res, next) => {
    let errors = {}
    const email = _.get(req, "body.email")
    const password = _.get(req, "body.password")
    const password2 = _.get(req, "body.password2")
    const fullname = _.get(req, "body.fullname")
    const userType = _.get(req, "body.userType")
    //email
    if (validator.isEmpty(email)) {
        errors.email = "Must provide email"
    }
    const user = await User.findOne({ email })
    if (user)
        errors.email = "Email exists"
    else if (!validator.isEmail(email)) {
        errors.email = "Not an email format"
    }
    //password
    if (validator.isEmpty(password)) {
        errors.password = "password is required"
    }
    else if (!validator.isLength(password, { min: 8 })) {
        errors.password = "password must have at least 8 characters"
    }
    if (validator.isEmpty(password2)) {
        errors.password2 = "reconfirm password is required"
    }
    if (!validator.equals(password, password2)) {
        errors.password2 = "password must match"
    }
    //fullname
    if (validator.isEmpty(fullname)) {
        errors.fullname = "fullname is required"
    }
    //usertype
    if (!validator.isIn(userType, ["Job Seeker", "Recruiter"])) {
        errors.userType = "must decide your role"
    }
    const isValid = _.isEmpty(errors)
    if (isValid) return next()
    res.status(400).json(errors)
}