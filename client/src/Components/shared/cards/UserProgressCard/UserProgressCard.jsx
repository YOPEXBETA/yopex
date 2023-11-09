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
      <div className="p-4 bg-white divide-gray-100 overflow-hidden shadow-md rounded-lg dark:bg-zinc-800 dark:border-zinc-500 dark:border text-gray-600 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4">
        <div className="flex flex-col space-y-5">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="border-4 border-green-500 rounded-full overflow-hidden">
                {user?.picturePath ? (
                  <img
                    alt="picture"
                    src={user?.picturePath}
                    className="object-cover w-32 h-32"
                  />
                ) : (
                  <img
                    alt="default"
                    src={AvatarProfile}
                    className="object-cover w-32 h-32"
                  />
                )}
              </div>
              <div className="absolute bottom-0 right-0">
                <div className="flex items-center justify-center rounded-full bg-green-500 w-11 h-11 text-white">
                  {"LV " + parseInt(userLevel?.name.replace("Level ", ""))}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <p className="text-lg font-md dark:text-white font-bold">
                {`${user?.firstname} ${user?.lastname}`}
              </p>
              <p className="text-md font-md dark:text-gray-100">
                {user?.occupation}
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
