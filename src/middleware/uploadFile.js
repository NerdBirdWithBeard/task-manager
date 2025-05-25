const multer = require('multer');
const path = require('path');
const uploadsModel = require('../lib/uploadsModel');

const resolveUploadPath = (fieldname) => {
    const folders = uploadsModel.folders;

    const lookup = {
        avatar: folders.avatar,
        attachment: folders.attachment,
    };

    return path.join(uploadsModel.root, lookup[fieldname] || '');
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const field = file.fieldname;
        const targetPath = resolveUploadPath(field);
        callback(null, targetPath);
    },
    filename: function (req, file, callback) {
        const ext = path.extname(file.originalname);
        const baseName = path.basename(file.originalname, ext);
        const timestamp = Date.now();
        const filename = path.join('', `${baseName}-${timestamp}${ext}`);
        callback(null, filename);
        
    }
});

const fileFilter = (req, file, callback) => {
    if (file.fieldname === 'avatar') {
            const allowedMimeTypes = ['image/bmp', 'image/gif', 'image/jpeg', 'image/png'];

            if (allowedMimeTypes.includes(file.mimetype)) {
                return callback(null, true);
            }
            callback(new Error('Only images are allowed'));
        } else {
            return callback(null, true);
        }
};

const upload = multer({storage, fileFilter});

module.exports = upload;
