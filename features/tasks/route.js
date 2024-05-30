const express = require('express');
const router = express.Router();
const taskController = require('./taskController');
const { createTaskValidation, updateTaskValidation } = require('./taskValidations');
const authenticateUser = require('../../middlewares/authen');
const checkProjectAccess = require("../../middlewares/checkProjectAccess")
// Middleware cho việc xác thực người dùng
router.use(authenticateUser);

// Tạo task
router.post('/', createTaskValidation,checkProjectAccess(['Admin','Mod']), taskController.createTask);

// Lấy all Task
router.get('/', taskController.getAllMyTasks);


// Lấy all Task
router.get('/:ProjectID/all',checkProjectAccess(['Admin','Mod','Member']), taskController.getAllTasks);

// Lấy all task đã hoàn thành
router.get('/:ProjectID/completed',checkProjectAccess(['Admin','Mod','Member']), taskController.getAllCompletedTasks);

// Lấy all task chưa hoàn thành
router.get('/:ProjectID/uncompleted',checkProjectAccess(['Admin','Mod','Member']), taskController.getAllUncompletedTasks);

//Lấy số lượng task đã hoàn thành của từng thành viên trong project
router.get('/:ProjectID/completed/count',checkProjectAccess(['Admin','Mod','Member']), taskController.getCompletedTaskCount);

// Lấy thông tin task bằng ID
router.get('/:TaskID',checkProjectAccess(['Admin','Mod','Member']), taskController.getTaskById);

// Liệt kê tất cả các task của tôi trong project
router.get('/:ProjectID/my',checkProjectAccess(['Admin','Mod','Member']), taskController.getMyTasks);

// Cập nhật task
router.put('/:TaskID', updateTaskValidation,checkProjectAccess(['Admin','Mod']), taskController.updateTask);

// Xóa task
router.delete('/:TaskID',checkProjectAccess(['Admin','Mod']), taskController.deleteTask);



module.exports = router;
