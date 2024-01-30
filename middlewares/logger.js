const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const logDirectory = path.join(__dirname, '..', 'logs');
const logFilePath = path.join(logDirectory, 'access.log');
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}
if (!fs.existsSync(logFilePath)) {
  fs.writeFileSync(logFilePath, ""); // Tạo một tệp rỗng
}

const logStream = fs.createWriteStream(
    logFilePath,
  { flags: "a" }
);

const logger = morgan("combined", { stream: logStream });

module.exports = logger;
