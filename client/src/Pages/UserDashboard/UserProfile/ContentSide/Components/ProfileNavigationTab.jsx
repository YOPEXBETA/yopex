import React from "react";
import { useParams } from "react-router-dom";
import { useUserReviews } from "../../../../../hooks/react-query/useReviews";
import { useUserById } from "../../../../../hooks/react-query/useUsers";
import { useSelector } from "react-redux";

export const ProfileNavigationTab = ({ changeValue, value }) => {
  const { user } = useSelector((state) => state.auth);
  const { userId } = useParams();
  const { data: userProfile } = useUserById(userId);
  const { data: reviews } = useUserReviews(userId);

  return (
    <div>
      <div className="flex space-x-4">
        <button
          className={`py-2 px-4 border-b-2 ${
            value === 0
              ? "border-green-500 text-green-500"
              : "text-zinc-500 border-zinc-500"
          }`}
          onClick={() => changeValue(0)}
        >
          My Posts
        </button>
        <button
          className={`py-2 px-4 border-b-2 ${
            value === 1
              ? "border-green-500 text-green-500"
              : "text-zinc-500 border-gray-500"
          }`}
          onClick={() => changeValue(1)}
        >
          My Challenges
        </button>
        <button
          className={`py-2 px-4 border-b-2 ${
            value === 2
              ? "border-green-500 text-green-500"
              : "text-zinc-500 border-gray-500"
          }`}
          onClick={() => changeValue(2)}
        >
          Followers
        </button>
        <button
          className={`py-2 px-4 border-b-2 ${
            value === 3
              ? "border-green-500 text-green-500"
              : "text-zinc-500 border-gray-500"
          }`}
          onClick={() => changeValue(3)}
        >
          Followings
        </button>

        <button
          className={`py-2 px-4 border-b-2 ${
            value === 4
              ? "border-green-500 text-green-500"
              : "text-zinc-500 border-gray-500"
          }`}
          onClick={() => changeValue(4)}
        >
          {`Feedbacks (${reviews?.length || 0})`}{" "}
        </button>
        {userId == user._id ? (
          <button
            className={`py-2 px-4 border-b-2 ${
              value === 5
                ? "border-green-500 text-green-500"
                : "text-zinc-500 border-gray-500"
            }`}
            onClick={() => changeValue(5)}
          >
            {` Bookmarks (${userProfile?.bookmarks.length || 0})`}{" "}
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
