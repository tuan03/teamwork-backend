const express = require('express');
const router = express.Router();
const memberController = require('./memberController');
const { addMemberValidation, removeMemberValidation, updateMemberRoleValidation } = require('./memberValidations');
const authenticateUser = require('../../middlewares/authen');
const checkProjectAccess = require('../../middlewares/checkProjectAccess');

// Middleware for user authentication
router.use(authenticateUser);

// Add a new member to a project
router.post('/add', addMemberValidation, checkProjectAccess(['Admin']), memberController.addMember);

// Remove a member from a project
router.delete('/remove', removeMemberValidation, checkProjectAccess(['Admin']), memberController.removeMember);

// Update a member's role in a project
router.put('/updateRole', updateMemberRoleValidation, checkProjectAccess(['Admin']), memberController.updateMemberRole);

module.exports = router;
