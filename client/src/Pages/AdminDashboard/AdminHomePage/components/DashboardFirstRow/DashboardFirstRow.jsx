import React from "react";
import TotalUsers from "./components/TotalUsers";
import TotalEarning from "./components/TotalEarning";
import Companies from "./components/Companies";
import { useStat } from "../../../../../hooks/react-query/useUsers";

const DashboardFirstRow = () => {
  const { data, isLoading } = useStat();

  return (
    <div className="flex-grow">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2">
        <div className="w-full">
          <TotalEarning />
        </div>
        <div className="w-full">
          <TotalUsers data={data} isLoading={isLoading} />
        </div>
        <div className="w-full">
          <Companies data={data} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default DashboardFirstRow;
