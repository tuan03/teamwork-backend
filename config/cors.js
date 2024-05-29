// config/cors.js
const cors = require('cors');

// Cấu hình CORS
const corsOptions = {
  origin: ['http://192.168.0.113:3000','http://localhost:3000'], 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Cho phép gửi cookie qua CORS
  optionsSuccessStatus: 204,
};

module.exports = cors(corsOptions);
