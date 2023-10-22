import React from "react";
import { useSelector } from "react-redux";
import { useUserFollowings } from "../../../../../hooks/react-query/useUsers";

const FollowingsHighlights = () => {
  const { user } = useSelector((state) => state?.auth);
  const { data: followings } = useUserFollowings(user?._id);

  return (
    <div className="flex items-center justify-between">
      <div className="text-medium text-gray-500 dark:text-gray-200">
        {" "}
        Followings
      </div>
      <div className="text-xl font-bold dark:text-gray-300">
        {followings?.userFollowingss?.length +
          followings?.companyFollowings?.length}
      </div>
    </div>
  );
};

export default FollowingsHighlights;
