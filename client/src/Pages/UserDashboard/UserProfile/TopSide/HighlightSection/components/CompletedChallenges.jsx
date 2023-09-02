import React, { useMemo } from "react";
import {
  useUserById,
  useUserChallenges,
} from "../../../../../../hooks/react-query/useUsers";
import { useParams } from "react-router-dom";
import getDeadlineDifference from "../../../../../../utils/deadlineModif";

const CompletedChallenges = () => {
  const { userId } = useParams();
  const { data: userProfile } = useUserById(userId);
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
    <div className=" flex items-center gap-2 justify-between">
      <p className="text-zinc-500">Completed Challenges</p>
      <p className="text-lg">{completed}</p>
    </div>
  );
};

export default CompletedChallenges;
