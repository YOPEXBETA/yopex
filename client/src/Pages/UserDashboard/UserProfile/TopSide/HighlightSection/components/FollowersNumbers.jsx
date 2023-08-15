import React from "react";
import { useParams } from "react-router-dom";
import { useUserFollowers } from "../../../../../../hooks/react-query/useUsers";

const FollowersNumbers = () => {
  const { userId } = useParams();
  const { data: followers } = useUserFollowers(userId);

  return (
    <div className=" flex items-center gap-2 justify-between">
      <p className="text-zinc-500">Followers</p>
      <p className="text-lg">{followers?.length}</p>
    </div>
  );
};

export default FollowersNumbers;
