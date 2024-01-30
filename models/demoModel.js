// models/userModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Demo = sequelize.define('Demo', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
// (async () => {
//   await sequelize.sync();
//   console.log('Bảng đã được tạo hoặc đã tồn tại');
// })();
module.exports = Demo;
