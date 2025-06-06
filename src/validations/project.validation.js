const { body } = require('express-validator');

exports.createProjectValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Title is required')
        .isLength({max: 100}).withMessage('The title must not exceed 100 characters.'),

    body('description')
        .optional()
        .trim()
        .isLength({max: 1000}).withMessage('The description must not exceed 1000 characters.'),
];

exports.updateProjectValidation = [
    body('name')
        .optional()
        .trim()
        .notEmpty().withMessage('Title is required')
        .isLength({max: 100}).withMessage('The title must not exceed 100 characters.'),

    body('description')
        .optional()
        .trim()
        .isLength({max: 1000}).withMessage('The description must not exceed 1000 characters.'),
];
