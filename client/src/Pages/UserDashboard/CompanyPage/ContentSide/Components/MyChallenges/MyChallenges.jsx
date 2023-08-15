import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";
import { useChallengesById } from "../../../../../../hooks/react-query/useChallenges";
import ChallengeCard from "../../../../../../Components/shared/cards/ChallengeCard";

const MyCompanyChallenges = () => {
  const { companyId } = useParams();
  const { data: companyChallenges, isLoading } = useChallengesById(companyId);
  console.log("companyChallenges", companyChallenges);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-11 py-5">
        {companyChallenges.length > 0 ? (
          companyChallenges?.map((challenge) => (
            <ChallengeCard
              key={challenge._id}
              companyChallenges={companyChallenges}
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
export default MyCompanyChallenges;
