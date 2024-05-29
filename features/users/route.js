const express = require('express');
const { checkLogin,registerUser,loginUser,logoutUser,updateUser,sendOTP,confirmOTP,changePasswordfoget,changePassword,changeAvatar,setDefaultAvatar,getInfo} = require('./userController');
const { createUserValidation,loginValidation, updateUserValidation, forgetPasswordValidation, changePasswordForgetValidation,changePasswordValidation} = require('./userValidations');
const router = express.Router();
const upload = require('../../utils/uploadImage');
const authenticateUser = require('../../middlewares/authen');
// đăng nhập, đăng kí, quên mật khẩu, đăng xuất
router.get('/info/:UserID',authenticateUser,getInfo);
router.get('/checkLogin',authenticateUser,checkLogin);
router.post('/register', createUserValidation, registerUser);
router.post('/login',loginValidation,loginUser);
// gửi mã OTP
router.post('/forgetPassword',forgetPasswordValidation,sendOTP )
router.post('/confirmOTP',confirmOTP );
router.patch('/changePasswordForget',changePasswordForgetValidation,changePasswordfoget);
router.get('/logout',logoutUser);

//thay đổi thông tin cá nhân
router.patch('/updateInforUser',updateUserValidation, updateUser);

// Thay đổi mật khẩu
router.patch('/changePassword', changePasswordValidation, changePassword);

// Thay đổi ảnh đại diện
router.post('/changeAvatar',upload.single('image'),changeAvatar);
// Xóa ảnh đại diện
router.post('/setDefaultAvatar',setDefaultAvatar)

module.exports = router;