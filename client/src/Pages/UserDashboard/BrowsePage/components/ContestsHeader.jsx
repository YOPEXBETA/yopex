import React from "react";

const ContestsHeader = ({ setContestQuery }) => {
  return (
    <div>
      <div className="space-y-2 items-start mx-auto container">
        <input
          type="text"
          placeholder="Search for Contests"
          className="py-3 px-3 outline-none border-2 bg-lightPrimary dark:bg-zinc-800 dark:text-white rounded-full  hover:border-green-500 w-full"
          onChange={(e) => setContestQuery(e.currentTarget.value)}
        />
      </div>
    </div>
  );
};

export default ContestsHeader;
