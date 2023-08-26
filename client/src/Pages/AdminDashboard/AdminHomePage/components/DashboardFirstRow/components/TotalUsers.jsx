import React from "react";
import { FiUsers } from "react-icons/fi";
import { useAdminUsers } from "../../../../../../hooks/react-query/useUsers";

const TotalUsers = () => {
  const { data } = useAdminUsers();

  return (
    <div className="px-4 py-6 h-full bg-gradient-to-t from-purple-800 to-purple-500 rounded-xl shadow-md border text-white transform hover:scale-105 transition-transform duration-300">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-md text-xl font-semibold tracking-wide">
            Total Users{" "}
          </p>
          <div className="rounded-full bg-purple-700 p-2 transform transition-transform hover:rotate-12">
            <FiUsers className="w-6 h-6" />
          </div>
        </div>
        <p className="font-bold text-3xl">{data?.length}</p>
      </div>
    </div>
  );
};
export default TotalUsers;
