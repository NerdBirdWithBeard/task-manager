const express = require('express');
const auth = require('../middleware/auth');
const projectController = require('../controllers/projects.controller');
const { createProjectValidation, updateProjectValidation } = require('../validations/project.validation');

const router = express.Router();

router.get('/', auth, projectController.getProjects);
router.post('/', auth, createProjectValidation, projectController.createProject);
router.route('/:id')
    .delete(auth, projectController.deleteProject)
    .put(auth, updateProjectValidation, projectController.updateProject)
    .get(auth, projectController.getProject)
;

module.exports = router;
