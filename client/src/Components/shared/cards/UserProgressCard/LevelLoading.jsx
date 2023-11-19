import React from "react";
import { useSelector } from "react-redux";
import { useUserById } from "../../../../hooks/react-query/useUsers";
import { useGetLevels } from "../../../../hooks/react-query/useLevels";
import LoadingSpinner from "../../../LoadingSpinner";

function LinearProgressWithLabel(props) {
  return (
    <div>
      <div spacing={1}>
        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <div className="w-full rounded-full bg-zinc-200 border-2 border-gray-200">
              <div
                className="h-[0.35rem] bg-green-500 rounded-full"
                style={{ width: `${(props.value / props.difference) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-medium text-green-500">Level {props.level}</p>
            <div className="flex items-center">
              <span className="font-medium text-sm text-green-500">
                {props.value}
              </span>
              <span className="font-medium text-sm text-gray-500">/</span>
              <span className="font-medium text-sm text-gray-500">
                {props.difference}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const LevelLoading = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: userProfile } = useUserById(user._id);
  const { data: levelsData, isLoading } = useGetLevels();
  const userLevel = levelsData
    ? levelsData.find(
        (level) =>
          level.minScore <= userProfile?.score &&
          level.maxScore >= userProfile?.score
      )
    : null;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
      <div className="cursor-pointer text-sm leading-5 w-full ">
        <LinearProgressWithLabel
          value={userProfile?.score}
          level={userLevel?.name.replace("Level ", "")}
          difference={userLevel?.maxScore}
        />
      </div>
    </div>
  );
};

export default LevelLoading;
