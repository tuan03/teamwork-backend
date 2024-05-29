const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const Project = require('./projectModel');
const User = require("./userModel")
const Result = require('../utils/result')
const { statusErrors } = require('../utils/statusErrors');
const Task = sequelize.define('Task', {
  TaskID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ProjectID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  TaskName: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  TaskDescription: {
    type: DataTypes.TEXT,
    defaultValue: null,
  },
  Deadline: {
    type: DataTypes.DATE,
    defaultValue: null,
  },
  AssigneeID: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  CreatorID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'tasks',
  timestamps: false,
});

Task.belongsTo(Project, { foreignKey: 'ProjectID' });
Project.hasMany(Task, { foreignKey: 'ProjectID' });

User.hasMany(Task,{ foreignKey: 'AssigneeID' })
User.hasMany(Task,{ foreignKey: 'CreatorID' })

Task.belongsTo(User, { foreignKey: 'AssigneeID' });
Task.belongsTo(User, { foreignKey: 'CreatorID' });
module.exports = Task;
