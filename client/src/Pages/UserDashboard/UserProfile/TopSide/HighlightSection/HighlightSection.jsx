import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import getDeadlineDifference from "../../../../../utils/deadlineModif";
import { useUserFollowers } from "../../../../../hooks/react-query/useUsers";
import { useUserFollowings } from "../../../../../hooks/react-query/useUsers";
import { useUserChallenges } from "../../../../../hooks/react-query/useUsers";

const HighlightSection = () => {
  const { userId } = useParams();
  const { data: followers } = useUserFollowers(userId);
  const { data: followings } = useUserFollowings(userId);
  const { data } = useUserChallenges(userId);

  const isChallengeInProgress = (challenge) => {
    return getDeadlineDifference(challenge?.deadline) ===
      "0 Days 0 Hours 0 Minutes"
      ? false
      : true;
  };

  const completed = useMemo(() => {
    let counter = 0;
    if (data) {
      data.challenges?.forEach((challenge) => {
        if (!isChallengeInProgress(challenge)) {
          counter++;
        }
      });
    }
    return counter;
  }, [data]);

  return (
    <div className="space-y-4">
      <div className=" flex items-center gap-2  justify-between">
        <p className="dark:text-gray-200 ">Followers</p>
        <p className="text-lg dark:text-gray-200 font-bold">
          {followers?.length}
        </p>
      </div>
      <div className=" flex items-center gap-2 justify-between">
        <p className="dark:text-gray-200"> Followings</p>
        <p className="text-lg dark:text-gray-200 font-bold">
          {followings?.userFollowingss.length +
            followings?.companyFollowings.length}
        </p>
      </div>
      <div className=" flex items-center gap-2 justify-between">
        <p className="dark:text-gray-200">Completed Challenges</p>
        <p className="text-lg dark:text-gray-200 font-bold">{completed}</p>
      </div>
    </div>
  );
};

export default HighlightSection;
