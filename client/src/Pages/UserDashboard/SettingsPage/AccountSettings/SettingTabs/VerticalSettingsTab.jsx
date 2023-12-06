import React from "react";

const VerticalSettingsTab = ({ changeValue, value }) => {
  return (
    <div className="flex  md:h-max flex-col mt-8 dark:bg-zinc-800 rounded-2xl">
      <button
        className={`w-52 text-left py-3 px-4 focus:outline-none ${
          value === 0
            ? "bg-green-200 text-green-500 border border-green-500 rounded-lg"
            : "text-gray-500 dark:text-green-500  dark:border-zinc-600"
        }`}
        onClick={() => changeValue(0)}
      >
        General Information
      </button>
      <button
        className={`w-52 text-left py-3 px-4 focus:outline-none ${
          value === 1
            ? "bg-green-200 text-green-500 border border-green-500 rounded-lg"
            : "text-gray-500 dark:text-green-500  dark:border-zinc-600 "
        }`}
        onClick={() => changeValue(1)}
      >
        Settings
      </button>
      <button
        className={`w-52 text-left py-3 px-4 focus:outline-none ${
          value === 3
            ? "bg-green-200 text-green-500 border border-green-500 rounded-lg"
            : "text-gray-500 dark:text-green-500  dark:border-zinc-600"
        }`}
        onClick={() => changeValue(3)} // Pass 3 to changeValue for the third tab
      >
        Experience & Education
      </button>
      <button
        className={`w-52 text-left py-3 px-4 focus:outline-none ${
          value === 2
            ? "bg-green-200 text-green-500 border border-green-500 rounded-lg"
            : "text-gray-500 dark:text-green-500  dark:border-zinc-600 "
        }`}
        onClick={() => changeValue(2)}
      >
        Billing
      </button>
    </div>
  );
};

export default VerticalSettingsTab;
