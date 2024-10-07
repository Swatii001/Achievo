import React, { useState } from "react";
import Header from "./Header";
import Tasks from "./Tasks";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State for search query

  return (
    <div>
      <Header setSearchTerm={setSearchTerm} /> {/* Pass setSearchTerm */}
      <Tasks searchQuery={searchTerm} /> {/* Pass searchQuery */}
    </div>
  );
};

export default Dashboard;
