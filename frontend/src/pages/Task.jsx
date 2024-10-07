import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Textarea } from "../components/utils/Input";
import Loader from "../components/utils/Loader";
import useFetch from "../hooks/useFetch";
import MainLayout from "../layouts/MainLayout";
import validateManyFields from "../validations";

const Task = () => {
  const authState = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const [fetchData, { loading }] = useFetch();
  const { taskId } = useParams();

  const mode = taskId === undefined ? "add" : "update";
  const [task, setTask] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    taskType: "daily",
    reminderDate: "",
    reminderTime: "",
    completionDate: "",
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    document.title = mode === "add" ? "Add task" : "Update Task";
  }, [mode]);

  useEffect(() => {
    if (mode === "update") {
      const config = {
        url: `/tasks/${taskId}`,
        method: "get",
        headers: { Authorization: authState.token },
      };
      fetchData(config, { showSuccessToast: false }).then((data) => {
        setTask(data.task);
        setFormData({
          title: data.task.title,
          description: data.task.description,
          taskType: data.task.taskType,
          reminderDate: data.task.reminderDate,
          reminderTime: data.task.reminderTime,
          completionDate: data.task.completionDate,
        });
      });
    }
  }, [mode, authState, taskId, fetchData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = (e) => {
    e.preventDefault();
    setFormData({
      title: task.title,
      description: task.description,
      taskType: task.taskType,
      reminderDate: task.reminderDate,
      reminderTime: task.reminderTime,
      completionDate: task.completionDate,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateManyFields("task", formData);
    setFormErrors({});

    if (errors.length > 0) {
      setFormErrors(
        errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {})
      );
      return;
    }

    const config = {
      url: mode === "add" ? "/tasks" : `/tasks/${taskId}`,
      method: mode === "add" ? "post" : "put",
      data: formData,
      headers: { Authorization: authState.token },
    };

    fetchData(config).then(() => {
      navigate("/");
    });
  };

  const fieldError = (field) => (
    <p
      className={`mt-1 text-pink-600 text-sm ${
        formErrors[field] ? "block" : "hidden"
      }`}
    >
      <i className="mr-2 fa-solid fa-circle-exclamation"></i>
      {formErrors[field]}
    </p>
  );

  return (
    <MainLayout>
      <form className="m-auto my-16 max-w-[1000px] bg-white p-8 border-2 shadow-md rounded-md">
        {loading ? (
          <Loader />
        ) : (
          <>
            <h2 className="text-center mb-4">
              {mode === "add" ? "Add New Task" : "Edit Task"}
            </h2>
            <div className="mb-4">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {fieldError("title")}
            </div>
            <div className="mb-4">
              <label htmlFor="description">Description</label>
              <Textarea
                type="description"
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                maxLength={2000}
              />
              {fieldError("description")}
            </div>
            <div className="mb-4">
              <label>Task Type :</label>
              <br />
              <label>
                <input
                  type="radio"
                  name="taskType"
                  value="daily"
                  checked={formData.taskType === "daily"}
                  onChange={handleChange}
                />
                Daily
              </label>

              <label style={{ marginLeft: "10px" }}>
                <input
                  type="radio"
                  name="taskType"
                  value="weekly"
                  checked={formData.taskType === "weekly"}
                  onChange={handleChange}
                />
                Weekly
              </label>

              <label style={{ marginLeft: "10px" }}>
                <input
                  type="radio"
                  name="taskType"
                  value="monthly"
                  checked={formData.taskType === "monthly"}
                  onChange={handleChange}
                />
                Monthly
              </label>
            </div>
            <div className="mb-4">
              <label htmlFor="reminderDate">Reminder Date</label>{" "}
              <input
                type="date"
                name="reminderDate"
                id="reminderDate"
                value={formData.reminderDate}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {fieldError("reminderDate")}
            </div>
            <div className="mb-4">
              <label htmlFor="reminderTime">Reminder Time</label>{" "}
              <input
                type="time"
                name="reminderTime"
                id="reminderTime"
                value={formData.reminderTime}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {fieldError("reminderTime")}
            </div>
            <div className="mb-4">
              <label htmlFor="completionDate">Completion Date</label>
              <input
                type="date"
                name="completionDate"
                id="completionDate"
                value={formData.completionDate}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {fieldError("completionDate")}
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                className="bg-blue-500 text-white hover:bg-blue-600 font-medium rounded-md px-4 py-2"
                onClick={handleReset}
              >
                Reset
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white hover:bg-blue-600 font-medium rounded-md px-4 py-2"
                onClick={handleSubmit}
              >
                {mode === "add" ? "Add Task" : "Update Task"}
              </button>
            </div>
          </>
        )}
      </form>
    </MainLayout>
  );
};

export default Task;
