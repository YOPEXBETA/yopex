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
      <div className="flex bg-white shadow-md rounded-lg border-b-1 border-zinc-500">
        <button
          className={`py-2 px-4  rounded-tl-lg ${
            value === 0
              ? "bg-green-500 text-white border-green-500"
              : "text-gray-500 border-gray-300"
          }`}
          onClick={() => changeValue(0)}
        >
          My Posts
        </button>
        <button
          className={`py-2 px-4  ${
            value === 1
              ? "bg-green-500 text-white border-green-500"
              : "text-gray-500 border-gray-300"
          }`}
          onClick={() => changeValue(1)}
        >
          My Challenges
        </button>
        <button
          className={`py-2 px-4 ${
            value === 2
              ? "bg-green-500 text-white border-green-500"
              : "text-gray-500 border-gray-300"
          }`}
          onClick={() => changeValue(2)}
        >
          Followers
        </button>
        <button
          className={`py-2 px-4 ${
            value === 3
              ? "bg-green-500 text-white border-green-500"
              : "text-gray-500 border-gray-300"
          }`}
          onClick={() => changeValue(3)}
        >
          Followings
        </button>

        <button
          className={`py-2 px-4 ${
            value === 4
              ? "bg-green-500 text-white border-green-500"
              : "text-gray-500 border-gray-300"
          }`}
          onClick={() => changeValue(4)}
        >
          {`Feedbacks (${reviews?.length || 0})`}
        </button>
        {userId == user._id ? (
          <button
            className={`py-2 px-4  rounded-tr-lg ${
              value === 5
                ? "bg-green-500 text-white border-green-500"
                : "text-gray-500 border-gray-300"
            }`}
            onClick={() => changeValue(5)}
          >
            {`Bookmarks (${userProfile?.bookmarks.length || 0})`}
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
