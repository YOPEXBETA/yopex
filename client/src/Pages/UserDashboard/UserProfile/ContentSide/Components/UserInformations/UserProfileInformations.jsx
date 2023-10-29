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
    <div className="p-4 divide-gray-100 dark:divide-gray-700 overflow-hidden rounded-lg shadow-md bg-white text-gray-600 dark:border-gray-700 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4">
      <div className="space-y-4">
        {userProfile?.email?.length !== 0 && (
          <div className="flex items-center gap-2">
            <label className="text-gray-600 dark:text-gray-400">Email:</label>
            <p className="font-semibold dark:text-gray-200">
              {userProfile?.email}
            </p>
          </div>
        )}
        {userProfile?.phoneNumber?.length !== 0 && (
          <div className="flex items-center gap-2">
            <label className="text-gray-600 dark:text-gray-400">Phone:</label>
            <p className="font-semibold dark:text-gray-200">
              {userProfile?.phoneNumber}
            </p>
          </div>
        )}

        {userProfile?.gender?.length !== 0 && (
          <div className="flex items-center gap-2">
            <label className="text-gray-600 dark:text-gray-400">Gender:</label>
            <p className="font-semibold dark:text-gray-200">
              {userProfile?.gender}
            </p>
          </div>
        )}
        {userProfile?.birthDate?.length !== 0 && (
          <div className="flex items-center gap-2">
            <label className="text-gray-600 dark:text-gray-400">
              Birth Date:
            </label>
            <p className="font-semibold dark:text-gray-200">
              {userProfile?.birthDate
                ? new Date(userProfile?.birthDate).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfileInformations;
