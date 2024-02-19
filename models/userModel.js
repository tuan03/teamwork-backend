const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const User = sequelize.define('User', { 
    UserID: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
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
        ype: DataTypes.STRING(100), 
        allowNull: false 
    }, 
    BirthDay: { 
        type: DataTypes.DATE 
    }, 
    Email: { 
        type: DataTypes.STRING(100), 
        allowNull: false, 
        unique: true 
    }, 
    Avatar: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: false 
    }, 
    Information: { 
        type: DataTypes.TEXT 
    }, 
    CreatedAt: { 
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW 
    },
 });
// (async () => {
//   await sequelize.sync();
//   console.log('Bảng đã được tạo hoặc đã tồn tại');
// })();
module.exports = User;