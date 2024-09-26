import React from "react";
import IndividualIcon from "../../../Components/icons/IndividualIcon";
import TeamsIcon from "../../../Components/icons/TeamIcon";
import SearchIcon from "../../../Components/icons/SearchIcon";


const ChallengeTab = ({ changeValue, value,setContestQuery }) => {
  return (
    <div>
    <div className="flex flex-col items-center sm:flex-row sm:items-center rounded-full text-zinc-700 dark:bg-zinc-900 dark:text-white">
      <div className="relative w-full">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <div className="pointer-events-none">
            <SearchIcon />
          </div>
        </div>
        
          <input
            type="text"
            className="border border-gray-200 rounded-full border-gray-300 block w-full pl-10 p-2.5 dark:bg-zinc-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white hover:border-green-500"
            placeholder="Search for challenges..."
            onChange={(e) => setContestQuery(e.currentTarget.value)}
            />      
        <div className="flex absolute inset-y-0 right-0 items-center pr-0  bg-zinc-200 rounded-full">
          <button
            className={`flex items-center rounded-full dark:text-black transition-colors duration-300 ease-in focus:outline-none hover:text-indigo-500 focus:text-indigo-500 px-4 py-2 ${
              value === 0 ? "bg-white shadow" : ""
            }`}
            onClick={() => changeValue(0)}
            >
            <div className="flex gap-2">
            <IndividualIcon />
            <span className="hidden sm:inline">Individuals</span>
            </div>
          </button>
          <button
            className={`flex items-center rounded-full dark:text-black transition-colors duration-300 ease-in focus:outline-none hover:text-indigo-500 focus:text-indigo-500 px-4 py-2 ${
              value === 1 ? "bg-white shadow" : ""
            }`}
            onClick={() => changeValue(1)}
          >
            <div className="flex gap-2">
              <TeamsIcon />
              <span className="hidden sm:inline">Teams</span>
            </div>
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ChallengeTab;
