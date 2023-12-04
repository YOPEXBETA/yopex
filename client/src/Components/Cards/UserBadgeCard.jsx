import React from "react";
import Card from "./index";

const UserBadgeCard = ({ badge, extra }) => {
  return (
    <Card extra={`p-3 ${extra}`}>
      <div className="flex w-full items-center justify-between">
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
    </Card>
  );
};

export default UserBadgeCard;
