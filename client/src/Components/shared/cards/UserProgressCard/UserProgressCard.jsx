import React from "react";
import { useSelector } from "react-redux";
import AvatarProfile from "../../../../assets/images/AvatarProfile.jpg";
import LevelLoading from "./LevelLoading";

const UserProgressCard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <div className="px-4 py-2 mt-2 lg:mt-0 md:mt-0 divide-gray-100 dark:divide-gray-700 overflow-hidden rounded-2xl border md:border-gray-300 text-gray-600 dark:border-gray-700 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4">
        <div className="flex flex-col space-y-5">
          <div className="flex items-center gap-4">
            {user.picturePath ? (
              <img
                alt="picture"
                src={user.picturePath}
                className="w-20 h-20 rounded-full object-cover border-2"
              />
            ) : (
              <img
                alt="default"
                src={AvatarProfile}
                className="w-20 h-20 rounded-full object-cover border-2"
              />
            )}
            <div className=" space-y-1">
              <p className="text-lg font-md">
                {`${user.firstname} ${user.lastname}`}
              </p>
              <p className="text-md font-md text-zinc-500">{user.country}</p>
            </div>
          </div>

          <LevelLoading />
        </div>
      </div>
    </div>
  );
};

export default UserProgressCard;
