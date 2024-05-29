// app.js
require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");

// Kết nối với database
require("./utils/db")
  .authenticate()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Unable to connect to the database", err));

const staticDir = path.join(__dirname, "uploads");
app.use(express.static(staticDir));

//middleware
app.use(require("./middlewares/logger"));
app.use(require("./config/cors"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
//middleware

//session
app.use(
  session({
    secret: process.env.KEY_SECRET || "abcdacjnsjaaaa",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
//session

// const checkProjectAccess = require("./middlewares/checkProjectAccess")
// const authen = require("./middlewares/authen")
// app.post('/dev',authen,checkProjectAccess(['Admin','Mod']),(req,res)=>{
//   res.send("Thành Công")
// })

//test session
app.get("/set-session-test", (req, res) => {
  req.session.user = "Tuấn nè";
  res.send("Session set!");
});

app.get("/api/abc", (req, res, next) => {
  return res.json(Result.success(200, ["a", "b"]));
});

app.get("/get-session-test", (req, res) => {
  console.log(req.sessionID);

  res.send(`Hello`);
});
//end test session

//routes
const registerRoutes = require("./utils/registerRoutes");
registerRoutes(path.join(__dirname, "features"), app);
//Routes

//Celebrate error handling
app.use(require("./middlewares/validationError"));

//error 404
const Result = require("./utils/result");
const { statusErrors } = require("./utils/statusErrors");
app.use((req, res, next) => {
  next(Result.error(statusErrors.NOT_FOUND));
});
//error handling

app.use(require("./middlewares/errorHandler"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
