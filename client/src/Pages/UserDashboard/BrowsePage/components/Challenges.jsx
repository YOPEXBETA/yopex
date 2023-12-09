import React from "react";
import ChallengeCardSkeleton from "../../../../Components/SkeletonLoading/ChallengeCardSkeleton";
import ChallengeCard from "../../../../Components/Cards/ChallengeCard";

const Challenges = ({ challenges, isLoading }) => {
  // Sort challenges by the newest ones first
  const sortedChallenges = challenges
    ? challenges
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-2 xl:grid-cols-2 mb-16 xl:mb-4">
      {isLoading ? (
        <div>
          <ChallengeCardSkeleton />
        </div>
      ) : sortedChallenges.length > 0 ? (
        sortedChallenges.map((item) => (
          <ChallengeCard key={item._id} challenge={item} />
        ))
      ) : (
        <p className="dark:text-white text-lg">No Challenges found</p>
      )}
    </div>
  );
};

export default Challenges;
