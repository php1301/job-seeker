const mongoose = require('mongoose')
const CVSchema = mongoose.Schema({
    cvUrl: { type: String },
    date: { type: String, default: Date() }
})
const CV = mongoose.model("CV", CVSchema, "CV")
module.exports = {
    CVSchema, CV
}