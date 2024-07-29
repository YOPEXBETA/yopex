import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useUserReviews } from "../../hooks/react-query/useReviews";
import { useUserById } from "../../hooks/react-query/useUsers";
import { useSelector } from "react-redux";
import Card from "../Cards";

export const ProfileNavigationTab = ({ changeValue, value, extra }) => {
  const { user } = useSelector((state) => state.auth);
  const { userId } = useParams();
  const { data: userProfile } = useUserById(userId);
  const { data: reviews } = useUserReviews(userId);

  return (
    <Card extra={`${extra}`}>
      <div className="p-1 overflow-hidden sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4 bg-gray-100 rounded-lg">
        <button
          className={`flex-1 items-center rounded-lg dark:text-black transition-colors duration-300 ease-in focus:outline-none hover:text-indigo-500 focus:text-indigo-500 px-4 py-2   ${
            value === 0
              ? "bg-white shadow"
              : ""
          }`}
          onClick={() => changeValue(0)}
        >
          About
        </button>
        <button
          className={`flex-1 items-center rounded-lg dark:text-black transition-colors duration-300 ease-in focus:outline-none hover:text-indigo-500 focus:text-indigo-500 px-4 py-2   ${
            value === 1
              ? "bg-white shadow"
              : ""
          }`}
          onClick={() => changeValue(1)}
        >
          Posts
        </button>
        <button
          className={`flex-1 items-center rounded-lg dark:text-black transition-colors duration-300 ease-in focus:outline-none hover:text-indigo-500 focus:text-indigo-500 px-4 py-2   ${
            value === 2
              ? "bg-white shadow"
              : ""
          }`}
          onClick={() => changeValue(2)}
        >
          Challenges
        </button>
        <button
          className={`flex-1 items-center rounded-lg dark:text-black transition-colors duration-300 ease-in focus:outline-none hover:text-indigo-500 focus:text-indigo-500 px-4 py-2   ${
            value === 3
                ? "bg-white shadow"
                : ""
            }`}
          onClick={() => changeValue(3)}
        >
          Followers
        </button>
        <button
          className={`flex-1 items-center rounded-lg dark:text-black transition-colors duration-300 ease-in focus:outline-none hover:text-indigo-500 focus:text-indigo-500 px-4 py-2   ${
            value === 4
                ? "bg-white shadow"
                : ""
            }`}
          onClick={() => changeValue(4)}
        >
          Followings
        </button>
        <button
          className={`flex-1 items-center rounded-lg dark:text-black transition-colors duration-300 ease-in focus:outline-none hover:text-indigo-500 focus:text-indigo-500 px-4 py-2   ${
            value === 5
              ? "bg-white shadow"
              : ""
          }`}
          onClick={() => changeValue(5)}
        >
          Badges
        </button>
        <button
          className={`flex-1 items-center rounded-lg dark:text-black transition-colors duration-300 ease-in focus:outline-none hover:text-indigo-500 focus:text-indigo-500 px-4 py-2   ${
            value === 6
              ? "bg-white shadow"
              : ""
          }`}
          onClick={() => changeValue(6)}
        >
          {`Reviews (${reviews?.length || 0})`}
        </button>
        {userId == user._id ? (
          <button
          className={`flex-1 items-center rounded-lg dark:text-black transition-colors duration-300 ease-in focus:outline-none hover:text-indigo-500 focus:text-indigo-500 px-4 py-2   ${
            value === 7
              ? "bg-white shadow"
              : ""
          }`}
            onClick={() => changeValue(7)}
          >
            {`Favorites (${userProfile?.bookmarks.length || 0})`}
          </button>
        ) : (
          ""
        )}
      </div>
    </Card>
  );
};
