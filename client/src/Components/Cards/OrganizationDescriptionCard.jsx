import React from "react";
import Card from "./index";

const OrganizationDescriptionCard = ({ extra, currentOrganization}) => {

  return (
    <Card extra={`p-4 ${extra}`}>

<div className="break-inside relative overflow-hidden flex flex-col justify-between space-y-3 text-sm rounded-xl p-4 mb-4  text-black dark:text-white">

<div className="flex justify-between items-center mb-4">
  <h3 className="text-xl font-bold leading-none dark:text-white">
  Organization Overview
  </h3>
</div>
          <div className="flow-root">

        <div className="md:grid md:grid-cols-2 hover:bg-gray-50 dark:hover:bg-zinc-800 md:space-y-0 space-y-1 py-4 border-b">
            <p className="font-bold dark:text-white text-md">
              About
            </p>
            <p className="break-words dark:text-white">
              {currentOrganization?.organizationDescription}
            </p>
          </div>
          <div className="md:grid md:grid-cols-2 hover:bg-gray-50 dark:hover:bg-zinc-800 md:space-y-0 space-y-1 py-4 border-b">
          <p className="font-bold dark:text-white">
              Type
            </p>
            <p className="break-words dark:text-white">
              {currentOrganization?.organizationType}
            </p>
          </div>
          <div className="md:grid md:grid-cols-2 hover:bg-gray-50 dark:hover:bg-zinc-800 md:space-y-0 space-y-1 py-4 border-b">
          <p className="font-bold dark:text-white">
              Address
            </p>
            <p className="break-words dark:text-white">
            {currentOrganization?.address}
            </p>
          </div>
          <div className="md:grid md:grid-cols-2 hover:bg-gray-50 dark:hover:bg-zinc-800 md:space-y-0 space-y-1 py-4 border-b">
          <p className="font-bold dark:text-white dark:text-white">
              Website
            </p>
            <a className="break-words hover:text-green-500 dark:text-white" href={currentOrganization?.websiteURL}>
            {currentOrganization?.websiteURL}
            </a>
          </div>
          </div>
        </div>
      </Card>
  );
};

export default OrganizationDescriptionCard;
