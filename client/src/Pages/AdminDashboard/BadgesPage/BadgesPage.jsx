import React from "react";
import { useBadges } from "../../../hooks/react-query/useBadges";
import AdminMenuList from "./components/AdminMenuList";
import BadgeCard from "../../../Components/Cards/BadgeCard";

const BadgesPage = () => {
  const { data } = useBadges();

  return (
    <div className="space-y-4">
      <AdminMenuList />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data
          ?.filter((badge) => badge.badgeName)
          .map(
            (badgeData) =>
              badgeData && (
                <BadgeCard key={badgeData._id} badgeData={badgeData} />
              )
          )}
      </div>
    </div>
  );
};

export default BadgesPage;
