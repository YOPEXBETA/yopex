import React from "react";
import FollowersHighlights from "./components/FollowersHighlights";
import FollowingsHighlights from "./components/FollowingsHighlights";
import CompletedChallenges from "./components/CompletedChallenges";

const UserHighlights = () => {
  return (
    <div className="bg-white dark:bg-zinc-800 dark:shadow-green-600 dark:shadow-sm shadow-md p-6 border-b-2 border-b-green-500 rounded-lg">
      <h2 className="text-xl font-medium mb-4 dark:text-gray-200">Highlights</h2>
      <div className="space-y-4">
        <FollowersHighlights />
        <FollowingsHighlights />
        <CompletedChallenges />
      </div>
    </div>
  );
};

export default UserHighlights;
