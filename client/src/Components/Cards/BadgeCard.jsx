import React from "react";
import Card from "./index";
import { useDeleteBadge } from "../../hooks/react-query/useBadges";

const BadgeCard = ({ badgeData, extra }) => {
  const { mutate } = useDeleteBadge();

  return (
    <Card extra={`p-4 ${extra}`}>
      <div
        className="flex justify-between absolute top-2 right-2"
        key={badgeData._id}
      >
        {/*<LevelMenuIcon level={badgeData} />*/}
      </div>
      <div className="flex flex-col items-center space-y-2 mt-5 relative">
        <div className="flex justify-between items-center flex-col">
          <img
            src={badgeData.badgeImg}
            alt={badgeData.badgeName}
            className="w-28 h-28 rounded-full border-4 border-green-500 bg-white p-1"
          />

          <div className="flex mb-2 items-center justify-between">
            <div className="flex flex-col mb-2 items-center justify-between">
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200 mt-4 mb-4">
                {badgeData.badgeName}
              </span>
              <p className="text-md">{badgeData.badgeDescription}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 opacity-40 rounded-lg z-0"></div>

      <div className="absolute bottom-0 left-0 right-0 h-4 bg-green-500 rounded-b-lg"></div>
      <button
        onClick={() => mutate(badgeData._id)}
        className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full hover:bg-red-700 transition duration-300"
      >
        Delete
      </button>
    </Card>
  );
};

export default BadgeCard;
