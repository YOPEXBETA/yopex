import React from "react";
import {
  useBadges,
  useDeleteBadge,
} from "../../../hooks/react-query/useBadges";
import AdminMenuList from "./components/AdminMenuList";

const BadgesPage = () => {
  const { data } = useBadges();
  const { mutate } = useDeleteBadge();

  return (
    <div className="space-y-4">
      <AdminMenuList />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data
          ?.filter((badge) => badge.badgeName)
          .map(
            (badgeData) =>
              badgeData && (
                <div
                  key={badgeData._id}
                  className="bg-white p-4 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 border-2 border-green-400"
                >
                  <div className="flex flex-col items-center space-y-2">
                    <img
                      src={badgeData.badgeImg}
                      alt={badgeData.badgeName}
                      className="w-28 h-28 rounded-full border-4 border-green-200 bg-white p-1"
                    />
                    <div className="flex items-center flex-col">
                      <h5 className="text-green-500 text-lg font-semibold truncate">
                        {badgeData.badgeName}
                      </h5>
                      <p className="text-gray-500 text-sm">
                        {badgeData.badgeDescription}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => mutate(badgeData._id)}
                    className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full hover:bg-red-700 transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              )
          )}
      </div>
    </div>
  );
};

export default BadgesPage;
