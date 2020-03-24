const express = require('express')
const mongoose = require('mongoose')
// const mongoUri = "mongodb+srv://admin123:admin123@cluster0-5obyn.mongodb.net/test?retryWrites=true&w=majority"
const config = require('./config/index')
console.log(process.env.NODE_ENV)
// const { resetPassword } = require('./routes/api/user/controller')
// mongoose.connect("mongodb://localhost:27017/FS08-vexere", {
mongoose.connect(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log(
            "connect to db successfully"
        )
    })
    .catch((err) => {
        console.log(err)
    })
const app = express()
app.use(express.json())
app.use("/api", require("./routes/api/index"))
// app.post("/api/user/auth/reset-password-page/reset", resetPassword)
// app.get('/', (req, res, next) => {
//     console.log("mdw1")
//     res.json({ message: "Stop" })
//     // next()
// }, (req, res, next) => {
//     console.log("mdw2")
// }
// )
app.use("/images", express.static("uploads"))
const port = process.env.PORT || config.port
app.listen(port, () => {
    console.log(`app is running on port ${port}`)
})