import React from "react";
import { Link, useParams } from "react-router-dom";
import { useUserFollowings } from "../../../../../../hooks/react-query/useUsers";
import FollowingsCard from "../../../../../../Components/shared/cards/FollowingsCard";
import FollowingsCompaniesCard from "../../../../../../Components/shared/cards/FollowingsCompaniesCard";
const Followings = () => {
  const { userId } = useParams();
  const { data: followings, isLoading } = useUserFollowings(userId);
  console.log(followings);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {isLoading ? (
        <p>Loading posts...</p>
      ) : (
       <>
        {followings.userFollowingss.map((following) => (
          <FollowingsCard key={following._id} following={following} />
          ))}
          {followings.companyFollowings.map((following) => (
          <FollowingsCompaniesCard key={following._id} following={following} />
        ))}
          </>
      )}
    </div>
  );
};

export default Followings;
