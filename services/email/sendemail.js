const nodemailer = require('nodemailer')
const fs = require('fs')
const hogan = require('hogan.js')
const config = require('../../config/index')
const template = fs.readFileSync(`${__dirname}/template/index.html`, "utf-8")
const compiledTemplate = hogan.compile(template)
module.exports.sendReset = (user) => {
    const transport = {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        requireSSL: true,
        auth: {
            user: config.email,
            pass: config.password

        }
    }
    const transporter = nodemailer.createTransport(transport)

    const mailOptions = {
        from: config.email,
        to: user.email,
        subject: "Reset password link",
        html: compiledTemplate.render({
            name: user.fullname,
            url: `http://localhost:5000/api/user/auth/reset-password-page/${string}`
        })
    }
    transporter.sendMail(mailOptions, err => {
        if (err) return console.log(err.message)
        console.log("Send email success")
    })
}