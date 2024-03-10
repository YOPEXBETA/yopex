import React, { useEffect } from "react";
import DashboardFirstRow from "./components/DashboardFirstRow/DashboardFirstRow";
import DashboardSecondRow from "./components/DashboardSecondRow/DashboardSecondRow";

const AdminDashboard = () => {
  return (
    <div className="space-y-4 h-screen">
      <DashboardFirstRow />
      <DashboardSecondRow />
    </div>
  );
};

export default AdminDashboard;
