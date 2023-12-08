import React from "react";
import Card from "./index";

const UserInfoCard = ({ userProfile, extra }) => {
  return (
    <Card extra={`w-full h-full p-6 ${extra}`}>
      {/* Header */}
      <div className="mt-2 mb-8 w-full">
        <h4 className="px-2 text-xl font-bold text-zinc-700 dark:text-white">
          General Information
        </h4>
        <p className="mt-2 px-2 text-base text-gray-600">
          {userProfile?.userDescription}
        </p>
      </div>
      {/* Cards */}
      <div className="grid grid-cols-2 gap-4 px-2">
        <div className="flex flex-col items-start justify-center rounded-2xl  bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-zinc-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Education</p>
          <p className="text-base font-medium text-zinc-700 dark:text-white">
            Stanford University
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl  bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-zinc-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Languages</p>
          <p className="text-base font-medium text-zinc-700 dark:text-white">
            English, Spanish, Italian
          </p>
        </div>

        <div className="flex flex-col items-start justify-center rounded-2xl  bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-zinc-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Email</p>
          <p className="text-base font-medium text-zinc-700 dark:text-white">
            {userProfile?.email}
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl  bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-zinc-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Work History</p>
          <p className="text-base font-medium text-zinc-700 dark:text-white">
            English, Spanish, Italian
          </p>
        </div>

        <div className="flex flex-col items-start justify-center rounded-2xl  bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-zinc-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Website</p>
          <p className="text-base font-medium text-zinc-700 dark:text-white">
            {userProfile?.websiteURL}
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl  bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-zinc-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Birthday</p>
          <p className="text-base font-medium text-zinc-700 dark:text-white">
            20 July 1986
          </p>
        </div>
      </div>
    </Card>
  );
};

export default UserInfoCard;
