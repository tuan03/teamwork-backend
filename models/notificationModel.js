const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const User = require('./userModel');

const Notification = sequelize.define('Notification', {
  NotificationID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  ReceiverID: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  Content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  CreatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  IsRead: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  tableName: 'pushnotifications',
  timestamps: false
});

Notification.belongsTo(User, { foreignKey: 'ReceiverID'});
User.hasMany(Notification,{ foreignKey: 'ReceiverID' })
module.exports = Notification;
