const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// Thiết lập lưu trữ cho tệp tải lên
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, 'uploads/img');
    // Kiểm tra xem thư mục uploads có tồn tại không
    if (!fs.existsSync(uploadDir)) {
      // Nếu không tồn tại, tạo thư mục
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir); // Thư mục để lưu trữ tệp tải lên
  },
  filename: function (req, file, cb) {
    // Tạo tên tệp mới dựa trên thời gian và phần mở rộng của tệp gốc
    cb(null, "ABCD" + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

// Route để xử lý yêu cầu tải lên ảnh
app.post('/upload', upload.single('image'), (req, res) => {
  // Kiểm tra xem có tệp đã được tải lên không
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  // Trả về đường dẫn tới tệp tải lên
  res.send(`File uploaded successfully: ${req.file.path}`);
});

// Route để phục vụ hình ảnh từ thư mục uploads
app.use('/images', express.static(path.join(__dirname, 'uploads')));

// Khởi chạy máy chủ
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
