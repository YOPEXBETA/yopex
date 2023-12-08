import React from "react";
import { useParams } from "react-router-dom";
import { useUserFollowings } from "../../../../../../hooks/react-query/useUsers";
import LoadingSpinner from "../../../../../../Components/LoadingSpinner";
import FollowingsCard from "../../../../../../Components/Cards/FollowingsCard";
import FollowingsCompaniesCard from "../../../../../../Components/Cards/FollowingsCompaniesCard";

const Followings = () => {
  const { userId } = useParams();
  const { data: followings, isLoading } = useUserFollowings(userId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 py-2">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {followings?.userFollowingss?.length === 0 &&
          followings?.companyFollowings?.length === 0 ? (
            <p className="dark:text-gray-200 text-md">No Followings Found.</p>
          ) : (
            <>
              {followings.userFollowingss.map((following) => (
                <FollowingsCard key={following._id} following={following} />
              ))}
              {followings.companyFollowings.map((following) => (
                <FollowingsCompaniesCard
                  key={following._id}
                  following={following}
                />
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Followings;
