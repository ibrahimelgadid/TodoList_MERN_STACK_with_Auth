//---------------------------------------------|
//           All required modules
//---------------------------------------------|
//
//
//
const bcrypt = require("bcryptjs");
const validateRegistrationInputs = require("../validation/registerValidate");
const Todo = require("../models/todoModel");
const validateTodoInputs = require("../validation/todoValidate");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

//---------------------------------------------|
//           Create New functionality
//---------------------------------------------|
const createTask = asyncHandler(async (req, res) => {
  const { title, body } = req.body;
  const user = req.user.id;
  const { isValid, errors } = validateTodoInputs(req.body);
  if (!isValid) return res.status(400).json(errors);

  const titleExists = await Todo.findOne({ title });

  if (titleExists) {
    errors.title = "This title already exists";
    return res.status(400).json(errors);
  } else {
    const newTask = new Todo({
      title,
      body,
      user,
    });

    let newTaskAdded = await newTask.save();

    if (newTaskAdded) {
      res.status(201).json({ taskSuccuss: "New task created" });
    } else {
      res.status(400).json({ taskError: "Failed to create Task" });
    }
  }
});

//---------------------------------------------|
//           Get All Tasks functionality
//---------------------------------------------|
const getTasks = asyncHandler(async (req, res) => {
  const page = req.query.page ? req.query.page : 1;
  const queries = {
    $or: [
      { title: { $regex: req.query.search, $options: "i" } },
      { body: { $regex: req.query.search, $options: "i" } },
    ],
  };
  const tasks = await Todo.find(queries)
    .limit(2)
    .skip((page - 1) * 2)
    .populate("user", "-password");

  if (tasks) {
    let todosCount = await Todo.count(queries);
    res.status(200).json({ todosCount: Math.ceil(todosCount / 2), tasks });
  } else {
    res.status(400).json({ getError: "There's no tasks" });
  }
});

//---------------------------------------------|
//           Get Task By ID functionality
//---------------------------------------------|
const getTaskById = asyncHandler(async (req, res) => {
  let task = await Todo.findById(req.params.taskId).populate(
    "user",
    "-password"
  );
  if (task) {
    res.status(200).json(task);
  } else {
    res.status(400).json({ getError: "There's no task for this id" });
  }
});

//---------------------------------------------|
//           Update Task By ID functionality
//---------------------------------------------|
const updateTaskById = asyncHandler(async (req, res) => {
  const { isValid, errors } = validateTodoInputs(req.body);
  if (!isValid) return res.status(400).json(errors);

  const existTaskTitle = await Todo.findOne({
    $and: [{ title: req.body.title }, { _id: { $ne: req.params.taskId } }],
  });

  if (!existTaskTitle) {
    const updatedTask = await Todo.findByIdAndUpdate(
      req.params.taskId,
      {
        $set: req.body,
      },
      { new: true }
    ).populate("user", "-password");

    if (updatedTask) {
      res.status(200).json(updatedTask);
    } else {
      res.status(400).json({ updateError: "There's no task for this id" });
    }
  } else {
    errors.title = "This title already exists";
    res.status(400).json(errors);
  }
});

//---------------------------------------------|
//           Delete Task By ID functionality
//---------------------------------------------|
const deleteTaskById = asyncHandler(async (req, res) => {
  const deletedTask = await Todo.findByIdAndDelete(req.params.taskId);
  if (deletedTask) {
    res.status(200).json({ deleteSuccess: "Task deleted successfully" });
  } else {
    res.status(400).json({ deleteError: "There's no task for this id" });
  }
});

//
//
//
//---------------------------------------------|
//           Delete Task By ID functionality
//---------------------------------------------|
module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
};
