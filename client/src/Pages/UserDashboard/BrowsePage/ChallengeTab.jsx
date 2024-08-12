import React from "react";
import IndividualIcon from "../../../Components/icons/IndividualIcon";
import TeamsIcon from "../../../Components/icons/TeamIcon";


const ChallengeTab = ({ changeValue, value }) => {
  return (
      <div className="flex flex-col items-center sm:flex-row sm:items-center rounded-full text-gray-700 dark:bg-zinc-900 dark:text-white">
        <div className="flex flex-wrap gap-2">
          <button
              className={`flex items-center rounded-full transition-colors duration-300 ease-in focus:outline-none hover:text-indigo-500 focus:text-indigo-500 px-4 py-2 ${
                  value === 0 ? "bg-white shadow dark:bg-zinc-700 dark:text-white" : ""
              }`}
              onClick={() => changeValue(0)}
          >
            <div className="flex gap-2">
              <IndividualIcon />
              <span className="hidden sm:inline">Individuals</span>
            </div>
          </button>
          <button
              className={`flex items-center rounded-full transition-colors duration-300 ease-in focus:outline-none hover:text-indigo-500 focus:text-indigo-500 px-4 py-2 ${
                  value === 1 ? "bg-white shadow dark:bg-zinc-700 dark:text-white" : ""
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
  );
};

export default ChallengeTab;
