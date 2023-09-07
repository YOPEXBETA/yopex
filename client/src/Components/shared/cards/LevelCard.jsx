import React from "react";
import LevelMenuIcon from "../../../Pages/AdminDashboard/LevelPage/LevelMenuIcon";

const LevelCard = ({ badgeData }) => {
  return (
    <div className="border-[1px] rounded-lg border-gray-300 shadow-md p-4 transform hover:scale-105 transition duration-300 relative">
      <div className="flex justify-between absolute top-2 right-2">
        <LevelMenuIcon level={badgeData} />
      </div>
      <div className="flex flex-col items-center space-y-2 mt-5 relative">
        <div className="flex justify-between items-center flex-col">
          <div className="border-4 border-green-500 bg-green-700  text-green-500 rounded-full p-3 w-24 h-24 flex items-center justify-center">
            <h5 className="text-4xl text-white  font-semibold truncate">
              {badgeData.name.match(/\d+/)}{" "}
            </h5>
          </div>
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-md font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200 my-8">
                {badgeData.minScore} XP - {badgeData.maxScore} XP
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 opacity-40 rounded-lg z-0"></div>

      <div className="absolute bottom-0 left-0 right-0 h-4 bg-green-500 rounded-b-lg"></div>
    </div>
  );
};

export default LevelCard;
