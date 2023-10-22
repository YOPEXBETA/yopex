import React from "react";
import FollowersHighlights from "./components/FollowersHighlights";
import FollowingsHighlights from "./components/FollowingsHighlights";
import CompletedChallenges from "./components/CompletedChallenges";

const UserHighlights = () => {
  return (
    <div className="p-6 divide-gray-100 dark:divide-gray-700 overflow-hidden rounded-2xl border border-gray-300 text-gray-600 dark:border-gray-700 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4">
      <h4 className="text-xl font-bold dark:text-gray-200 mb-4"> Highlights</h4>

      <div className="space-y-4">
        <FollowersHighlights />
        <FollowingsHighlights />
        <CompletedChallenges />
      </div>
    </div>
  );
};

export default UserHighlights;
