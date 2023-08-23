import React from "react";
import BrowseNavigationTab from "../Content/BrowseNavigationTabs/BrowseNavigationTab";

const BrowseJobsHeader = ({ changeValue, value, setJobQuery }) => {
  return (
    <div className="h-48 px-6 lg:px-8 xl:px-40 flex flex-col justify-end bg-black ">
      <div className="space-y-2 items-start">
        <h1 className="text-white text-2xl font-bold">Browse Jobs</h1>

        <input
          type="text"
          placeholder="Search for Jobs"
          className="w-full py-2 px-3 outline-none rounded border border-white text-white bg-black hover:border-green-500"
          onChange={(e) => setJobQuery(e.target.value)}
        />

        <BrowseNavigationTab value={value} changeValue={changeValue} />
      </div>
    </div>
  );
};

export default BrowseJobsHeader;
