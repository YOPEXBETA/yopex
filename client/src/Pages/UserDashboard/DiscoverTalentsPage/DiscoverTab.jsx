import React from "react";
import UsersIcon from "../../../Components/icons/UsersIcon";
import CompanyIcon from "../../../Components/icons/CompanyIcon";

const DiscoverTab = ({ changeValue, value }) => {
  return (
      <div className="flex flex-col items-center sm:flex-row sm:items-center rounded-full text-gray-700 dark:bg-zinc-900 dark:text-white">
        <div className="flex flex-wrap gap-2">
          <button
              className={`flex items-center rounded-full transition-colors duration-300 ease-in focus:outline-none hover:text-indigo-500 focus:text-indigo-500 px-4 py-2 ${
                  value === 0 ? "bg-white shadow dark:bg-zinc-700 dark:text-white" : ""
              }`}
              onClick={() => changeValue(0)}
          >
            <div className="flex gap-2">
              <UsersIcon />
              <span className="hidden sm:inline">Talents</span>
            </div>
          </button>
          <button
              className={`flex items-center rounded-full transition-colors duration-300 ease-in focus:outline-none hover:text-indigo-500 focus:text-indigo-500 px-4 py-2 ${
                  value === 1 ? "bg-white shadow dark:bg-zinc-700 dark:text-white" : ""
              }`}
              onClick={() => changeValue(1)}
          >
            <div className="flex gap-2">
              <CompanyIcon />
              <span className="hidden sm:inline">Organizations</span>
            </div>
          </button>
        </div>
      </div>
  );
};

export default DiscoverTab;
