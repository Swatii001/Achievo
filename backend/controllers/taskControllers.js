const Task = require("../models/Task");
const { validateObjectId } = require("../utils/validation");
const DeletedTask = require("../models/DeletedTask");

//`getTasks` – Fetch All Tasks
exports.getTasks = async (req, res) => {
	try {
		const tasks = await Task.find({ user: req.user.id });
		res
			.status(200)
			.json({ tasks, status: true, msg: "Tasks found successfully." });
	} catch (err) {
		console.error(err);
		res.status(500).json({ status: false, msg: "Internal Server Error" });
	}
};

//`getTask` – Fetch a Single Task
exports.getTask = async (req, res) => {
	try {
		if (!validateObjectId(req.params.taskId)) {
			return res.status(400).json({ status: false, msg: "Task ID not valid" });
		}

		const task = await Task.findOne({
			user: req.user.id,
			_id: req.params.taskId,
		});
		if (!task) {
			return res.status(400).json({ status: false, msg: "No task found." });
		}
		res
			.status(200)
			.json({ task, status: true, msg: "Task found successfully." });
	} catch (err) {
		console.error(err);
		res.status(500).json({ status: false, msg: "Internal Server Error" });
	}
};

//`postTask` – Create a New Task
exports.postTask = async (req, res) => {
	try {
		const {
			title,
			description,
			taskType,
			reminderDate,
			reminderTime,
			completionDate,
		} = req.body;
		if (!title || !description || !taskType) {
			return res.status(400).json({
				status: false,
				msg: "Title, description, or taskType of task not found",
			});
		}
		if (description.length > 1000) {
			return res.status(400).json({
				status: false,
				msg: "Description exceeds maximum length of 1000 characters",
			});
		}
		const task = await Task.create({
			user: req.user.id,
			title,
			description,
			taskType,
			reminderDate,
			reminderTime,
			completionDate,
		});
		res
			.status(200)
			.json({ task, status: true, msg: "Task created successfully." });
	} catch (err) {
		console.error(err);
		res.status(500).json({ status: false, msg: "Internal Server Error" });
	}
};

//`putTask` – Update a Task
exports.putTask = async (req, res) => {
	try {
		const {
			title,
			description,
			taskType,
			reminderDate,
			reminderTime,
			completionDate,
		} = req.body;
		if (!title || !description || !taskType) {
			return res.status(400).json({
				status: false,
				msg: "Title, description, or taskType of task not found",
			});
		}
		if (description.length > 1000) {
			return res.status(400).json({
				status: false,
				msg: "Description exceeds maximum length of 1000 characters",
			});
		}
		await Task.findByIdAndUpdate(req.params.taskId, {
			title,
			description,
			taskType,
			reminderDate,
			reminderTime,
			completionDate,
		});
		res.status(200).json({ status: true, msg: "Task updated successfully." });
	} catch (err) {
		console.error(err);
		res.status(500).json({ status: false, msg: "Internal Server Error" });
	}
};

//`deleteTask` – Delete a Task
exports.deleteTask = async (req, res) => {
	try {
		// Validate the task ID
		if (!validateObjectId(req.params.taskId)) {
			return res
				.status(400)
				.json({ status: false, msg: "Task ID is not valid" });
		}

		// Find the task by ID
		const task = await Task.findById(req.params.taskId);
		if (!task) {
			return res
				.status(400)
				.json({ status: false, msg: "Task with the given ID not found" });
		}

		// Ensure the task belongs to the logged-in user
		if (task.user != req.user.id) {
			return res.status(403).json({
				status: false,
				msg: "You can't delete a task of another user",
			});
		}

		// Create a new document in the DeletedTask collection
		const deletedTask = new DeletedTask({
			taskId: task._id,
			user: task.user,
			title: task.title,
			description: task.description,
			taskType: task.taskType,
			reminderDate: task.reminderDate,
			reminderTime: task.reminderTime,
			completionDate: task.completionDate,
			deletedAt: new Date(), // Optionally, add a timestamp for when the task was deleted
		});

		// Save the deleted task
		await deletedTask.save();

		// Delete the task from the Task collection
		await Task.findByIdAndDelete(req.params.taskId);

		// Respond to the client
		res.status(200).json({ status: true, msg: "Task deleted successfully." });
	} catch (err) {
		console.error(err);
		res.status(500).json({ status: false, msg: "Internal Server Error" });
	}
};

//`getTasksStats` – Get Task Statistics
exports.getTasksStats = async (req, res) => {
	try {
		const tasks = await Task.find({ user: req.user.id });
		const dailyTasks = tasks.filter((task) => task.taskType === "daily").length;
		const weeklyTasks = tasks.filter(
			(task) => task.taskType === "weekly"
		).length;
		const monthlyTasks = tasks.filter(
			(task) => task.taskType === "monthly"
		).length;

		const totalTasks = tasks.length;

		res.status(200).json({
			dailyTasks,
			weeklyTasks,
			monthlyTasks,
			totalTasks,
			status: true,
			msg: "Task stats fetched successfully.",
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ status: false, msg: "Internal Server Error" });
	}
};

//`getDeletedTasks` – Get Deleted Tasks
exports.getDeletedTasks = async (req, res) => {
	try {
		const deletedTasks = await DeletedTask.find({ user: req.user.id });
		res.status(200).json({
			deletedTasks,
			status: true,
			msg: "Deleted tasks fetched successfully.",
		});
	} catch (err) {
		console.error("Error fetching deleted tasks:", err);
		res.status(500).json({ status: false, msg: "Internal Server Error" });
	}
};
// `completeTask` – Mark a Task as Completed
