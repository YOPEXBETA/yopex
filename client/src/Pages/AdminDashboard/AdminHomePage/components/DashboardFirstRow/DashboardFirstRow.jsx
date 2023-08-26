import React from "react";
import NewUsers from "./components/NewUsers";
import TotalUsers from "./components/TotalUsers";
import TotalEarning from "./components/TotalEarning";

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
          <NewUsers />
        </div>
      </div>
    </div>
  );
};

export default DashboardFirstRow;
