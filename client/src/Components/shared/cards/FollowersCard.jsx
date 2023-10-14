import React from "react";
import { Link } from "react-router-dom";

const FollowersCard = ({ follower }) => {
  return (
    <div className="shadow-md border-green-500 border-b-2 bg-white dark:bg-zinc-800 dark:shadow-sm dark:shadow-green-600 rounded-lg p-4 flex items-center justify-center">
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
            className="w-28 h-28 rounded-full items-center dark:border-0 mx-auto object-cover  border-2"
          />

          <div className="flex items-center mt-2 gap-1">
            <p className="text-lg font-md dark:text-gray-200">{follower.firstname}</p>
            <p className="text-lg font-md dark:text-gray-200">{follower.lastname}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FollowersCard;
