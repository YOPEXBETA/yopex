import React, { useState } from "react";
import { useFindChallenges } from "../../../../../hooks/react-query/useChallenges";
import ChallengeCard from "../../../../../Components/shared/cards/ChallengeCard";
import LoadingSpinner from "../../../../../Components/LoadingSpinner";
import ChallengeCardSkeleton from "../../../../../Components/SkeletonLoading/ChallengeCardSkeleton";

const Challenges = ({
  minAmount,
  maxAmount,
  searchQuery,
  selectedSkill,
  selectedCategory,
}) => {
  // Data fetching | react-query
  const { data: challenges, isLoading } = useFindChallenges(
    minAmount,
    maxAmount,
    searchQuery,
    selectedSkill,
    selectedCategory
  );

  // Sort challenges by the newest ones first
  const sortedChallenges = challenges
    ? challenges
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-2 xl:grid-cols-1 mb-16 xl:mb-4">
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
