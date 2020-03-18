const express = require("express")
const { User } = require('../../../models/User')
module.exports.register = (req, res, next) => {
    const { email, password, username } = req.body
}