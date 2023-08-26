import React from "react";
import MonthlyBarChart from "./components/MonthlyBarChart";
import UsersHistoryChart from "./components/UsersHistoryChart";

const DashboardSecondRow = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-7 lg:col-span-8">
        <div className="bg-white h-full shadow-xl rounded-xl">
          <div className="p-4">
            <h6 className="text-lg font-semibold">User Analytics</h6>
          </div>
          <div className="p-4">
            <UsersHistoryChart />
          </div>
        </div>
      </div>
      <div className="col-span-12 md:col-span-5 lg:col-span-4">
        <div className="bg-white h-full shadow-xl rounded-xl">
          <div className="p-4">
            <h6 className="text-lg font-semibold">Year Statistics</h6>
          </div>
          <div className="p-4">{/* MonthlyBarChart */}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSecondRow;
