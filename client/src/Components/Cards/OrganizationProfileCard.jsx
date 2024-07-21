import React from "react";
import Card from "./index";

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
        <div className="text-white pt-11 space-y-1">
          <h3 className="font-bold text-2xl">{currentOrganization?.organizationName}</h3>
          <div className="flex gap-4">
            <div className="text-md">{currentOrganization?.country} ,</div>
            <a className="text-md hover:text-green-500" href={currentOrganization?.websiteURL}>{currentOrganization?.websiteURL}</a>
          </div>
        </div>
    </div>
  </div>   
  );
};

export default OrganizationProfileCard;