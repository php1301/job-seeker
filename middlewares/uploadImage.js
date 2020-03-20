const multer = require('multer')
module.exports.uploadImage = (type) => {
    const storage =multer.diskStorage ({
        destination: function (req, file, cb) {
            cb(null, `uploads/${type}`)
        },
        filename: function (req, file, cb) {
            cb(null, `${Date.now()}-${file.originalname}`)
        }
    })
    const upload = multer({ storage: storage })
    return upload.single(type)
}