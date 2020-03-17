const dotenv = require('dotenv')
const path = require('path')
const envPath = path.join(`${__dirname}/../.env`)
dotenv.config()
let mongoUri, port, secretKey, email, password
switch (process.env.NODE_ENV) {
    case "local":
        mongoUri = process.env.LOCAL_MONGODB_URI
        port = process.env.LOCAL_PORT
        secretKey = process.env.LOCAL_SECRET_KEY
        email = process.env.EMAIL
        password = process.env.LOCAL_PASSWORD
        break;
    case "staging":
        mongoUri = process.env.STAGING_MONGODB_URI
        secretKey = process.env.STAGING_SECRET_KEY
        email = process.env.STAGING_EMAIL
        password = process.env.STAGING_PASSWORD
        break;

    default:
        break;
}
console.log(mongoUri)
module.exports = {
    mongoUri, port, secretKey, email, password
}