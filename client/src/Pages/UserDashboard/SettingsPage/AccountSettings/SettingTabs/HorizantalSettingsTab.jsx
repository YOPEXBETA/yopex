import React from "react";

const HorizantalSettingsTab = ({ changeValue, value }) => {
  return (
    <div className="flex  mt-8 dark:bg-zinc-800">
      <button
        className={`flex-1 px-4 focus:outline-none ${
          value === 0
            ? "text-green-500 py-4"
            : "text-gray-500 dark:text-gray-200 border-r dark:border-zinc-600 py-4"
        }`}
        onClick={() => changeValue(0)} // Pass 0 to changeValue for the first tab
      >
        General
      </button>
      <button
        className={`flex-1  px-4 focus:outline-none ${
          value === 1
            ? "text-green-500 py-4"
            : "text-gray-500 dark:text-gray-200 border-r dark:border-zinc-600 py-4"
        }`}
        onClick={() => changeValue(1)} // Pass 1 to changeValue for the second tab
      >
        Settings
      </button>

      <button
        className={`flex-1  px-4 focus:outline-none ${
          value === 2 ? "text-green-500" : "text-gray-500 dark:text-gray-200"
        }`}
        onClick={() => changeValue(2)} // Pass 2 to changeValue for the third tab
      >
        Billing
      </button>
      <button
        className={`flex-1  px-4 focus:outline-none ${
          value === 3
            ? "text-green-500 py-4"
            : "text-gray-500 dark:text-gray-200 border-r dark:border-zinc-600 py-4"
        }`}
        onClick={() => changeValue(3)} // Pass 3 to changeValue for the third tab
      >
        More Information
      </button>
    </div>
  );
};

export default HorizantalSettingsTab;
