import React from "react";
import { Link } from "react-router-dom";

const FollowingsCard = ({ following }) => {
  return (
    <div className="shadow-md border-green-500 border-b-2 rounded-lg p-4 dark:bg-zinc-800 dark:shadow-sm dark:shadow-green-600 bg-white flex items-center justify-center">
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
            className="w-28 h-28 rounded-full dark:border-0 items-center mx-auto object-cover border-2"
          />

          <div className="flex items-center mt-2 gap-1">
            <p className="text-lg font-md dark:text-gray-200">{following?.firstname}</p>
            <p className="text-lg font-md dark:text-gray-200">{following?.lastname}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FollowingsCard;
