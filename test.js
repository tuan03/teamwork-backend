
const express = require('express');
const app = express();
let newData = 1
app.use(require("./config/cors"));
let clients = new Map();
//Server-Sent Events
// Hàm để gửi thông báo đến người dùng cụ thể
const sendEventToUser = (userID, data) => {
  if (clients.has(userID)) {
    const clientRes = clients.get(userID);
    clientRes.write(`data: ${JSON.stringify(data)}\n\n`);
  }
};
app.get('/events', (req, res) => {
  if (!req.session.userID) {
    res.status(401).send('Unauthorized');
    return;
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders(); // Gửi các header ngay lập tức

  const userID = req.session.userID;
  clients.set(userID, res);

  req.on('close', () => {
    clients.delete(userID);
  });
});


app.listen(1234)