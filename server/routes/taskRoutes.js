const express = require("express");

const router = express.Router();

const {
  createTask,
  getTasks,
  updateTaskStatus,
} = require("../controllers/taskController");

router.post("/", createTask);

router.get("/", getTasks);

router.put("/:id", updateTaskStatus);

module.exports = router;