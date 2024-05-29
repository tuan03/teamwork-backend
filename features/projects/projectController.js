const Project = require('../../models/projectModel');
const Result = require("../../utils/result");
const Member = require('../../models/memberModel');
const { statusErrors } = require('../../utils/statusErrors');
const sequelize = require('../../utils/db');
const { Sequelize, DataTypes } = require('sequelize');
const Task = require('../../models/taskModel');
const User = require('../../models/userModel');
async function createProject(req, res, next) {
  try {
    const newProject = await Project.create(req.body);
    await Member.create({
      UserID: req.userID,
      ProjectID: newProject.ProjectID,
      Role: 'Admin',
    });
    res.status(201).json(Result.success(201, newProject));
  } catch (error) {
    next(Result.error(statusErrors.DATA_CONFLICT));
  }
}

async function getAllProjects(req, res, next) {
  try {
    
    const projects = await Project.findAll({
      include: [{
        model: Member,
        where: { UserID: req.userID },
      }],
         });
        const convertData = projects.map((project) => {
          const newProject = {
            ProjectID: project.ProjectID,
            ProjectName: project.ProjectName,
            ProjectDescription: project.ProjectDescription,
            Deadline: project.Deadline,
            Status: project.Status,
            CreatedAt: project.CreatedAt,
            Role: project.Members[0].Role,
          }
          return newProject;
        })
    res.status(200).json(Result.success(200, convertData));
  }  catch (error) {
    console.log(error)
    next(error);
  }
}

async function getProjectById(req, res, next) {
  const { ProjectID } = req.params;
  try {
    const project = await Project.findByPk(ProjectID);
    if (project) {
      res.status(200).json(Result.success(200, project));
    } else {
      next(Result.error(statusErrors.NOT_FOUND));
    }
  } catch (error) {
    next(error);
  }
}

async function updateProject(req, res, next) {
  try {
    const [updatedRows] = await Project.update(req.body, {
      where: { ProjectID: req.body.ProjectID },
    });
    // if (updatedRows === 1) {
    res.status(200).json(Result.success(200));
  } catch (error) {
    next(error);
  }
}


// async function deleteProject(req, res, next) {
//   const { id } = req.params;
//   try {
//     const member = await Member.findOne({
//       where: {
//         UserID: req.userID,
//         ProjectID: id,
//       },
//     });
//     if (!member || member.Role !== 'Admin') {
//       return next(Result.error(statusErrors.FORBIDDEN));
//     }

//     // Bắt đầu một giao dịch để đảm bảo tính nhất quán
//     await sequelize.transaction(async (t) => {
//       // Xóa tất cả các thành viên của dự án
//       await Member.destroy({
//         where: { ProjectID: id },
//         transaction: t,
//       });

//       // Xóa dự án
//       const deletedRows = await Project.destroy({
//         where: { ProjectID: id },
//         transaction: t,
//       });

//       if (deletedRows === 1) {
//         res.status(200).json(Result.success(200));
//       } else {
//         next(Result.error(statusErrors.NOT_FOUND));
//       }
//     });

//   } catch (error) {
//     next(error);
//   }
// }

async function getProjectMembersAndTasks(req,res,next){
  try {

    const {ProjectID} = req.params
    const projectMembers = await Member.findAll({
      where: { ProjectID: ProjectID },
      include:[
        {
        model: User,
        attributes: ['Avatar', 'FullName']
        }
      ],
      raw: true
    });
    console.log(projectMembers)
    const projectTasks = await Task.findAll({
      where: { ProjectID: ProjectID },
      include:[{
        model:User,
        as:'UserCreator',
        attributes: ['Avatar', 'FullName']
      }],
      raw: true
    });
    console.log(projectTasks)
    
    // Tạo một đối tượng để lưu trữ các thành viên và các task của họ
    let membersWithTasks = [];
    
    // Duyệt qua từng thành viên
    for (let member of projectMembers) {
      // Lọc ra các task thuộc về thành viên này
      let memberTasks = projectTasks.filter(task => task.AssigneeID === member.UserID);
      
      // Thêm thành viên và các task của họ vào đối tượng
      membersWithTasks.push({...member,tasks:memberTasks})
    }
    
    // if (updatedRows === 1) {
    res.status(200).json(Result.success(200,membersWithTasks));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  getProjectMembersAndTasks
};
