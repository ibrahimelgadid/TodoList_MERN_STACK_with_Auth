//---------------------------------------------|
//           All required modules
//---------------------------------------------|
const express = require("express");
const {
  createTask,
  getTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
} = require("../contollers/todoController");
const router = express.Router();

//---------------------------------------------|
//           Import controllers
//---------------------------------------------|
const { protect } = require("../middleware/authMiddleware");

//---------------------------------------------|
//              Todo routes
//---------------------------------------------|

// @route /todo/task
// @access private user
//@type post and get
router.route("/task").post(protect, createTask).get(protect, getTasks);

// @route /todo/task/:taskId
// @access private user
//@type get and put and delete
router
  .route("/task/:taskId")
  .get(protect, getTaskById)
  .put(protect, updateTaskById)
  .delete(protect, deleteTaskById);

module.exports = router;
