const express = require('express');
const router = express.Router();
const commentController = require('./commentController');
const { createCommentValidation, updateCommentValidation, deleteCommentValidation } = require('./commentValidations');
const authenticateUser = require('../../middlewares/authen');
const checkProjectAccess = require("../../middlewares/checkProjectAccess")
// Middleware for user authentication
router.use(authenticateUser);

// Create a new comment
router.post('/', createCommentValidation,checkProjectAccess(['Admin','Mod','Member']), commentController.createComment);

// Get comments by task ID
router.get('/task/:TaskID',checkProjectAccess(['Admin','Mod','Member']), commentController.getCommentsByTask);

// Delete a comment
router.delete('/',deleteCommentValidation, commentController.deleteComment);

module.exports = router;
