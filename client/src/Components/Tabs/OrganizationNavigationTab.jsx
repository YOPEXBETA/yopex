import React from "react";

export const OrganizationNavigationTab = ({changeValue,value}) => {
  return (
    <div>
      <div className="flex flex-wrap">
        <button
          className={`w-1/2 sm:w-auto py-2 px-4 ${
            value === 0
              ? "inline-block p-4 text-black border-b-2 border-black rounded-t-lg active dark:text-purple-400 dark:border-purple-400"
              : "text-gray-500 dark:text-gray-200 border-gray-300"
          }`}
          onClick={() => changeValue(0)}
        >
          Overview
        </button>
        <button
          className={`w-1/2 sm:w-auto py-2 px-4 ${
            value === 1
              ? "inline-block p-4 text-black border-b-2 border-black rounded-t-lg active dark:text-purple-400 dark:border-purple-400"
              : "text-gray-500 dark:text-gray-200 border-gray-300"
          }`}
          onClick={() => changeValue(1)}
        >
          Jobs 
        </button>
        <button
          className={`w-1/2 sm:w-auto py-2 px-4  ${
            value === 2
              ? "inline-block p-4 text-black border-b-2 border-black rounded-t-lg active dark:text-purple-400 dark:border-purple-400"
              : "text-gray-500 dark:text-gray-200 border-gray-300"
          }`}
          onClick={() => changeValue(2)}
        >
          Challenges 
        </button>
        
        <button
          className={`w-1/2 sm:w-auto py-2 px-4  ${
            value === 3
              ? "inline-block p-4 text-black border-b-2 border-black rounded-t-lg active dark:text-purple-400 dark:border-purple-400"
              : "text-gray-500 dark:text-gray-200 border-gray-300"
          }`}
          onClick={() => changeValue(3)}
        >
          Team 
        </button>
      </div>
    </div>
  );
};
