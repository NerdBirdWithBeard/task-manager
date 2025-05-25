const fs = require('fs');
const path = require('path');
const uploadsModel = require('../lib/uploadsModel');

function flattenFolders(obj, rootPath = '') {
    const result = [];

    for (const key in obj) {
        const value = obj[key];

        if (typeof value === 'string') {
        result.push(path.join(uploadsModel.root, value));
        } else if (typeof value === 'object') {
        result.push(...flattenFolders(value, path.join(rootPath, key)));
        }
    }

    return result;
}

function initUploadsDirs() {
    const folders = flattenFolders(uploadsModel.folders);

    folders.forEach(folder => {
        const fullPath = path.join(__dirname, '..', '..', folder);
        if (!fs.existsSync(fullPath)) {
            fs.mkdirSync(fullPath, {recursive: true});
            console.log('[UPLOADS] Created:', fullPath);
        }
    });
}

module.exports = initUploadsDirs;
