import React from "react";
import Card from "./index";
import LocationIcon from "../icons/LocationIcon";
import WebIcon from "../icons/WebIcon";
import { FaCheckCircle } from "react-icons/fa";

const OrganizationProfileCard = ({ extra, currentOrganization }) => {
  return (
      <div className="relative  w-full h-48 bg-white rounded-lg shadow-lg overflow-hidde mb-16">
        <div className="absolute inset-0 rounded-lg overflow-hidden bg-red-200">
          <img src={currentOrganization?.organizationBanner} alt={currentOrganization?.organizationName} className="w-full object-cover"/>
          <div className="absolute inset-0 backdrop backdrop-blur-10 bg-gradient-to-b from-transparent to-black w-full">
          </div>
        </div>
      <div className="absolute flex space-x-6 transform translate-x-6 translate-y-20">
        <div className="w-36 h-36 rounded-lg border-4 border-white shadow-lg overflow-hidden">
          <img src={currentOrganization?.organizationLogo} alt={currentOrganization?.organizationName}/>
        </div>
        <div className="text-white pt-16 space-y-1">
        <div className="flex items-center gap-2">
                    <p className="text-2xl font-semibold dark:text-gray-200">
                      {currentOrganization?.organizationName}
                    </p>

                    <button
                        className="flex items-center gap-1"
                        aria-label="verification badge"
                        disabled={!currentOrganization?.verified}
                    >
                      <FaCheckCircle
                          className={`text-${currentOrganization?.verified ? "green" : "gray"}-500 w-4 h-4 sm:w-5 sm:h-5 mb-[0.1rem] ${
                              !currentOrganization?.verified ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                      />
                    </button>
                  </div>          
        </div>
    </div>
  </div>   
  );
};

export default OrganizationProfileCard;