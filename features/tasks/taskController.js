const Task = require("../../models/taskModel");
const Result = require("../../utils/result");
const { statusErrors } = require("../../utils/statusErrors");
const Member = require("../../models/memberModel");
const Project = require("../../models/projectModel");
async function createTask(req, res, next) {
  try {
    const creatorID = req.userID;
    const newTask = await Task.create({ ...req.body, CreatorID: creatorID });
    res.status(201).json(Result.success(201, newTask));
  } catch (error) {
    next(error);
  }
}
async function getAllTasks(req, res, next) {
  try {
    const tasks = await Task.findAll({
      where: { ProjectID: req.params.ProjectID },
    });
    res.status(200).json(Result.success(200, tasks));
  } catch (error) {
    next(error);
  }
}

async function getTaskById(req, res, next) {
  try {
    const task = await Task.findByPk(req.params.TaskID);
    if (!task) {
      return next(Result.error(statusErrors.NOT_FOUND));
    }
    res.status(200).json(Result.success(200, task));
  } catch (error) {
    next(error);
  }
}

async function updateTask(req, res, next) {
  try {
    const [updatedRows] = await Task.update(req.body, {
      where: { TaskID: req.params.TaskID },
    });
    // if (updatedRows === 0) {
    //   return res.status(404).json(Result.error(statusErrors.NOT_FOUND));
    // }
    res.status(200).json(Result.success(200));
  } catch (error) {
    next(error);
  }
}

async function deleteTask(req, res, next) {
  try {
    const deletedRows = await Task.destroy({
      where: { TaskID: req.params.TaskID },
    });
    if (deletedRows === 0) {
      return res.status(404).json(Result.error(statusErrors.NOT_FOUND));
    }
    res.status(200).json(Result.success(200));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  getAllTasks,
};
