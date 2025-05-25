const express = require('express');
const auth = require('../middleware/auth');
const uploadFile = require('../middleware/uploadFile');
const uploadController = require('../controllers/upload.controller')

const router = express.Router();

router.post('/avatar', auth,  uploadFile.single('avatar'), uploadController.sendTaskAttachment);
router.post('/attachment', auth, uploadFile.single('attachment'), uploadController.sendTaskAttachment);

module.exports = router;
