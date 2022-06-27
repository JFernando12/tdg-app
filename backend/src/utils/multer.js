const multer = require("multer");
const path = require("path");
const { v4:uuid } = require("uuid")

const storage = multer.diskStorage({
    destination: path.resolve(__dirname, "uploads"),
    filename: function(req, file, cb) {
        const uniqueSuffix = uuid() + path.extname(file.originalname).toLowerCase();
        cb(null, uniqueSuffix);
    }
})

const upload = multer({storage: storage});

module.exports = upload;