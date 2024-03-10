const authenticateUser = (req, res, next) => {
    if (req.session && req.session.user) {
        // Nếu người dùng đã đăng nhập, cho phép tiếp tục
        next();
    } else {
        // Nếu không, chuyển hướng đến trang đăng nhập
        res.redirect('/login');
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