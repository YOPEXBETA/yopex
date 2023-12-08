import React from "react";
import Card from "./index";
import { Link } from "react-router-dom";

const FollowersCard = ({ follower, extra }) => {
  return (
    <Card extra={`p-4 ${extra}`}>
      <div className="sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4">
        <Link
          to={`/profile/${follower._id}`}
          key={follower._id}
          style={{ textDecoration: "none" }}
          className="flex justify-center"
        >
          <div>
            <img
              alt="yourphoto"
              src={follower.picturePath}
              className="w-28 h-28 rounded-full items-center dark:border-2 mx-auto object-cover  border-2"
            />

            <div className="flex items-center mt-2 gap-1">
              <p className="text-lg font-md dark:text-gray-200">
                {follower.firstname}
              </p>
              <p className="text-lg font-md dark:text-gray-200">
                {follower.lastname}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </Card>
  );
};

export default FollowersCard;
