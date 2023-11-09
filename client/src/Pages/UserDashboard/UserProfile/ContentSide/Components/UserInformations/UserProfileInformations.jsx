import React from "react";
import { useParams } from "react-router-dom";

import { useUserById } from "../../../../../../hooks/react-query/useUsers";
import LoadingSpinner from "../../../../../../Components/LoadingSpinner";

const UserProfileInformations = () => {
  const { userId } = useParams();
  const { data: userProfile, isLoading } = useUserById(userId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div>
      <div className="p-4 divide-gray-100 dark:bg-zinc-800 dark:border-zinc-500 dark:border dark:divide-gray-700 overflow-hidden rounded-lg shadow-md bg-white text-gray-600 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4">
        <div className="mt-2 mb-8 w-full">
          <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
            General Information
          </h4>
          <p className="mt-2 px-2 text-base  dark:text-white">
            {userProfile.userDescription || "No description"}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2 w-full">
          <div className="flex flex-col items-start justify-center rounded-3xl bg-white dark:bg-zinc-700 bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600 dark:text-white">Email</p>
            <p className="text-base text-navy-700 dark:text-white font-semibold hover:text-green-500">
              <a href={`mailto:${userProfile?.email}`}>{userProfile?.email}</a>
            </p>
          </div>
          {userProfile?.phoneNumber?.length !== 0 && (
            <div className="flex flex-col items-start justify-center rounded-3xl bg-white dark:bg-zinc-700 bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600 dark:text-white">Phone</p>
              <p className="text-base text-navy-700 dark:text-white font-semibold">
                <a href={`tel:${userProfile?.phoneNumber}`}>
                  {userProfile?.phoneNumber}
                </a>
              </p>
            </div>
          )}
          {userProfile?.websiteURL && (
            <div className="flex flex-col items-start justify-center rounded-3xl bg-white dark:bg-zinc-700 bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600 dark:text-white">
                Website URL
              </p>

              <a
                href={userProfile?.websiteURL || "N/A"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-start gap-2 text-green-500 hover:underline"
              >
                {userProfile?.websiteURL || "N/A"}
              </a>
            </div>
          )}

          {userProfile?.gender?.length !== 0 && (
            <div className="flex flex-col items-start justify-center rounded-3xl bg-white dark:bg-zinc-700  bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600 dark:text-white">Gender</p>
              <p className="text-base text-navy-700 dark:text-white font-semibold">
                {userProfile?.gender || "N/A"}
              </p>
            </div>
          )}

          <div className="flex flex-col items-start justify-center rounded-3xl bg-white dark:bg-zinc-700  bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600 dark:text-white">Country</p>
            <p className="text-base text-navy-700 dark:text-white font-semibold">
              {userProfile?.country || "N/A"}
            </p>
          </div>

          <div className="flex flex-col items-start justify-center rounded-3xl bg-white dark:bg-zinc-700 bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600 dark:text-white">Birthday</p>
            <p className="text-base text-navy-700 dark:text-white font-semibold">
              {userProfile?.birthDate
                ? new Date(userProfile?.birthDate).toLocaleDateString()
                : "N/A"}{" "}
            </p>
          </div>
        </div>
        <div className="mt-2 mb-8 w-full">
          <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
            Skills
          </h4>

          <div className="mt-4 px-2 text-base">
            <div className="flex flex-wrap gap-2">
              {userProfile?.skills?.length > 0 ? (
                userProfile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-green-200 text-green-700 rounded-full text-sm"
                  >
                    {skill?.value}
                  </span>
                ))
              ) : (
                <p className="text-base  dark:text-white">No skill selected</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileInformations;
