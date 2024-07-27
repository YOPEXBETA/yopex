import React from "react";
import { useParams } from "react-router-dom";
import { useChallengesById } from "../../../../../../hooks/react-query/useChallenges";
import LoadingSpinner from "../../../../../../Components/LoadingSpinner";
import ChallengeCard from "../../../../../../Components/Cards/ChallengeCard";
import NewChallengeCard from "../../../../../../Components/Cards/NewChallengeCard";

const MyCompanyChallenges = () => {
  const { organizationId } = useParams();
  const { data: organizationChallenges, isLoading } = useChallengesById(organizationId);
console.log(organizationChallenges)
  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {organizationChallenges?.length > 0 ? (
          organizationChallenges?.map((challenge) => (
            <NewChallengeCard
              key={challenge?._id}
              organizationChallenges={organizationChallenges}
              challenge={challenge}
            />
          ))
        ) : (
          <p className="dark:text-gray-200">No challenge found.</p>
        )}
      </div>
    </div>
  );
};
export default MyCompanyChallenges;
