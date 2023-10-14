import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  useFollowUser,
  useUserById,
} from "../../../../../../hooks/react-query/useUsers";
import LoadingSpinner from "../../../../../../Components/LoadingSpinner";

const UserProfileInformations = () => {
  const { userId } = useParams();
  const { data: userProfile, isLoading } = useUserById(userId);
  console.log(userProfile);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div className="p-4 divide-gray-100 dark:divide-gray-700 overflow-hidden rounded-2xl border border-gray-300 text-gray-600 dark:border-gray-700 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4">
      <div className="space-y-4">
        {userProfile?.email?.length !== 0 && (
          <div>
            <label className="text-gray-600">Email:</label>
            <p className="font-semibold">{userProfile?.email}</p>
          </div>
        )}
        {userProfile?.phoneNumber?.length !== 0 && (
          <div>
            <label className="text-gray-600">Phone:</label>
            <p className="font-semibold">{userProfile?.phoneNumber}</p>
          </div>
        )}
        {userProfile?.gender?.length !== 0 && (
          <div>
            <label className="text-gray-600">Gender:</label>
            <p className="font-semibold">{userProfile?.gender}</p>
          </div>
        )}
        {userProfile?.birthDate?.length !== 0 && (
          <div>
            <label className="text-gray-600">Birth Date:</label>
            <p className="font-semibold">
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
