// app.js
require('dotenv').config();
const path = require('path')
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');

// Kết nối với database
require('./utils/db').authenticate()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Unable to connect to the database', err));




  
//middleware
app.use(require('./middlewares/logger'));
app.use(require('./config/cors'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
//middleware

//session
app.use(session({
  secret: process.env.KEY_SECRET || "abcdacjnsjaaaa",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
}));
//session



//test session
app.get('/set-session-test', (req, res) => {
  req.session.user = 'Tuấn nè';
  res.send('Session set!');
});

app.get('/get-session-test', (req, res) => {
  const user = req.session.user || 'Guest';
  console.log(req.sessionID)
  ap.x
  res.send(`Hello, ${user}!`);
});
//end test session


//routes
const registerRoutes = require("./utils/registerRoutes");
registerRoutes(path.join(__dirname, 'features'),app);
//Routes



//Celebrate error handling
app.use(require('./middlewares/validationError')); 

//error 404
const Result = require('./utils/result');
const { statusErrors } = require('./utils/statusErrors');
app.use((req, res, next)=>{
  next(Result.error(statusErrors.NOT_FOUND))
})
//error handling

app.use(require('./middlewares/errorHandler'));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

