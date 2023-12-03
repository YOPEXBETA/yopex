import React from "react";
import { Link } from "react-router-dom";
import businessMan from "../../../../assets/images/businessMan.jpg";

const JobOfferHeader = ({ selectedOption, handleCardClick, userProfile }) => {
  return (
    <div className="flex flex-col md:flex-row items-center bg-white lg:px-40 md:px-20 border md:h-72 py-8 overflow-hidden justify-between relative">
      <div className="text-center mb-4 md:mb-0 md:mr-4">
        <h4 className="mb-4 text-xl font-bold dark:text-white md:text-3xl text-center md:text-left">
          Create a Job Offer
        </h4>
        {userProfile?.companies.length > 0 ? (
          <p className="text-lg dark:text-white text-center md:text-left">
            Select a company and start creating your job offer
          </p>
        ) : (
          <div className="flex flex-col gap-4 md:items-start items-center ">
            <p className="text-lg dark:text-white text-center md:text-left">
              You don't have a company. Please create a company to create a job
              offer offer.
            </p>
            <Link
              to="/create-company"
              className="inline-block w-44 rounded-lg border-2 px-4 pb-[6px] pt-2"
            >
              Create a company
            </Link>
          </div>
        )}
      </div>
      <div className="flex flex-col md:flex-row gap-4 items-center">
        {userProfile?.companies.length > 0 ? (
          userProfile.companies.map((option, index) => (
            <div
              key={option._id}
              className={`border-2 p-2 rounded-lg mb-2 cursor-pointer relative ${
                selectedOption === option._id
                  ? "border-green-500"
                  : "border-gray-300 "
              }`}
              onClick={() => handleCardClick(option._id)}
            >
              <img
                src={option.companyLogo}
                alt={option.companyName}
                className={`w-32 h-32 object-cover border rounded-lg transition-transform transform hover:scale-110 `}
              />
              {selectedOption === option._id && (
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 12"
                    width="24"
                    height="12"
                    className="text-green-500"
                  >
                    <path d="M0 0l12 12 12-12z" fill="currentColor" />
                  </svg>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center">
            <img
              src={businessMan}
              alt="No companies to select"
              className="w-64 h-64 hidden md:block"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default JobOfferHeader;
