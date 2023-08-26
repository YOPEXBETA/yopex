import React from "react";
import TotalUsers from "./components/TotalUsers";
import TotalEarning from "./components/TotalEarning";
import Companies from "./components/Companies";

const DashboardFirstRow = () => {
  return (
    <div className="flex-grow">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2">
        <div className="w-full">
          <TotalEarning />
        </div>
        <div className="w-full">
          <TotalUsers />
        </div>
        <div className="w-full">
          <Companies />
        </div>
      </div>
    </div>
  );
};

export default DashboardFirstRow;
