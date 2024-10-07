import React, { useEffect, useState } from "react";
import { IoBagHandle, IoPeople, IoCart } from "react-icons/io5";
import { SiBuzzfeed } from "react-icons/si";

export default function TaskCard() {
  const [taskStats, setTaskStats] = useState({
    totalTasks: 0,
    dailyTasks: 0,
    weeklyTasks: 0,
    monthlyTasks: 0,
  });

  useEffect(() => {
    fetchTaskStats();
  }, []);

  const fetchTaskStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/tasks/stats", {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Response status code:", response.status);
        console.log("Response data:", data);
        setTaskStats(data);
      } else {
        console.error("Failed to fetch task stats");
      }
    } catch (error) {
      console.error("Error fetching task stats:", error);
    }
  };

  return (
    <div className="flex gap-4">
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
          <IoBagHandle className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Total Tasks</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {taskStats.totalTasks}
            </strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
          <SiBuzzfeed className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">
            Monthly Tasks
          </span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {taskStats.monthlyTasks}
            </strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
          <IoPeople className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Weekly Tasks</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {taskStats.weeklyTasks}
            </strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
          <IoCart className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Daily Tasks</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {taskStats.dailyTasks}
            </strong>
          </div>
        </div>
      </BoxWrapper>
    </div>
  );
}

function BoxWrapper({ children }) {
  return (
    <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">
      {children}
    </div>
  );
}
