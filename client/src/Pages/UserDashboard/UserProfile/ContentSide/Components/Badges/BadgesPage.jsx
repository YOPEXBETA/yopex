import React from "react";
import { useUserById } from "../../../../../../hooks/react-query/useUsers";
import { useParams } from "react-router-dom";
import UserBadgeCard from "../../../../../../Components/shared/cards/UserBadgeCard";
import LoadingSpinner from "../../../../../../Components/LoadingSpinner";
const BadgesPage = () => {
  const { userId } = useParams();
  const { data: userProfile, isLoading } = useUserById(userId);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4 gap-0 py-2">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {userProfile?.badgesEarned?.length !== 0 && (
            <div className="w-full">
              {userProfile?.badgesEarned?.map((badge) => (
                <UserBadgeCard key={badge._id} badge={badge} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BadgesPage;
