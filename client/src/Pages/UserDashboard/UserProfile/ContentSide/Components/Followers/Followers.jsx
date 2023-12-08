import React from "react";
import { useParams } from "react-router-dom";
import { useUserFollowers } from "../../../../../../hooks/react-query/useUsers";
import LoadingSpinner from "../../../../../../Components/LoadingSpinner";
import FollowersCard from "../../../../../../Components/Cards/FollowersCard";

const Followers = () => {
  const { userId } = useParams();
  const { data: followers, isLoading } = useUserFollowers(userId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 py-2">
      {isLoading ? (
        <LoadingSpinner />
      ) : followers?.length > 0 ? (
        followers.map((follower) => (
          <FollowersCard key={follower._id} follower={follower} />
        ))
      ) : (
        <p className="dark:text-gray-200 text-md">No Followers Found.</p>
      )}
    </div>
  );
};

export default Followers;
