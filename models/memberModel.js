const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const Project = require('./projectModel');
const User = require("./userModel")

const Member = sequelize.define('Member', {
    UserID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'Account',
        key: 'UserID',
      },
    },
    ProjectID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'Project',
        key: 'ProjectID',
      },
    },
    Role: {
      type: DataTypes.ENUM('Member', 'Mod', 'Admin'),
      defaultValue: 'Member',
    },
  },{
    // Tùy chọn cho model
    timestamps: false, // Sequelize sẽ không tự động tạo các cột createdAt và updatedAt
    tableName: 'members' // Tên bảng trong cơ sở dữ liệu
  });
  Member.belongsTo(User, { foreignKey: 'UserID' });
  Member.belongsTo(Project, { foreignKey: 'ProjectID' });
  Project.hasMany(Member, { foreignKey: 'ProjectID' });
  User.hasMany(Member,{ foreignKey: 'UserID' })

module.exports = Member;
