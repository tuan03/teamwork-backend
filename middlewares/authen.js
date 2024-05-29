const Result = require("../utils/result");
const { statusErrors } = require("../utils/statusErrors");


const authenticateUser = (req, res, next) => {
    if (req.session && req.session.UserID) {
        // Nếu người dùng đã đăng nhập, cho phép tiếp tục
        req.userID = req.session.UserID
        console.log("Người dùng:",req.userID)
        next();
    } else {
        // Nếu không, chuyển hướng đến trang đăng nhập
        next(Result.error(statusErrors.UNAUTHORIZED))
    }
};

module.exports = authenticateUser;
// app.post('/login', (req, res) => {
//     // Thực hiện xác thực và lưu thông tin người dùng vào session
//     req.session.user = {
//         username: 'example_user',
//         email: 'user@example.com'
//     };
//     res.send('Đăng nhập thành công!');
// });
// app.get('/logout', (req, res) => {
//     // Xóa thông tin người dùng từ session
//     req.session.destroy(err => {
//         if (err) {
//             console.log(err);
//         } else {
//             res.redirect('/login');
//         }
//     });
// });