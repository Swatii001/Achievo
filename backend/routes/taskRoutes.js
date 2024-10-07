const express = require("express");
const Task = require("../models/Task");
const DeletedTask = require("../models/DeletedTask.js");
const router = express.Router();
const {
	getTasks,
	getDeletedTasks,
	getTask,
	postTask,
	putTask,
	deleteTask,
	getTasksStats,
} = require("../controllers/taskControllers");
const { verifyAccessToken } = require("../middlewares.js");

router.delete("/:taskId", verifyAccessToken, deleteTask);
router.get("/deleted", verifyAccessToken, getDeletedTasks);
router.get("/", verifyAccessToken, getTasks);
router.post("/", verifyAccessToken, postTask);
router.get("/stats", verifyAccessToken, getTasksStats);
router.get("/:taskId", verifyAccessToken, getTask);
router.put("/:taskId", verifyAccessToken, putTask);

module.exports = router;
