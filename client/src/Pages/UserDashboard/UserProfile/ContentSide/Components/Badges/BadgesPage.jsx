import React from "react";
import { useUserById } from "../../../../../../hooks/react-query/useUsers";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../../../../../Components/LoadingSpinner";
import UserBadgeCard from "../../../../../../Components/Cards/UserBadgeCard";

const BadgesPage = () => {
  const { userId } = useParams();
  const { data: userProfile, isLoading } = useUserById(userId);

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 py-2">
        {isLoading ? (
          <LoadingSpinner />
        ) : userProfile?.badgesEarned?.length !== 0 > 0 ? (
          userProfile?.badgesEarned?.map((badge) => (
            <UserBadgeCard key={badge._id} badge={badge} />
          ))
        ) : (
          <p className="dark:text-gray-200 text-md">No Badge Found.</p>
        )}
      </div>
    </div>
  );
};

export default BadgesPage;
