const { statusErrors } = require("../utils/statusErrors");
const Result = require("../utils/result")
const Project = require("../models/projectModel");
const Member = require("../models/memberModel");
const Task = require('../models/taskModel');

function checkProjectAccess(role) {
  //["Admin","Mod","Member"]
  return async (req, res, next) => {
    try {
      const userID = req.userID;
      let ProjectID
      const TaskID = req.params.TaskID || req.body.TaskID;
      if (TaskID) {
        // Tìm task bằng ID
        const task = await Task.findByPk(TaskID);
        if (!task) {
          return next(Result.error(statusErrors.NOT_FOUND));
        }
        ProjectID = task.ProjectID;
      } else if (req.body.ProjectID || req.params.ProjectID) {
        // Nếu không có taskId, kiểm tra projectId từ request body hoặc params
        ProjectID = req.body.ProjectID || req.params.ProjectID;
      } else {
        return next(Result.error(statusErrors.BAD_REQUEST));
      }

      // Kiểm tra quyền của người dùng trong dự án
      const project = await Project.findByPk(ProjectID);
      if (!project) {
        return res.status(404).json(Result.error(statusErrors.NOT_FOUND));
      }

      const member = await Member.findOne({
        where: {
          ProjectID: ProjectID,
          UserID: userID,
          Role: role,
        },
      });
      if (!member) {
        return next(Result.error(statusErrors.FORBIDDEN));
      }

      next();
    } catch (error) {
        console.log(error)
      next(Result.error(statusErrors.INTERNAL_SERVER_ERROR));
    }
  };
}

module.exports = checkProjectAccess;
