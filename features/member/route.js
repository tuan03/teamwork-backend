const express = require('express');
const router = express.Router();
const memberController = require('./memberController');
const { addMemberValidation, removeMemberValidation, updateMemberRoleValidation, addMemberValidation1 } = require('./memberValidations');
const authenticateUser = require('../../middlewares/authen');
const checkProjectAccess = require('../../middlewares/checkProjectAccess');

// Middleware for user authentication
router.use(authenticateUser);

router.get('/:ProjectID',checkProjectAccess(['Admin','Mod','Member']), memberController.getMember);

// Add a new member to a project
router.post('/add', addMemberValidation, checkProjectAccess(['Admin']), memberController.addMember);

// add member by username
router.post('/addByUsername',addMemberValidation1, checkProjectAccess(['Admin']), memberController.addMemberByUsername);

// Remove a member from a project
router.delete('/remove', removeMemberValidation, checkProjectAccess(['Admin']), memberController.removeMember);

// Update a member's role in a project
router.put('/updateRole', updateMemberRoleValidation, checkProjectAccess(['Admin']), memberController.updateMemberRole);

module.exports = router;
