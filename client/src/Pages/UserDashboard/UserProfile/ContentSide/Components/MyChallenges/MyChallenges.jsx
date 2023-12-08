import React from "react";
import { useParams } from "react-router-dom";
import { useUserChallenges } from "../../../../../../hooks/react-query/useUsers";
import ChallengeCardSkeleton from "../../../../../../Components/SkeletonLoading/ChallengeCardSkeleton";
import ChallengeCard from "../../../../../../Components/Cards/ChallengeCard";

const MyChallenges = () => {
  const { userId } = useParams();
  const { data, isLoading } = useUserChallenges(userId);

  if (isLoading) {
    return <ChallengeCardSkeleton />;
  }

  if (data)
    return (
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 py-2 mb-12">
          {data.challenges.length > 0 ? (
            data.challenges?.map((challenge) => (
              <ChallengeCard
                key={challenge._id}
                Challenges={data.challenges}
                challenge={challenge}
                type={"small"}
              />
            ))
          ) : (
            <p className="dark:text-gray-200 text-md "> No Challenge Found.</p>
          )}
        </div>
      </div>
    );
};

export default MyChallenges;
