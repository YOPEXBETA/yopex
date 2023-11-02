import React from "react";
import { useParams } from "react-router-dom";
import { useUserFollowings } from "../../../../../../hooks/react-query/useUsers";

const FollowingsNumbers = () => {
  const { userId } = useParams();
  const { data: followings } = useUserFollowings(userId);

  return (
    <div className=" flex items-center gap-2 justify-between">
      <p className="dark:text-gray-200"> Followings</p>
      <p className="text-lg dark:text-gray-200">
        {followings?.userFollowingss.length +
          followings?.companyFollowings.length}
      </p>
    </div>
  );
};

export default FollowingsNumbers;
