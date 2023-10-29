import React from "react";
import { Link } from "react-router-dom";

const FollowingsCompaniesCard = ({ following }) => {
  return (
    <div className="divide-gray-100 p-4 bg-white dark:bg-zinc-700 shadow-md dark:divide-gray-700 overflow-hidden rounded-lg text-gray-600 dark:border-gray-700 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4">
      <Link
        to={`/company/${following._id}`}
        key={following._id}
        style={{ textDecoration: "none" }}
        className="flex justify-center"
      >
        <div>
          <img
            alt="yourphoto"
            src={following.companyLogo}
            className="w-28 h-28 rounded-full items-center mx-auto"
          />

          <div className="flex items-center mt-2 ">
            <p className="text-lg font-md ml-5 dark:text-gray-200">
              {following.companyName}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FollowingsCompaniesCard;
