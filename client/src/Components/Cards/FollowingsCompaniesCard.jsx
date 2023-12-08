import React from "react";
import Card from "./index";
import { Link } from "react-router-dom";

const FollowingsCompaniesCard = ({ following, extra }) => {
  return (
    <Card extra={`p-4 ${extra}`}>
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
            className="w-28 h-28 rounded-full object-cover items-center mx-auto"
          />

          <div className="flex items-center mt-2 ">
            <p className="text-lg font-md ml-5 dark:text-gray-200">
              {following.companyName}
            </p>
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default FollowingsCompaniesCard;
