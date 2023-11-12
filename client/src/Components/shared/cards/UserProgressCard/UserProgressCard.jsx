import React from "react";
import { useSelector } from "react-redux";
import { useGetLevels } from "../../../../hooks/react-query/useLevels";
import AvatarProfile from "../../../../assets/images/AvatarProfile.jpg";
import LevelLoading from "./LevelLoading";

const UserProgressCard = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: levelsData, isloading } = useGetLevels();

  const userLevel = levelsData
    ? levelsData.find(
        (level) =>
          level.minScore <= user?.score && level.maxScore >= user?.score
      )
    : null;

  return (
    <div>
      <div className="p-4 bg-white divide-gray-100 overflow-hidden  rounded-lg dark:bg-zinc-800 dark:border-zinc-500 dark:border text-gray-600 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4">
        <div className="flex flex-col space-y-5">
          <div aria-label="avatar" className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="border-4 border-green-500 rounded-full overflow-hidden">
                {user?.picturePath ? (
                  <img
                    alt="picture"
                    src={user?.picturePath}
                    className="object-cover w-28 h-28"
                  />
                ) : (
                  <img
                    alt="default"
                    src={AvatarProfile}
                    className="object-cover w-28 h-28"
                  />
                )}
              </div>

              <div className="absolute bottom-0 right-0">
                <div className="flex items-center justify-center rounded-full bg-green-500 w-8 h-8 text-white">
                  {parseInt(userLevel?.name.replace("Level ", ""))}
                </div>
              </div>
            </div>
            <div className="space-y-2 flex flex-col flex-1 truncate">
              <div className="font-medium relative text-xl leading-tight text-gray-900">
                <span className="flex">
                  <span className="truncate relative pr-8 dark:text-white">
                    {`${user?.firstname} ${user?.lastname}`}
                  </span>
                </span>
              </div>
              <p className="font-normal text-base leading-tight text-gray-500 truncate">
                {user?.email}
              </p>
            </div>
          </div>

          <LevelLoading />
        </div>
      </div>
    </div>
  );
};

export default UserProgressCard;
