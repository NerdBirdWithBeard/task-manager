const projectService = require('../services/projects.service');
const asyncHandler = require('../utils/asyncHandler');
const sendNormalized = require('../utils/sendNormalized');

exports.createProject = asyncHandler(async (req, res) => {
    const data = req.body;
    data.ownerId = req.user.userId;
    sendNormalized(res, await projectService.createProject(data), 'New project successfully created');
});
