const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadDir = path.join(__dirname, '..', 'uploads', 'img','avatar'); // Sử dụng đường dẫn tuyệt đối
      // Kiểm tra xem thư mục uploads có tồn tại không
      if (!fs.existsSync(uploadDir)) {
        // Nếu không tồn tại, tạo thư mục
        fs.mkdirSync(uploadDir, { recursive: true }); // Sử dụng recursive: true để tạo các thư mục cha nếu chưa tồn tại
      }
      fs.readdir(uploadDir, (err, files) => {
        if (err) {
            // Xử lý lỗi nếu có
            console.error("Error reading directory:", err);
            cb(err);
            return;
        }

        // Kiểm tra xem có tệp ảnh với tên là "avatar" không
        const avatarFile = files.find(filename => filename.startsWith("avatar"));
        if (avatarFile) {
            // Nếu có, xóa tệp ảnh đó đi
            fs.unlinkSync(path.join(uploadDir, avatarFile));
        }
        cb(null, uploadDir); // Thư mục để lưu trữ tệp tải lên
    });
      
    },
    filename: function (req, file, cb) {
      // Tạo tên tệp mới dựa trên thời gian và phần mở rộng của tệp gốc
      cb(null, "avatar" + path.extname(file.originalname))
    }
});

// Middleware để chỉ cho phép tải lên các tệp hình ảnh
const imageFilter = function (req, file, cb) {
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif']; // Các phần mở rộng cho phép
    const fileExtension = path.extname(file.originalname).toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
        return cb(null, false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFilter });

module.exports = upload;
