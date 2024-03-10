import React from "react";
import MonthlyBarChart from "./components/MonthlyBarChart";
import UsersHistoryChart from "./components/UsersHistoryChart";

const DashboardSecondRow = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-7 lg:col-span-8">
        <UsersHistoryChart />
      </div>
      {/*<div className="col-span-12 md:col-span-5 lg:col-span-4">
        <MonthlyBarChart />
  </div>*/}
    </div>
  );
};

export default DashboardSecondRow;
