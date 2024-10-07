import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loader from "./utils/Loader";
import Tooltip from "./utils/Tooltip";

const Tasks = () => {
  const authState = useSelector((state) => state.authReducer);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]); // State for filtered tasks
  const [fetchData, { loading }] = useFetch();
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const fetchTasks = useCallback(() => {
    const config = {
      url: "/tasks",
      method: "get",
      headers: { Authorization: authState.token },
    };
    fetchData(config, { showSuccessToast: false }).then((data) => {
      setTasks(data.tasks);
    });
  }, [authState.token, fetchData]);

  useEffect(() => {
    if (!authState.isLoggedIn) return;
    fetchTasks();
  }, [authState.isLoggedIn, fetchTasks]);

  // Function to handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Update search query state
  };

  useEffect(() => {
    // Filter tasks based on search query
    const filtered = tasks.filter((task) =>
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTasks(filtered); // Update filtered tasks state
  }, [tasks, searchQuery]);

  const handleDelete = (id) => {
    const config = {
      url: `/tasks/${id}`,
      method: "delete",
      headers: { Authorization: authState.token },
    };
    fetchData(config).then(() => fetchTasks());
  };

  return (
    <>
      <div className="my-2 mx-auto max-w-[700px] py-4">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery} // Bind search query state to input value
          onChange={handleSearchChange} // Handle input change
          className="text-sm focus:outline-none active:outline-none border border-gray-300 w-[24rem] h-10 pl-3 pr-10 rounded-sm"
        />
        {loading ? (
          <Loader />
        ) : (
          <div>
            {filteredTasks.length === 0 ? (
              <div className="w-[600px] h-[300px] flex items-center justify-center gap-4">
                <span>No tasks found</span>
                <Link
                  to="/tasks/add"
                  className="bg-blue-500 text-white hover:bg-8DECB4 hover:text-black font-medium rounded-md px-4 py-2"
                >
                  + Add new task{" "}
                </Link>
              </div>
            ) : (
              filteredTasks.map((task, index) => (
                <div
                  key={task._id}
                  className="bg-white my-4 p-4 text-gray-600 rounded-md shadow-md"
                >
                  <div className="flex">
                    <span className="font-medium">Task #{index + 1}</span>

                    <Tooltip text={"Edit this task"} position={"top"}>
                      <Link
                        to={`/tasks/${task._id}`}
                        className="ml-auto mr-2 text-green-600 cursor-pointer"
                      >
                        <i className="fa-solid fa-pen"></i>
                      </Link>
                    </Tooltip>

                    <Tooltip text={"Delete this task"} position={"top"}>
                      <span
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleDelete(task._id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </span>
                    </Tooltip>
                  </div>

                  <div className="whitespace-pre">{task.description}</div>

                  <div className="mt-2">Task Type: {task.taskType}</div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Tasks;
