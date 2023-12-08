import React from "react";
import Card from "./index";
import { Link } from "react-router-dom";

const FollowingsCard = ({ following, extra }) => {
  return (
    <Card extra={`p-4 ${extra}`}>
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
            className="w-28 h-28 rounded-full dark:border-2 items-center mx-auto object-cover border-2"
          />

          <div className="flex items-center mt-2 gap-1">
            <p className="text-lg font-md dark:text-gray-200">
              {following?.firstname}
            </p>
            <p className="text-lg font-md dark:text-gray-200">
              {following?.lastname}
            </p>
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default FollowingsCard;
