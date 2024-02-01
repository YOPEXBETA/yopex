import React, { useState } from "react";
import { Link } from "react-router-dom";
import AvatarProfile from "../../../../../../assets/images/AvatarProfile.jpg";
import { useUnBanUser } from "../../../../../../hooks/react-query/useChallenges";

const RemovedParticipant = ({ user, index, isOwner }) => {
  
  const {mutate,isLoading} = useUnBanUser();

  return (
    <tr
      key={user._id}
      className="hover:bg-gray-50 bg-white dark:bg-zinc-800 overflow-auto"
    >
      <td className=" py-4 px-4 font-bold text-md dark:text-white">
        {index + 1}{" "}
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center">
          <Link
            to={`/profile/${user._id}`}
            className="flex items-center gap-4"
          >
            <div className="">
              {user?.picturePath ? (
                <img
                  alt="picture"
                  src={user?.picturePath}
                  className="hidden md:block w-10 h-10 rounded-full border object-cover"
                />
              ) : (
                <img
                  alt="default"
                  src={AvatarProfile}
                  className="rounded-full object-cover w-10 h-10 border border-gray-200"
                />
              )}
            </div>

            <div className="flex items-center gap-1 dark:text-white">
              <span className="text-sm">{user?.firstname}</span>
              <span className="text-sm">{user?.lastname}</span>
            </div>
          </Link>
        </div>
      </td>
      {isOwner && (
        <td
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="text-lg py-4 px-4 dark:text-white cursor-pointer text-right"
        >
          <button
            className="bg-red-400 hover:bg-red-700 text-white px-2 py-2 rounded"
            type="button"
            disabled={isLoading}
            onClick={() => {mutate({userId: user?._id })}}
          >
            Unremove
          </button>
          
        </td>
      )}
    </tr>
  );
};

export default RemovedParticipant;
