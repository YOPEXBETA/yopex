import React from "react";
import LevelMenuIcon from "../../../Pages/AdminDashboard/LevelPage/LevelMenuIcon";

const LevelCard = ({ badgeData }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 border-2 border-green-400">
      <div className="flex justify-between absolute top-2 right-2">
        <LevelMenuIcon level={badgeData} />
      </div>
      <div className="flex flex-col items-center space-y-2 mt-5">
        <div className="flex justify-between items-center flex-col">
          <h5 className="text-green-500 text-lg font-semibold truncate">
            {badgeData.name}
          </h5>
          <p className="text-gray-500 text-sm mt-4">
            <p>
              {badgeData.minScore} - {badgeData.maxScore}
            </p>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LevelCard;
