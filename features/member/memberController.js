const Member = require('../../models/memberModel');
const Project = require('../../models/projectModel');
const User = require('../../models/userModel');
const Result = require('../../utils/result');
const { statusErrors } = require('../../utils/statusErrors');

async function getMember(req,res,next){
  try{
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
    res.status(200).json(Result.success(200,projectMembers));
  } catch(e){
    next(e)
  }
}

// Add a new member to a project
async function addMember(req, res, next) {
  try {
    const { ProjectID, UserID, Role } = req.body;
    const existingMember = await Member.findOne({ where: { ProjectID, UserID } });

    if (existingMember) {
      return next(Result.error(statusErrors.DATA_CONFLICT, 'User is already a member of this project'));
    }

    const newMember = await Member.create({ ProjectID, UserID, Role });
    res.status(201).json(Result.success(201,newMember));
  } catch (error) {
    next(error);
  }
}

// Remove a member from a project
async function removeMember(req, res, next) {
  try {
    const { ProjectID, UserID } = req.body;

    const member = await Member.findOne({ where: { ProjectID, UserID } });
    if (!member) {
      return next(Result.error(statusErrors.NOT_FOUND, 'Member not found in this project'));
    }

    await member.destroy();
    res.status(200).json(Result.success(200,'Member removed from project'));
  } catch (error) {
    next(error);
  }
}

// Update a member's role in a project
async function updateMemberRole(req, res, next) {
  try {
    const { ProjectID, UserID, Role } = req.body;

    const member = await Member.findOne({ where: { ProjectID, UserID } });
    if (!member) {
      return res.status(404).json(Result.error(statusErrors.NOT_FOUND, 'Member not found in this project'));
    }

    member.Role = Role;
    await member.save();
    res.status(200).json(Result.success(200,'Member role updated'));
  } catch (error) {
    next(error);
  }
}

async function addMemberByUsername(req, res, next) {
  try {
    const { ProjectID, Username, Role } = req.body;
    const user = await User.findOne({ where: { Username } });
    if (!user) {
      return next(Result.error(statusErrors.NOT_FOUND, 'User not found'));
    }

    const existingMember = await Member.findOne({ where: { ProjectID, UserID: user.UserID } });

    if (existingMember) {
      return next(Result.error(statusErrors.DATA_CONFLICT, 'User is already a member of this project'));
    }

    const newMember = await Member.create({ ProjectID, UserID: user.UserID, Role });
    res.status(201).json(Result.success(201,newMember));
  } catch (error) {
    next(error);
  }

}

module.exports = {
  addMember,
  removeMember,
  updateMemberRole,
  getMember,
  addMemberByUsername,
};
