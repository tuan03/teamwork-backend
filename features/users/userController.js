const { where } = require('sequelize');
const userModel = require('../../models/userModel');
const Result = require('../../utils/result');
const {statusErrors} = require('../../utils/statusErrors')
const isValidEmail = require('../../utils/checkEmail');
const generateRandomNumber = require('../../utils/generateRandomNumber');
const sendEmail = require('../../utils/sendEmail');

async function checkLogin(req,res,next){
    res.json(Result.success(204,null,"Đã xác thực người dùng"))
}

// Function for user registration
async function registerUser(req, res,next) {
    try {
        // Create a new user using userModel
        const newUser = await userModel.create(req.body);
        req.session.UserID = newUser.UserID;
        
        res.status(201).json(Result.success(201));

    } catch (error) {
        next(Result.error(statusErrors.DATA_CONFLICT))
    }
}


// Function for user login
async function loginUser(req, res,next) {
    try {
        if(isValidEmail(req.body.Username)){
            const newUser = await userModel.findOne({ where: { Email: req.body.Username, PasswordHash: req.body.PasswordHash } });
            req.session.UserID = newUser.UserID;
            res.status(200).json(Result.success(200));
        } else {
            const newUser = await userModel.findOne({ where: { UserName: req.body.Username, PasswordHash: req.body.PasswordHash } });
            req.session.UserID = newUser.UserID;
            res.status(200).json(Result.success(200));
        }
    } catch (error) {
        next(Result.error(statusErrors.UNAUTHORIZED))
    }
}

// Function for user logout
async function logoutUser(req, res,next, err) {
    try {
        
        // Xóa thông tin người dùng từ session
        req.session.destroy(err => {
            if (err) {
                next(Result.error(err))
            } else {
                res.status(200).json(Result.success(200));
            }
        });

    } catch (error) {
        next(error)
    }
}

// Function for updating user information
async function updateUser(req, res,next) {
    try {
        const userTmp = await userModel.findOne({ where: { Email: req.body.Email } });
        if(userTmp == null || userTmp.UserID == req.session.UserID ){
            // Make a PUT request to the API endpoint for updating user information using userModel
            const response = await userModel.update(
                {
                    FullName: req.body.FullName, 
                    BirthDay: req.body.BirthDay, 
                    Email: req.body.Email,
                    Information: req.body.Information,
                    
                },
                {
                    where:{
                        UserID: req.session.UserID
                    }
                }  
            );
            res.status(201).json(Result.success(201));
        }else{
            // Lỗi email đã tồn tại
            next(Result.error(statusErrors.DATA_CONFLICT))
        }
    } catch (error) {
        next(error)
    }
}

async function sendOTP(req, res,next){
    try {
        const OTP = generateRandomNumber();
        const OTPGeneratedAt = new Date();

        const response = await userModel.update(
            {
                OTP: OTP,
                OTPGeneratedAt: OTPGeneratedAt
            },
            {
                where:{
                    Email: req.body.Email
                }
            }  
        );
        if(sendEmail(req.body.Email, OTP)){
            // Không gửi được email
            next(error)
        }else{
            req.session.Email = req.body.Email;
            // Gửi email thành công
            res.status(200).json(Result.success(200));
            
        }
        
    } catch (error) {
        // Không tìm thấy email
        next(Result.error(statusErrors.BAD_REQUEST))
    }
}

async function confirmOTP(req, res,next){
    try {
        const user = await userModel.findOne({ where: { Email: req.session.Email } });
        const timeNow = new Date().getTime();
        if(user.OTP == req.body.OTP && (timeNow - user.OTPGeneratedAt.getTime() <= 5*60*1000)){
            res.status(200).json(Result.success(200));
        }
        else{
            if(user.OTP != req.body.OTP){
                next(Result.error(statusErrors.BAD_REQUEST))
            }
            else{
                next(Result.error(statusErrors.REQUEST_TIMEOUT))
            }
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
}

async function changePasswordfoget(req, res,next){
    try {
        const user = await userModel.findOne({ where: { Email: req.session.Email } });
        const response = await userModel.update(
            {
                PasswordHash: req.body.NewPasswordHash,
            },
            {
                where:{
                    Email: req.body.Email
                }
            }  
        );
        res.status(200).json(Result.success(200));
    } catch (error) {
        next(error)
    }
}

async function changePassword(req, res,next){
    try {
        const user = await userModel.findOne({ where: { UserID: req.session.UserID } });
        if(user.PasswordHash == req.body.PasswordHash){
            const response = await userModel.update(
                {
                    PasswordHash: req.body.NewPasswordHash,
                },
                {
                    where:{
                        UserID: req.session.UserID
                    }
                }  
            );
            res.status(200).json(Result.success(200));
        }else{
            //Mật khẩu cũ không đúng
            next(Result.error(statusErrors.BAD_REQUEST))
        }
        
        
    } catch (error) {
        next(error)
    }
}

async function changeAvatar(req, res, next) {
    if (req.file) {
        const imagePath = req.file.path; // Đường dẫn của file hình ảnh đã tải lên
        const index = imagePath.indexOf('uploads'); // Tìm vị trí của chuỗi 'uploads' trong đường dẫn
        if (index !== -1) {
            const partialPath = imagePath.substring(index); // Lấy phần của đường dẫn từ vị trí 'uploads' trở đi
            const response = await userModel.update(
                {
                    Avatar: partialPath,
                },
                {
                    where: {
                        UserID: 1
                        //req.session.UserID
                    }
                }
            );
            res.status(200).json(Result.success(200));
        } else {
            // Xử lý trường hợp không tìm thấy chuỗi 'uploads' trong đường dẫn
            next(Result.error(statusErrors.BAD_REQUEST))
        }
    } else {
        next(Result.error(statusErrors.BAD_REQUEST))
    }
}
async function setDefaultAvatar(req, res, next) {
    try {
        const imagePath = "uploads/img/default.jpg";
        const response = await userModel.update(
            {
                Avatar: imagePath,
            },
            {
                where: {
                    UserID: 1
                    //req.session.UserID
                }
            }
        );
        res.status(200).json(Result.success(200));
        
    } catch (error) {
        next(Result.error(statusErrors.BAD_REQUEST))
    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    updateUser,
    sendOTP,
    confirmOTP,
    changePasswordfoget,
    changePassword,
    changeAvatar,
    setDefaultAvatar,
    checkLogin
};
