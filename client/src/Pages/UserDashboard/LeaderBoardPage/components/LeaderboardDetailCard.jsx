import React from "react";
import { Link } from "react-router-dom";
import AvatarProfile from "../../../../assets/images/AvatarProfile.jpg";
import { useGetLevels } from "../../../../hooks/react-query/useLevels";

const LeaderboardDetailCard = ({ data }) => {
  const { data: levelsData, isloading } = useGetLevels();
  const userLevel = levelsData
    ? levelsData.find(
        (level) =>
          level.minScore <= data?.score && level.maxScore >= data?.score
      )
    : null;

  if (!data) {
    return (
      <div className="bg-white dark:text-white dark:bg-zinc-800 font-semibold text-center rounded-lg border dark:border-zinc-500 p-10 xl:max-w-md w-full">
        No user selected.
      </div>
    );
  }
  return (
    <div>
      <div className="bg-white dark:bg-zinc-800 text-center rounded-lg border p-10 xl:max-w-md w-full flex flex-col items-center dark:border-zinc-500">
        <div className="relative mb-4">
          <Link to={`/profile/${data?._id}`}>
            <div>
              {data?.picturePath ? (
                <img
                  alt="picture"
                  src={data?.picturePath}
                  className="object-cover rounded-full w-36 h-36 border-4 border-green-500"
                />
              ) : (
                <img
                  alt="default"
                  src={AvatarProfile}
                  className="object-cover rounded-full w-36 h-36 border-4 border-green-500"
                />
              )}
            </div>
          </Link>
          <div className="absolute bottom-0 right-0">
            <div className="flex items-center justify-center rounded-full bg-green-500 w-11 h-11 text-white">
              {"LV " + parseInt(userLevel?.name.replace("Level ", ""))}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 truncate w-80">
          <div>
            <h1 className="text-lg text-gray-700 dark:text-white font-bold">
              {data?.firstname} {data?.lastname}
            </h1>
            <p className="whitespace-normal dark:text-gray-200 text-gray-400">
              {data?.occupation || "No occupation selected"}
            </p>
          </div>
          <Link to={`/profile/${data?._id}`}>
            <button className="bg-green-500 px-8 py-2 mt-3 rounded-3xl text-gray-100 font-medium tracking-wide">
              View Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardDetailCard;
