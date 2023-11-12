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
      <div className="divide-gray-100  dark:border dark:border-zinc-500  overflow-hidden rounded-lg border bg-white dark:bg-zinc-800 text-gray-600 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4">
        <button
          className={`w-1/2 sm:w-auto py-2 px-4  rounded-tl-lg ${
            value === 0
              ? "bg-green-500 text-white dark:text-gray-200 border-green-500"
              : "text-gray-500 border-gray-300 dark:text-gray-300 "
          }`}
          onClick={() => changeValue(0)}
        >
          About
        </button>
        <button
          className={`w-1/2 sm:w-auto py-2 px-4  rounded-tl-lg ${
            value === 1
              ? "bg-green-500 text-white dark:text-gray-200 border-green-500"
              : "text-gray-500 border-gray-300 dark:text-gray-300"
          }`}
          onClick={() => changeValue(1)}
        >
          My Posts
        </button>
        <button
          className={`w-1/2 sm:w-auto py-2 px-4  ${
            value === 2
              ? "bg-green-500 text-white dark:text-gray-200  border-green-500"
              : "text-gray-500 border-gray-300 dark:text-gray-300"
          }`}
          onClick={() => changeValue(2)}
        >
          My Challenges
        </button>
        <button
          className={`w-1/2 sm:w-auto py-2 px-4 ${
            value === 3
              ? "bg-green-500 text-white dark:text-gray-200 border-green-500"
              : "text-gray-500 border-gray-300 dark:text-gray-300"
          }`}
          onClick={() => changeValue(3)}
        >
          Followers
        </button>
        <button
          className={`w-1/2 sm:w-auto py-2 px-4 ${
            value === 4
              ? "bg-green-500 text-white dark:text-gray-200 border-green-500"
              : "text-gray-500 border-gray-300 dark:text-gray-300"
          }`}
          onClick={() => changeValue(4)}
        >
          Followings
        </button>
        <button
          className={`w-1/2 sm:w-auto py-2 px-4 ${
            value === 5
              ? "bg-green-500 text-white dark:text-gray-200 border-green-500"
              : "text-gray-500 border-gray-300 dark:text-gray-300"
          }`}
          onClick={() => changeValue(5)}
        >
          Badges
        </button>
        <button
          className={`w-1/2 sm:w-auto py-2 px-4 ${
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
            className={`w-1/2 sm:w-auto py-2 px-4  rounded-tr-lg ${
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
