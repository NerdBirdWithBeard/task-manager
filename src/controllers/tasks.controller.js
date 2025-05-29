const { validationResult } = require('express-validator');
const taskService = require('../services/tasks.services');
const asyncHandler = require('../utils/asyncHandler');
const sendNormalized = require('../utils/sendNormalized');

function buildTagsWhereClause(tagString) {
    if (!tagString || typeof tagString !== 'string') return [];

    const uniqueTags = [...new Set(
        tagString
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)
    )];

    if (uniqueTags.length === 0) return [];

    return uniqueTags.map(tag => ({
        taskTags: {
        some: {
            tag: {
            name: tag,
            },
        },
        },
    }));
}

function prepareFilter (filter) {
    const{ title, description, statusString, tagString, dueDateFrom, dueDateTo, createdAtFrom, createdAtTo } = filter;
    const filterArray = [];
    if (title) {
        filterArray.push({title: {contains: title, mode: 'insensitive'}});
    }
    if (description) {
        filterArray.push({description: {contains: description, mode: 'insensitive'}});
    }
    if (statusString) {
        filterArray.push({status: {in: statusString.split(',')}});
    }
    if (dueDateFrom || dueDateTo) {
        const dueDate = {};
        if (dueDateFrom) {dueDate.gte = new Date(dueDateFrom)};
        if (dueDateTo) {dueDate.lte = new Date(dueDateTo)};
        filterArray.push({dueDate: dueDate});
    }
    if (createdAtFrom || createdAtTo) {
        const createdAt = {};
        if (createdAtFrom) {createdAt.gte = new Date(createdAtFrom)};
        if (createdAtTo) {createdAt.lte = new Date(createdAtTo)};
        filterArray.push({createdAt: createdAt});
    }
    return {AND: filterArray.concat(buildTagsWhereClause(tagString))};
}

exports.getTasks = asyncHandler(async (req, res) => {
    const filter = prepareFilter(req.query);
    filter.userId = req.user.userId;
    console.log(JSON.stringify(filter));
    sendNormalized(res, await taskService.getTasks(filter), 'Success', 404, 'No tasks found found');
});

exports.getTask = asyncHandler(async (req, res) => {
    const filter = req.params;
    filter.userId = req.user.userId;
    sendNormalized(res, await taskService.getTask(filter), 'Success', 404, 'Task not found');
});
    
exports.createTask = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()})
    }
    const data = req.body;
    data.dueDate = new Date(data.dueDate);
    data.userId = req.user.userId;
    sendNormalized(res, await taskService.createTask(data), 'New task successfully created');
});

exports.updateTask = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()})
    }
    const filter = req.params;
    const data = req.body;
    if (dueDate) {data.dueDate = new Date(data.dueDate)};
    data.userId = req.user.userId;
    sendNormalized(res,
        await taskService.updateTask(filter, data),
        'Task successfully updated',
        404,
        'Task not found for update'
    );
});

exports.deleteTask = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const filter = req.params;
    filter.userId = req.user.userId;
    sendNormalized(res,
        await taskService.deleteTask(filter),
        'Task successfully deleted',
        404,
        'Task not found'
    );
});
