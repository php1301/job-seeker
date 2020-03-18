const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { promisify } = require('util')
const genSaltPromise = promisify(bcrypt.genSalt)
const hashPromise = promisify(bcrypt.hash)
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    userType: { type: String, required: true, default: "anon" },
    avatar: { type: String, required: false },
    Exp: { type: String, required: true },
    skills: { type: String },
    bio: { type: String }
})
UserSchema.pre("save", function (next) {
    const user = this
    if (!user.isModified) return next()
    genSaltPromise(10) // thanh promise return cai hash
        .then((hash) => hashPromise(user.password, hash))
        .then((hash) => {
            user.password = hash
            next()
        })
        .catch((err) => res.status(400).json(err))
})
const User = mongoose.model("Job", JobSchema, "Job")
module.exports = {
    UserSchema, User
}