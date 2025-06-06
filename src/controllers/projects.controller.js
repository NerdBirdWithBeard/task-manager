const { validationResult } = require('express-validator');
const projectService = require('../services/projects.services');
const asyncHandler = require('../utils/asyncHandler');
const sendNormalized = require('../utils/sendNormalized');
const prepareFilter = require('../utils/prepareFilter');

exports.getProjects = asyncHandler(async (req, res) => {
    const filter = prepareFilter(req.query);
    filter.ownerId = req.user.userId;
    console.log(JSON.stringify(filter));
    sendNormalized(res, await projectService.getProjects(filter), 'Success', 404, 'No project found found');
});

exports.getProject = asyncHandler(async (req, res) => {
    const filter = req.params;
    filter.ownerId = req.user.userId;
    sendNormalized(res, await projectService.getProject(filter), 'Success', 404, 'Project not found');
});

exports.createProject = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()})
    }
    const data = req.body;
    data.ownerId = req.user.userId;
    sendNormalized(res, await projectService.createProject(data), 'New project successfully created');
});

exports.updateProject = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()})
    }
    const filter = req.params;
    const data = req.body;
    data.ownerId = req.user.userId;
    sendNormalized(res,
        await projectService.updateProject(filter, data),
        'Project successfully updated',
        404,
        'Project not found for update'
    );
});

exports.deleteProject = asyncHandler(async (req, res) => {
    // const { id } = req.params;
    const filter = req.params;
    filter.ownerId = req.user.userId;
    sendNormalized(res,
        await projectService.deleteProject(filter),
        'Project successfully deleted',
        404,
        'Project not found'
    );
});
