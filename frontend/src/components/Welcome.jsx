import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";

const Welcome = () => {
  const authState = useSelector((state) => state.authReducer);

  return (
    <div className="flex flex-row bg neutral-100 h-screen w-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <div className="container">
          <h1 className="text-lg mt-8 mx-8 border-b border-b-gray-300">
            Welcome {authState.user.name}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
