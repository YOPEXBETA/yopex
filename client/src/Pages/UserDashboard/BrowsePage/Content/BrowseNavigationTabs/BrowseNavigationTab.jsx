import React from "react";

const BrowseNavigationTab = ({ value, changeValue }) => {
  return (
    <div className="flex space-x-4">
      <button
        className={`py-2 px-4 border-b-2 ${
          value === 0
            ? "border-green-500 text-green-500"
            : "text-zinc-500 border-zinc-500"
        }`}
        onClick={() => changeValue(0)}
      >
        Contests
      </button>
      <button
        className={`py-2 px-4 border-b-2 ${
          value === 1
            ? "border-green-500 text-green-500"
            : "text-zinc-500 border-gray-500"
        }`}
        onClick={() => changeValue(1)}
      >
        Jobs
      </button>
    </div>
  );
};

export default BrowseNavigationTab;
