const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { promisify } = require('util')
const genSaltPromise = promisify(bcrypt.genSalt)
const hashPromise = promisify(bcrypt.hash)
const { CVSchema } = require('./Cv')
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullname: { type: String, required: true },
    Date: { type: Date, default: new Date() },
    userType: { type: String, required: true, default: "anon" },
    avatar: { type: String, required: false, default: "" },
    Exp: { type: String, required: false, default: "" },
    skills: { type: Array, default: [] },
    bio: { type: String, default: "" },
    reset: { type: String, default: "" },
    // userCV: [CVSchema],
    userCV: [{ type: mongoose.Schema.Types.ObjectId, ref: "CV" }], //ref

})
UserSchema.pre("save", function (next) {
    const user = this
    if (!user.isModified("password")) return next()
    genSaltPromise(10) // thanh promise return cai hash
        .then((hash) => hashPromise(user.password, hash))
        .then((hash) => {
            user.password = hash
            next()
        })
        .catch((err) => res.status(400).json(err))
})
const User = mongoose.model("User", UserSchema, "User")
module.exports = {
    UserSchema, User
}