const Task = require("../../models/taskModel");
const Result = require("../../utils/result");
const { statusErrors } = require("../../utils/statusErrors");
const Member = require("../../models/memberModel");
const Project = require("../../models/projectModel");
const User = require("../../models/userModel");
async function createTask(req, res, next) {
  try {
    const creatorID = req.userID;
    const newTask = await Task.create({ ...req.body, CreatorID: creatorID });
    res.status(201).json(Result.success(201, newTask));
  } catch (error) {
    next(error);
  }
}
async function getAllMyTasks(req,res,next){
  try {
    const tasks = await Task.findAll({
      where: { AssigneeID: req.userID },
    });
    res.status(200).json(Result.success(200, tasks));
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

async function getAllCompletedTasks(req, res, next) {
  try {
    const tasks = await Task.findAll({
      where: { ProjectID: req.params.ProjectID, Completed: true },
    });
    res.status(200).json(Result.success(200, tasks));
  } catch (error) {
    next(error);
  }
}

async function getAllUncompletedTasks(req, res, next) {
  try {
    const tasks = await Task.findAll({
      where: { ProjectID: req.params.ProjectID, Completed: false },
    });
    res.status(200).json(Result.success(200, tasks));
  } catch (error) {
    next(error);
  }

}

async function getCompletedTaskCount(req, res, next) {
  try {
    const project = await Project.findByPk(req.params.ProjectID);
    if (!project) {
      return next(Result.error(statusErrors.NOT_FOUND));
    }
    const members = await Member.findAll({
      where: { ProjectID: req.params.ProjectID },
    });
    const completedTaskCount = await Promise.all(
      members.map(async (member) => {
        var user = await User.findOne({
          where: { UserID: member.UserID },
        })
        const tasks = await Task.findAll({
          where: { ProjectID: req.params.ProjectID, AssigneeID: member.UserID, Completed: true },
        });
        return {
          UserID: member.UserID,
          nameUser: user.FullName,
          CompletedTaskCount: tasks.length,
        };
      })
    );
    res.status(200).json(Result.success(200, completedTaskCount));
  } catch (error) {
    next(error);
  }
}

async function getMyTasks(req, res, next) {
  try {
    const tasks = await Task.findAll({
      where: { ProjectID: req.params.ProjectID, AssigneeID: req.userID },
    });
    res.status(200).json(Result.success(200, tasks));
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
  getAllCompletedTasks,
  getAllUncompletedTasks,
  getCompletedTaskCount,
  getMyTasks,
  getAllMyTasks,
};
