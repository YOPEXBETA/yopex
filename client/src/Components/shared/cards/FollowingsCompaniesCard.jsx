import React from "react";
import { Link } from "react-router-dom";

const FollowingsCompaniesCard = ({ following }) => {
  return (
    <div className="shadow-md border-green-500 border-b-2 rounded-lg dark:shadow-sm dark:shadow-green-600 p-4 flex items-center justify-center">
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
            <p className="text-lg font-md ml-5 dark:text-gray-200">{following.companyName}</p>

          </div>
        </div>
      </Link>
    </div>
  );
};

export default FollowingsCompaniesCard;