import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";
import { useChallengesById } from "../../../../../../hooks/react-query/useChallenges";
import ChallengeCard from "../../../../../../Components/shared/cards/ChallengeCard";
import LoadingSpinner from "../../../../../../Components/LoadingSpinner";

const MyCompanyChallenges = () => {
  const { companyId } = useParams();
  const { data: companyChallenges, isLoading } = useChallengesById(companyId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4  py-5">
        {companyChallenges?.length > 0 ? (
          companyChallenges?.map((challenge) => (
            <ChallengeCard
              key={challenge?._id}
              companyChallenges={companyChallenges}
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
