import React from "react";
import { useParams } from "react-router-dom";
import { useUserReviews } from "../../hooks/react-query/useReviews";
import { useUserById } from "../../hooks/react-query/useUsers";
import { useSelector } from "react-redux";

export const ProfileNavigationTab = ({ changeValue, value }) => {
  const { user } = useSelector((state) => state.auth);
  const { userId } = useParams();
  const { data: userProfile } = useUserById(userId);
  const { data: reviews } = useUserReviews(userId);

  return (
    <div>
      <div className="divide-gray-100 p-2 dark:border-zinc-500 overflow-hidden rounded-lg bg-white border dark:bg-zinc-800 text-gray-600 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4">
        <button
          className={`flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300   ${
            value === 0
              ? "bg-green-500 text-white dark:text-gray-200 border-green-500"
              : "text-gray-500 border-gray-300 dark:text-gray-300 "
          }`}
          onClick={() => changeValue(0)}
        >
          About
        </button>
        <button
          className={`flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300   ${
            value === 1
              ? "bg-green-500 text-white dark:text-gray-200 border-green-500"
              : "text-gray-500 border-gray-300 dark:text-gray-300"
          }`}
          onClick={() => changeValue(1)}
        >
          Projects
        </button>
        <button
          className={`flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300   ${
            value === 2
              ? "bg-green-500 text-white dark:text-gray-200  border-green-500"
              : "text-gray-500 border-gray-300 dark:text-gray-300"
          }`}
          onClick={() => changeValue(2)}
        >
          Challenges
        </button>
        <button
          className={`flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300   ${
            value === 3
              ? "bg-green-500 text-white dark:text-gray-200 border-green-500"
              : "text-gray-500 border-gray-300 dark:text-gray-300"
          }`}
          onClick={() => changeValue(3)}
        >
          Followers
        </button>
        <button
          className={`flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300   ${
            value === 4
              ? "bg-green-500 text-white dark:text-gray-200 border-green-500"
              : "text-gray-500 border-gray-300 dark:text-gray-300"
          }`}
          onClick={() => changeValue(4)}
        >
          Followings
        </button>
        <button
          className={`flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300   ${
            value === 5
              ? "bg-green-500 text-white dark:text-gray-200 border-green-500"
              : "text-gray-500 border-gray-300 dark:text-gray-300"
          }`}
          onClick={() => changeValue(5)}
        >
          Badges
        </button>
        <button
          className={`flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300   ${
            value === 6
              ? "bg-green-500 text-white "
              : "text-gray-500 border-gray-300 dark:text-gray-300"
          }`}
          onClick={() => changeValue(6)}
        >
          {`Reviews (${reviews?.length || 0})`}
        </button>
        {userId == user._id ? (
          <button
            className={`flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300   ${
              value === 7
                ? "bg-green-500 text-white dark:text-gray-200 border-green-500"
                : "text-gray-500 border-gray-300 dark:text-gray-300"
            }`}
            onClick={() => changeValue(7)}
          >
            {`Favorites (${userProfile?.bookmarks.length || 0})`}
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
