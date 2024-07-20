import React from "react";
import Card from "./index";

const OrganizationInfoCard = ({ extra, currentOrganization}) => {

    console.log(currentOrganization)
  return (
    <Card extra={`p-4 ${extra}`}>
      <div className="w-full">
        <div className="p-4 border-b">
          <h2 className="text-2xl">
            Organization Overview
          </h2>
          <p className="text-sm text-gray-500">
            Details and description of the organization.
          </p>
        </div>
        <div>
        <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
            <p className="text-gray-600 dark:text-white">
              About
            </p>
            <p className="break-words">
              {currentOrganization?.organizationDescription}
            </p>
          </div>
          <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
            <p className="text-gray-600 dark:text-white">
              Type
            </p>
            <p>
              {currentOrganization?.organizationType}
            </p>
          </div>
          <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
            <p className="text-gray-600 dark:text-white">
              Address
            </p>
            <p className="break-words">
            {currentOrganization?.address}
            </p>
          </div>
          <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
            <p className="text-gray-600 dark:text-white">
              Website
            </p>
            <a className="break-words hover:text-green-500" href={currentOrganization?.websiteURL}>
            {currentOrganization?.websiteURL}
            </a>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OrganizationInfoCard;
