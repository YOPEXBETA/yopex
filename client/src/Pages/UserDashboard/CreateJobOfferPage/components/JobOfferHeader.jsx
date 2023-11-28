import React from "react";

const JobOfferHeader = ({ selectedOption, handleCardClick, userProfile }) => {
  return (
    <div className="flex md:items-center bg-gradient-to-b from-black to-purple-800 md:px-32 bg-cover bg-black md:h-72 py-8 overflow-hidden justify-between relative">
      <div className="text-center">
        <h4 className="mb-4 text-xl font-bold text-white md:text-3xl text-left">
          Create a Job Offer
        </h4>
        <p className="text-lg text-white text-center">
          Select a company and start building your dream team or find the
          perfect candidate.
        </p>
      </div>
      <div className="flex gap-4 items-center">
        {userProfile?.companies.map((option, index) => (
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
        ))}
      </div>
    </div>
  );
};

export default JobOfferHeader;
