import React, { useState, useEffect } from "react";
import { FaCheck, FaTrash } from "react-icons/fa";

const TaskTable = ({ searchTerm }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setTasks(data.tasks);
      } else {
        console.error("Failed to fetch tasks");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/tasks/${taskId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.ok) {
        fetchTasks();
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  const handleCompleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/tasks/${taskId}/complete`,
        {
          method: "PUT",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed: true }),
        }
      );
      if (response.ok) {
        fetchTasks();
      } else {
        console.error("Failed to complete task");
      }
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  const handleSendEmail = async (userId, taskId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/send-email/${userId}/${taskId}`,
        {
          method: "POST",
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.ok) {
        console.log("Email sent successfully");
      } else {
        console.error("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
  // const filteredTasks = tasks.filter((task) =>
  //   task.title.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <strong className="text-gray-700 font-medium">Task Table</strong>
      <div className="mt-3">
        <table className="w-full text-gray-700 table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Serial No</th>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Task Type</th>
              <th className="px-4 py-2">Created Date</th>
              <th className="px-4 py-2">Reminder Date</th>
              <th className="px-4 py-2">Completion Date</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr
                key={task._id}
                className={index % 2 === 0 ? "bg-gray-100" : ""}
              >
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{task._id.substr(0, 8)}</td>
                <td className="border px-4 py-2">{task.title}</td>
                <td className="border px-4 py-2">{task.description}</td>
                <td className="border px-4 py-2">{task.taskType}</td>
                <td className="border px-4 py-2">
                  {new Date(task.createdAt).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">
                  {task.reminderDate
                    ? new Date(task.reminderDate).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="border px-4 py-2">
                  {task.completionDate
                    ? new Date(task.completionDate).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  >
                    <FaTrash />
                  </button>
                  <button
                    onClick={() => handleCompleteTask(task._id)}
                    className="bg-green-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  >
                    <FaCheck
                      className={task.completed ? "text-blue-500" : ""}
                    />
                  </button>

                  <button
                    onClick={() => handleSendEmail(task._id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  >
                    Send Email
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskTable;
