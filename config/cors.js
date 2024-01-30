// config/cors.js
const cors = require('cors');

// Cấu hình CORS
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Cho phép gửi cookie qua CORS
  optionsSuccessStatus: 204,
};

module.exports = cors(corsOptions);
