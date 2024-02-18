import React from "react";
import Card from "./index";
import { format } from "date-fns";

const UserInfoCard = ({ userProfile, extra }) => {
  const isValidDate = (date) => {
    return date instanceof Date && !isNaN(date);
  };
  return (
    <Card extra={`w-full h-full p-6 ${extra}`}>
      {/* Header */}
      <div className="mt-2 mb-8 w-full">
        <h4 className="px-2 text-xl font-bold text-zinc-700 dark:text-white">
          General Information
        </h4>
        <p className="mt-2 px-2 text-base dark:text-white">
          {userProfile?.userDescription || "N/A"}
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2">
        <div className="flex flex-col items-start justify-center rounded-2xl bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-zinc-700 dark:shadow-none">
          <p className="text-base font-bold dark:text-white">Country</p>
          <p className="text-base font-medium text-zinc-700 dark:text-white">
            {userProfile?.country || "N/A"}
          </p>
        </div>

        <div className="flex flex-col items-start justify-center rounded-2xl bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-zinc-700 dark:shadow-none">
          <p className="text-base font-bold dark:text-white">Email</p>
          <p className="text-base font-medium text-zinc-700 dark:text-white">
            {userProfile?.email}
          </p>
        </div>

        <div className="flex flex-col items-start justify-center rounded-2xl bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-zinc-700 dark:shadow-none">
          <p className="text-base font-bold dark:text-white">Website</p>
          <p className="text-base font-medium text-zinc-700 dark:text-white">
            {userProfile?.websiteURL || "N/A"}
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-zinc-700 dark:shadow-none">
          <p className="text-base font-bold dark:text-white">BirthDate </p>
          <p className="text-base font-medium text-zinc-700 dark:text-white">
            {isValidDate(userProfile?.birthDate)
              ? format(new Date(userProfile?.birthDate), "dd MMMM yyyy")
              : "N/A"}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default UserInfoCard;
