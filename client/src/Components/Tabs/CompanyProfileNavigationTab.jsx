import React from "react";

export const CompanyProfileNavigationTab = ({ changeValue, value }) => {
  return (
    <div>
      <div className="flex flex-wrap bg-white border-b-[1px] border-zinc-200">
        <button
          className={`w-1/2 sm:w-auto py-2 px-4 ${
            value === 0
              ? "bg-green-500 text-white border-green-500"
              : "text-gray-500 border-gray-300"
          }`}
          onClick={() => changeValue(0)}
        >
          My Posts
        </button>
        <button
          className={`w-1/2 sm:w-auto py-2 px-4 ${
            value === 1
              ? "bg-green-500 text-white border-green-500"
              : "text-gray-500 border-gray-300"
          }`}
          onClick={() => changeValue(1)}
        >
          My Jobs
        </button>
        <button
          className={`w-1/2 sm:w-auto py-2 px-4  ${
            value === 2
              ? "bg-green-500 text-white border-green-500"
              : "text-gray-500 border-gray-300"
          }`}
          onClick={() => changeValue(2)}
        >
          My Challenges
        </button>
        <button
          className={`w-1/2 sm:w-auto py-2 px-4  ${
            value === 3
              ? "bg-green-500 text-white border-green-500"
              : "text-gray-500 border-gray-300"
          }`}
          onClick={() => changeValue(3)}
        >
          My Appliers
        </button>
      </div>
    </div>
  );
};
