import React from "react";
import Card from "./index";

const GeneralCompanyInfo = ({ company }) => {
  return (
    <Card extra={"w-full p-3"}>
      {/* Header */}
      <div className="mt-2 mb-8 w-full">
        <h4 className="px-2 text-lg font-bold dark:text-white">Overview</h4>
        <p className="mt-2 px-2 text-base dark:text-white">
          {company?.companyDescription}
        </p>
      </div>
      {/* Cards */}
      <div className="grid grid-cols-1 gap-4 px-2 sm:grid-cols-2">
        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-zinc-700 dark:shadow-none">
          <p className="text-base font-bold dark:text-white">Address</p>
          <p className="text-base font-medium text-gray-700 dark:text-white">
            {company?.address}
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-zinc-700 dark:shadow-none">
          <p className="text-base font-bold dark:text-white">Country</p>
          <p className="text-base font-medium text-gray-700 dark:text-white">
            {company?.country}
          </p>
        </div>

        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-zinc-700 dark:shadow-none">
          <p className="text-base font-bold dark:text-white">Website</p>
          <a
            className="text-base font-medium text-gray-700 dark:text-white hover:text-indigo-500 dark:hover:text-indigo-500"
            href={company?.websiteURL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {company?.websiteURL}
          </a>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-zinc-700 dark:shadow-none">
          <p className="text-base font-bold dark:text-white">Phone Number</p>
          <p className="text-base font-medium text-gray-700 dark:text-white hover:text-indigo-500">
            {company?.PhoneNumber || "N/A"}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default GeneralCompanyInfo;
