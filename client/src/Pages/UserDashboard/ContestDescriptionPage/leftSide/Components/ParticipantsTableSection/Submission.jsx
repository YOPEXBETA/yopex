import React from "react";
import { useChallengeById, useGetChallengeSubmissions } from "../../../../../../hooks/react-query/useChallenges";
import LoadingSpinner from "../../../../../../Components/LoadingSpinner";
import { useParams } from "react-router-dom";
import SubmissionCard from "./submissionCard";

const Submission = ({ isOwner }) => {
  // get the challenge id from the uri
  const { id: challengeId } = useParams();

  const { data, isLoading } = useGetChallengeSubmissions(challengeId);
  const { data: challenge } = useChallengeById(challengeId);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-1 gap-4">
      {isLoading ? (
        <div>
          <LoadingSpinner />
        </div>
      ) : data.length > 0 ? (
        data.map((item) => (
          <SubmissionCard
            key={item._id}
            item={item}
            isOwner={isOwner}
            user={item.userId}
            challenge={challenge}
          />
        ))
      ) : (
        <p className="dark:text-white text-lg">No Submission found</p>
      )}
    </div>
  );
};

export default Submission;
