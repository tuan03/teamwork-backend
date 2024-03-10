const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const User = sequelize.define('accounts', {
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    Username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    PasswordHash: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    FullName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    BirthDay: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    Avatar: {
      type: DataTypes.STRING(255),
      defaultValue: 'img/avatar/default.png'
    },
    Information: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    OTP: {
      type: DataTypes.CHAR(6),
      allowNull: true
    },
    OTPGeneratedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    CreatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    // Tùy chọn cho model
    timestamps: false, // Sequelize sẽ không tự động tạo các cột createdAt và updatedAt
    tableName: 'accounts' // Tên bảng trong cơ sở dữ liệu
  });
  
// (async () => {
//   await sequelize.sync();
//   console.log('Bảng đã được tạo hoặc đã tồn tại');
// })();
module.exports = User;