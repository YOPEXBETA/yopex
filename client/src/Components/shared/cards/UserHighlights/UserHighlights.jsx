import React, { useMemo } from "react";

import { useSelector } from "react-redux";
import { useUserFollowers } from "../../../../hooks/react-query/useUsers";
import { useUserFollowings } from "../../../../hooks/react-query/useUsers";
import { useUserChallenges } from "../../../../hooks/react-query/useUsers";
import getDeadlineDifference from "../../../../utils/deadlineModif";

const UserHighlights = () => {
  const { user } = useSelector((state) => state?.auth);
  const { data: followers } = useUserFollowers(user?._id);
  const { data: followings } = useUserFollowings(user?._id);
  const { data: Completedchallenges } = useUserChallenges(user?._id);

  const handleProgress = (card) => {
    if (getDeadlineDifference(card?.deadline) === "0 Days 0 Hours 0 Minutes")
      return false;
    return true;
  };

  const completed = useMemo(() => {
    let counter = 0;
    if (Completedchallenges) {
      Completedchallenges?.challenges?.forEach((item) => {
        if (!handleProgress(item)) {
          counter++;
        }
      });
    }
    return counter;
  }, [Completedchallenges]);

  return (
    <div className="p-6 divide-gray-100 dark:divide-gray-700 overflow-hidden rounded-lg shadow-md bg-white dark:bg-zinc-700 text-gray-600 dark:border-gray-700 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4">
      <h4 className="text-xl font-bold dark:text-gray-200 mb-4">Stats</h4>

      <div className="space-y-4">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <div className="text-xl font-bold dark:text-gray-300">
              {followers?.length}
            </div>
            <div className="text-medium text-gray-500 dark:text-gray-200">
              Followers
            </div>
          </div>
          <div className="flex flex-col">
            <div className="text-xl font-bold dark:text-gray-300">
              {followings?.userFollowingss?.length +
                followings?.companyFollowings?.length}
            </div>
            <div className="text-medium text-gray-500 dark:text-gray-200">
              Followings
            </div>
          </div>
          <div className="flex flex-col">
            <div className="text-xl font-bold dark:text-gray-300">
              {completed}
            </div>
            <div className="text-medium text-gray-500 dark:text-gray-200">
              Challenges
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHighlights;
