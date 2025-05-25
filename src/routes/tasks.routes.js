const express = require('express');
const auth = require('../middleware/auth');
const tasksController = require('../controllers/tasks.controller');
const { createTaskValidation, updateTaskValidation } = require('../validations/task.validation');

const router = express.Router();

router.get('/', auth, tasksController.getTasks);
router.post('/', auth, createTaskValidation, tasksController.createTask);
router.route('/:id')
    .delete(auth, tasksController.deleteTask)
    .put(auth, updateTaskValidation, tasksController.updateTask)
    .get(auth, tasksController.getTask)
;

module.exports = router;
