// const multer = require('../lib/multer');
const multer = require('multer');
const storage = require('../utils/diskStorage');

const fileFilter = (req, file, callback) => {

    const allowedMimeTypes = ['image/bmp', 'image/gif', 'image/jpeg', 'image/png'];

    if (allowedMimeTypes.includes(file.mimetype)) {
        return callback(null, true);
    }
    callback(new Error('Only images are allowed'));
};

const upload = multer({storage, fileFilter});

module.exports = upload;
