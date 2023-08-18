import React from "react";
import FollowersHighlights from "./components/FollowersHighlights";
import FollowingsHighlights from "./components/FollowingsHighlights";
import CompletedChallenges from "./components/CompletedChallenges";

const UserHighlights = () => {
  return (
    <div className="bg-white shadow-md p-6 border-b-2 border-b-green-500 rounded-lg">
      <h2 className="text-xl font-medium mb-4">Highlights</h2>
      <div className="space-y-4">
        <FollowersHighlights />
        <FollowingsHighlights />
        <CompletedChallenges />
      </div>
    </div>
  );
};

export default UserHighlights;
