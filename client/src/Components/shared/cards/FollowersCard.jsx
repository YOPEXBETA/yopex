import React from "react";
import { Link } from "react-router-dom";

const FollowersCard = ({ follower }) => {
  return (
    <div className="shadow-md border-green-500 border-b-2 rounded-lg p-4 flex items-center justify-center">
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
            className="w-28 h-28 rounded-full items-center mx-auto"
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
