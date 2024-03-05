const express = require("express");
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post(
  "/create-task",
  authMiddleware.authenticateToken,
  taskController.createTask
);

router.put(
  "/update-task",
  authMiddleware.authenticateToken,
  taskController.updateTask
);

router.delete(
  "/delete-task",
  authMiddleware.authenticateToken,
  taskController.deleteTask
);

router.put(
  "/shift-column",
  authMiddleware.authenticateToken,
  taskController.shiftColumn
);

module.exports = router;
