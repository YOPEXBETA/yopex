import React from "react";
import { Link } from "react-router-dom";

const FollowersCard = ({ follower }) => {
  return (
    <div className="divide-gray-100 dark:divide-gray-700 overflow-hidden rounded-2xl border border-gray-300 text-gray-600 dark:border-gray-700 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4">
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
            className="w-28 h-28 rounded-full items-center mx-auto object-cover  border-2"
          />

          <div className="flex items-center mt-2 gap-1">
            <p className="text-lg font-md">{follower.firstname}</p>
            <p className="text-lg font-md">{follower.lastname}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FollowersCard;
