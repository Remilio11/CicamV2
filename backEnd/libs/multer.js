const multer = require('multer');
const path = require('path');

const whitelist = [
  'application/octet-stream',
]

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../performance/aermet'),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

module.exports = multer({
    storage,
    fileFilter: (req, file, cb) => {
    if (!whitelist.includes(file.mimetype)) {
      return cb(new Error('File extension is not allowed'))
    }
    cb(null, true)
  }});