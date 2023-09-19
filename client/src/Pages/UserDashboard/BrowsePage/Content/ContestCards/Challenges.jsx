import React, { useState } from "react";
import { useFindChallenges } from "../../../../../hooks/react-query/useChallenges";
import ChallengeCard  from "../../../../../Components/shared/cards/ChallengeCard";

const Challenges = ({ minAmount, maxAmount, searchQuery  ,selectedSkill,selectedCategory}) => {
  // Data fetching | react-query
  const { data: challenges, isLoading } = useFindChallenges(
    minAmount,
    maxAmount,
    searchQuery,
    selectedSkill,
    selectedCategory,
  );


  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-2 xl:grid-cols-1 mb-16 xl:mb-4">
      {!challenges?.length ==0 ? (
        challenges?.length > 0 &&
        challenges.map((item) => (
          <ChallengeCard key={item._id} challenge={item} />
        ))
      ) : (
       <p>Loading ....</p>
      )}
    </div>
  );
};

export default Challenges;
