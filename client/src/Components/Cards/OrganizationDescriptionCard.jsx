import React from "react";
import Card from "./index";

const OrganizationDescriptionCard = ({ extra, currentOrganization}) => {

  return (

    <Card extra={`p-4 ${extra} `}>
        {/* Header */}
      <div className="mt-2 mb-8 w-full">
        <h4 className="px-2 text-lg font-bold dark:text-white">Organization Overview</h4>
        <p className="mt-2 px-2 text-base dark:text-white">
        {currentOrganization?.organizationDescription}
        </p>
      </div>
      {/* Cards */}
      <div className="grid grid-cols-1 gap-4 px-2 sm:grid-cols-2">
        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 border-[1px] dark:!bg-zinc-700 dark:shadow-none">
          <p className="text-base font-bold dark:text-white">Address</p>
          <p className="text-base font-medium text-gray-700 dark:text-white">
          {currentOrganization?.address}
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 border-[1px]  dark:!bg-zinc-700 dark:shadow-none">
          <p className="text-base font-bold dark:text-white">Country</p>
          <p className="text-base font-medium text-gray-700 dark:text-white">
            {currentOrganization?.country}
          </p>
        </div>

        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 border-[1px] dark:!bg-zinc-700 dark:shadow-none">
          <p className="text-base font-bold dark:text-white">Website</p>
          <a
            className="text-base font-medium text-gray-700 dark:text-white hover:text-indigo-500 dark:hover:text-indigo-500"
            href={currentOrganization?.websiteURL}

            target="_blank"
            rel="noopener noreferrer"
          >
            {currentOrganization?.websiteURL}
            </a>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 dark:!bg-zinc-700 border-[1px] dark:shadow-none">
          <p className="text-base font-bold dark:text-white">Organization Type</p>
          <p className="text-base font-medium text-gray-700 dark:text-white hover:text-indigo-500">
          {currentOrganization?.organizationType}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default OrganizationDescriptionCard;
