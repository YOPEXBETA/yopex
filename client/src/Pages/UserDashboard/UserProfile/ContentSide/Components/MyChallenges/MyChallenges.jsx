import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  useUserById,
  useUserChallenges,
} from "../../../../../../hooks/react-query/useUsers";
import getDeadlineDifference from "../../../../../../utils/deadlineModif";
import ChallengeCard from "../../../../../../Components/shared/cards/ChallengeCard";

const MyChallenges = () => {
  const { userId } = useParams();
  const { data: userProfile } = useUserById(userId);
  const { data } = useUserChallenges(userId);

  const isChallengeInProgress = (challenge) => {
    if (
      getDeadlineDifference(challenge?.deadline) === "0 Days 0 Hours 0 Minutes"
    )
      return false;
    return true;
  };

  if (data)
    return (
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-4  py-5">
          {data.challenges.length > 0 ? (
            data.challenges?.map((challenge) => (
              <ChallengeCard
                key={challenge._id}
                Challenges={data.challenges}
                challenge={challenge}
              />
            ))
          ) : (
            <p>No challenge found.</p>
          )}
        </div>
      </div>
    );
};

export default MyChallenges;
