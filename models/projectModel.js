const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Project = sequelize.define('Project', {
  ProjectID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ProjectName: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  ProjectDescription: {
    type: DataTypes.TEXT,
    defaultValue: null,
  },
  Deadline: {
    type: DataTypes.DATE,
    defaultValue: null,
    validate: {
      isAfter: new Date().toISOString(), // Đảm bảo ngày là sau thời điểm hiện tại
    }
  },
  Status: {
    type: DataTypes.ENUM('Active', 'Completed', 'Cancelled'),
    defaultValue: 'Active',
  },
  CreatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'projects',
  timestamps: false,
});
module.exports = Project;
