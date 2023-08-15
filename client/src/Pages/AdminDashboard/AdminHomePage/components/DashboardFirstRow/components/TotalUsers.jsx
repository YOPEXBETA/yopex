import React from "react";
import { useAdminUsers } from "../../../../../../hooks/react-query/useUsers";

const TotalUsers = () => {
  const { data } = useAdminUsers();

  return (
    <div className=" px-4 py-6 h-full bg-gradient-to-t from-green-800 to-green-500 rounded-xl shadow-md border text-white">
      <div className=" space-y-3">
        <div className=" flex gap-3 items-center">
          <p className=" text-lg items-end">Total Users</p>
        </div>
        <p className=" font-bold text-2xl">{data?.length}</p>
      </div>
    </div>
  );
};
export default TotalUsers;
