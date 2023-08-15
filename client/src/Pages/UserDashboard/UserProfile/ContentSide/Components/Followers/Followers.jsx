import React from "react";
import { useParams } from "react-router-dom";
import { useUserFollowers } from "../../../../../../hooks/react-query/useUsers";
import FollowersCard from "../../../../../../Components/shared/cards/FollowersCard";

const Followers = () => {
  const { userId } = useParams();
  const { data: followers, isLoading } = useUserFollowers(userId);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {isLoading ? (
        <p>Loading posts...</p>
      ) : (
        followers?.map((follower) => (
          <FollowersCard key={follower._id} follower={follower} />
        ))
      )}
    </div>
  );
};

export default Followers;
