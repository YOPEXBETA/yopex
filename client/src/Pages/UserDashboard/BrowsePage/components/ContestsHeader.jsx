import React from "react";
import SearchIcon from "../../../../Components/icons/SearchIcon";

const ContestsHeader = ({ setContestQuery }) => {
  return (
    <div>
      <div className="space-y-2 items-start mx-auto container">
        <div className="relative w-full">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Search for Challenges"
            className="bg-lightPrimary border rounded-full border-gray-300 block w-full pl-10 p-2.5 dark:bg-zinc-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white hover:border-green-500"
            onChange={(e) => setContestQuery(e.currentTarget.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ContestsHeader;
