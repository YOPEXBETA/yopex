import React from "react";
import { Link } from "react-router-dom";

const FollowingsCard = ({ following }) => {
  return (
    <div className="p-4 divide-gray-100 dark:divide-gray-700 overflow-hidden rounded-2xl border border-gray-300 text-gray-600 dark:border-gray-700 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4">
      <Link
        to={`/profile/${following?._id}`}
        key={following?._id}
        style={{ textDecoration: "none" }}
        className="flex justify-center"
      >
        <div>
          <img
            alt="yourphoto"
            src={following?.picturePath}
            className="w-28 h-28 rounded-full items-center mx-auto object-cover border-2"
          />

          <div className="flex items-center mt-2 gap-1">
            <p className="text-lg font-md">{following?.firstname}</p>
            <p className="text-lg font-md">{following?.lastname}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FollowingsCard;
