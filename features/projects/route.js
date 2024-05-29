const express = require('express');
const router = express.Router();
const projectController = require('./projectController');
const { createProjectValidation, updateProjectValidation } = require('./projectValidations');
const authenticateUser = require('../../middlewares/authen');
const checkProjectAccess = require("../../middlewares/checkProjectAccess")
// Create project

router.post('/',authenticateUser, createProjectValidation, projectController.createProject);

// Get all projects
router.get('/',authenticateUser, projectController.getAllProjects);

// Get project by ID
router.get('/:ProjectID',authenticateUser,checkProjectAccess(['Admin','Mod','Member']), projectController.getProjectById);

// Update project
router.put('/edit',authenticateUser, updateProjectValidation, checkProjectAccess(['Admin']), projectController.updateProject);

// Delete project
// router.delete('/:id',authenticateUser, projectController.deleteProject);



module.exports = router;
