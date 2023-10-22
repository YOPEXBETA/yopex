import React from "react";
import BrowseNavigationTab from "../Content/BrowseNavigationTabs/BrowseNavigationTab";

const BrowseContestsHeader = ({ changeValue, value, setContestQuery }) => {
  return (
    <div className="h-48 px-6 lg:px-8 xl:px-40 flex flex-col justify-end dark:bg-zinc-900 border-b bg-black ">
      <div className="space-y-2 items-start">
        <h1 className="text-white text-2xl font-bold">Browse Contests</h1>

        <input
          type="text"
          placeholder="Search for Contests"
          className="w-full py-2 px-3 outline-none rounded border border-white  text-white dark:bg-zinc-700 bg-black hover:border-green-500"
          onChange={(e) => setContestQuery(e.currentTarget.value)}
        />
        <BrowseNavigationTab changeValue={changeValue} value={value} />
      </div>
    </div>
  );
};

export default BrowseContestsHeader;
