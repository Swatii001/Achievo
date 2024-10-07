import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import TaskTable from "../components/TaskTable";

function InProgress() {
  return (
    <div className="flex flex-row bg neutral-100 h-screen w-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <div className="flex flex-row gap-4 w-full ">
          <TaskTable />
        </div>
      </div>
    </div>
  );
}

export default InProgress;
