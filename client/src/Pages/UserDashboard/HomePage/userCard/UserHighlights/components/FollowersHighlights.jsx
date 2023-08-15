import React from "react";
import { useSelector } from "react-redux";
import { useUserFollowers } from "../../../../../../hooks/react-query/useUsers";

const FollowersHighlights = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: followers } = useUserFollowers(user._id);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="text-medium text-gray-500"> Followers</div>
        <div className="text-xl font-bold">{followers?.length}</div>
      </div>
    </div>
  );
};

export default FollowersHighlights;
