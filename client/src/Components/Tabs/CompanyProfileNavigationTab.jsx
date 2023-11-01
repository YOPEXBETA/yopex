import React from "react";

export const CompanyProfileNavigationTab = ({
  changeValue,
  value,
  companyId,
  userPassed,
}) => {
  return (
    <div>
      <div className="flex flex-wrap">
        <button
          className={`w-1/2 sm:w-auto py-2 px-4 ${
            value === 0
              ? "bg-green-500 text-white border-green-500 border-b-green-500"
              : "text-gray-500 dark:text-gray-200 border-gray-300"
          }`}
          onClick={() => changeValue(0)}
        >
          About
        </button>
        <button
          className={`w-1/2 sm:w-auto py-2 px-4 ${
            value === 1
              ? "bg-green-500 text-white border-green-500"
              : "text-gray-500 dark:text-gray-200 border-gray-300"
          }`}
          onClick={() => changeValue(1)}
        >
          Posts
        </button>
        <button
          className={`w-1/2 sm:w-auto py-2 px-4 ${
            value === 2
              ? "bg-green-500 text-white border-green-500"
              : "text-gray-500 dark:text-gray-200 border-gray-300"
          }`}
          onClick={() => changeValue(2)}
        >
          Jobs
        </button>
        <button
          className={`w-1/2 sm:w-auto py-2 px-4  ${
            value === 3
              ? "bg-green-500 text-white border-green-500"
              : "text-gray-500 dark:text-gray-200 border-gray-300"
          }`}
          onClick={() => changeValue(3)}
        >
          Challenges
        </button>
        {userPassed.companies.includes(companyId) && (
          <button
            className={`w-1/2 sm:w-auto py-2 px-4  ${
              value === 4
                ? "bg-green-500 text-white border-green-500"
                : "text-gray-500 dark:text-gray-200 border-gray-300"
            }`}
            onClick={() => changeValue(4)}
          >
            Appliers
          </button>
        )}
      </div>
    </div>
  );
};
