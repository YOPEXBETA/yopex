import React from "react";
import { useParams } from "react-router-dom";
import { useUserFollowers } from "../../../../../../hooks/react-query/useUsers";

const FollowersNumbers = () => {
  const { userId } = useParams();
  const { data: followers } = useUserFollowers(userId);

  return (
    <div className=" flex items-center gap-2  justify-between">
      <p className="text-zinc-500 dark:text-gray-200 ">Followers</p>
      <p className="text-lg dark:text-gray-200">{followers?.length}</p>
    </div>
  );
};

export default FollowersNumbers;
