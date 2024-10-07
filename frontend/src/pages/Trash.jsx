import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import DeletedTaskTable from "../components/DeletedTaskTable";

function Trash() {
  return (
    <div className="flex flex-row bg neutral-100 h-screen w-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <div className="flex flex-row gap-4 w-full ">
          <DeletedTaskTable />
        </div>
      </div>
    </div>
  );
}

export default Trash;
