const Comment = require('../../models/commentModel');
const Task = require('../../models/taskModel');
const Result = require('../../utils/result');
const { statusErrors } = require('../../utils/statusErrors');

// Create a new comment
async function createComment(req, res, next) {
  try {
    const { TaskID, Content } = req.body;
    const UserID = req.UserID;

    // Check if task exists
    const task = await Task.findByPk(TaskID);
    if (!task) {
      return res.status(404).json(Result.error(statusErrors.NOT_FOUND));
    }

    const newComment = await Comment.create({
      TaskID,
      UserID,
      Content
    });

    res.status(201).json(Result.success(201,newComment));
  } catch (error) {
    next(error);
  }
}

// Get comments by task ID
async function getCommentsByTask(req, res, next) {
  try {
    const { TaskID } = req.params;

    // Check if task exists
    const task = await Task.findByPk(TaskID);
    if (!task) {
      return res.status(404).json(Result.error(statusErrors.NOT_FOUND));
    }

    const comments = await Comment.findAll({ where: { TaskID: TaskID } });

    res.status(200).json(Result.success(comments));
  } catch (error) {
    next(error);
  }
}


// Delete a comment
async function deleteComment(req, res, next) {
  try {
    const { TaskID } = req.params;
    const UserID = req.UserID;

    const comment = await Comment.findByPk(TaskID);

    if (!comment) {
      return res.status(404).json(Result.error(statusErrors.NOT_FOUND));
    }

    if (comment.UserID !== UserID) {
      return res.status(403).json(Result.error(statusErrors.FORBIDDEN));
    }

    await comment.destroy();

    res.status(200).json(Result.success(200,'Comment deleted successfully'));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createComment,
  getCommentsByTask,
  deleteComment
};
