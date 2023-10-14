import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  useFollowUser,
  useUserById,
} from "../../../../../../hooks/react-query/useUsers";

const UserProfileInformations = () => {
  const { userId } = useParams();
  const { data: userProfile } = useUserById(userId);
  console.log(userProfile);

  return (
    <div class="bg-white dark:bg-zinc-800 dark:shadow-sm dark:shadow-green-600 rounded-lg shadow-md p-6 mx-auto  w-full">
      <h2 class="text-2xl font-semibold mb-4 dark:text-gray-200">About</h2>

      <div class="space-y-4">
        {userProfile?.email?.length !== 0 && (
          <div>
            <label class="text-gray-600 dark:text-gray-300">Email:</label>
            <p class="font-semibold dark:text-gray-200">{userProfile?.email}</p>
          </div>
        )}
        {userProfile?.phoneNumber?.length !== 0 && (
          <div>
            <label class="text-gray-600 dark:text-gray-300">Phone:</label>
            <p class="font-semibold dark:text-gray-200">{userProfile?.phoneNumber}</p>
          </div>
        )}
        {userProfile?.gender?.length !== 0 && (
          <div>
            <label class="text-gray-600 dark:text-gray-300">Gender:</label>
            <p class="font-semibold dark:text-gray-200">{userProfile?.gender}</p>
          </div>
        )}
        {userProfile?.birthDate?.length !== 0 && (
          <div>
            <label class="text-gray-600 dark:text-gray-300">Birth Date:</label>
            <p class="font-semibold dark:text-gray-200">
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
