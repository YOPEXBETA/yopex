import React from "react";
import { useSelector } from "react-redux";
import { useUserById } from "../../../../hooks/react-query/useUsers";
import { useGetLevels } from "../../../../hooks/react-query/useLevels";

function LinearProgressWithLabel(props) {
  return (
    <div>
      <div spacing={1}>
        <div className="flex flex-col mb-2">
          <div className="flex items-center mb-2">
            <div className="w-full rounded-full bg-zinc-200 border-2 border-gray-200">
              <div
                className="h-[0.35rem] bg-green-500 rounded-full"
                style={{ width: `${(props.value / props.difference) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="flex items-center gap-1 dark:text-gray-200 text-sm">
            <span className="text-sm font-bold dark:text-gray-200">
              Just {props.difference} points away!
            </span>
            <p className="text-sm dark:text-gray-200">Level up in no time</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const LevelLoading = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: userProfile } = useUserById(user._id);
  const { data: levelsData, isloading } = useGetLevels();
  const userLevel = levelsData
    ? levelsData.find(
        (level) =>
          level.minScore <= userProfile?.score &&
          level.maxScore >= userProfile?.score
      )
    : null;

  return (
    <div>
      <LinearProgressWithLabel
        value={userProfile?.score}
        level={userLevel}
        difference={userLevel?.maxScore}
      />
    </div>
  );
};

export default LevelLoading;
