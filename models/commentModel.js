const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const Task = require('./taskModel');
const User = require('./userModel');

const Comment = sequelize.define('Comment', {
  CommentID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  TaskID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  UserID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  CreatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'comments',
  timestamps: false
});

// Thiết lập quan hệ
// Comment.belongsTo(Task, { foreignKey: 'TaskID', onDelete: 'CASCADE' });
// Comment.belongsTo(User, { foreignKey: 'UserID', onDelete: 'SET NULL' });

Comment.belongsTo(User, { foreignKey: 'UserID' });
User.hasMany(Comment,{ foreignKey: 'UserID' })

Comment.belongsTo(Task, { foreignKey: 'TaskID' });
Task.hasMany(Comment, { foreignKey: 'TaskID' });



module.exports = Comment;
