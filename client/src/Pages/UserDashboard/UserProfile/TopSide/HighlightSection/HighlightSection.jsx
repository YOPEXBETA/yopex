import React from "react";
import FollowersNumbers from "./components/FollowersNumbers";
import FollowingsNumbers from "./components/FollowingsNumbers";
import CompletedChallenges from "./components/CompletedChallenges";

const HighlightSection = () => {
  return (
    <div className="space-y-2">
      <FollowersNumbers />
      <FollowingsNumbers />
      <CompletedChallenges />
    </div>
  );
};

export default HighlightSection;
