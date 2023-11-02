import React from "react";

const UserBadgeCard = ({ badge }) => {
  return (
    <div>
      <div className="flex w-full items-center justify-between rounded-lg bg-white p-3 shadow-md shadow-shadow-500 dark:bg-zinc-700 hover:shadow-xl dark:shadow-none">
        <div className="flex items-center">
          <div className="">
            <img
              className="h-20 w-20 rounded-lg object-cover"
              src={badge.badgeImg}
              alt="badge"
            />
          </div>
          <div className="ml-4">
            <p className="text-md font-medium text-navy-700 dark:text-white">
              {badge.badgeName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBadgeCard;
