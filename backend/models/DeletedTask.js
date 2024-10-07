const mongoose = require("mongoose");

const deletedTaskSchema = new mongoose.Schema({
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  taskType: {
    type: String,
    required: true,
  },
  reminderDate: String,
  reminderTime: String,
  completionDate: Date,
  deletedAt: {
    type: Date,
    default: Date.now,
  },
});

const DeletedTask = mongoose.model("DeletedTask", deletedTaskSchema);

module.exports = DeletedTask;
