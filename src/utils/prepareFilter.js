const buildTagsWhereClause = require('../utils/buildTagsWhereClause');

function prepareFilter (filter) {
    const{ title, name, description, statusString, tagString, dueDateFrom, dueDateTo, createdAtFrom, createdAtTo } = filter;
    const filterArray = [];
    if (title) {
        filterArray.push({title: {contains: title, mode: 'insensitive'}});
    }
    if (name) {
        filterArray.push({name: {contains: name, mode: 'insensitive'}});
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

module.exports = prepareFilter;
