import React from "react";
import { useSelector } from "react-redux";
import { getUserLevelData } from "../../../../utils";
import { useUserById } from "../../../../hooks/react-query/useUsers";
import { useGetLevels } from "../../../../hooks/react-query/useLevels";


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
          <div className=" flex justify-between dark:text-gray-100" >
            <p>PROGRESS</p>
            <div className="text-xs text-center p-0.5 leading-none rounded-full">
              <span className="text-black font-medium dark:text-gray-100">{props.value}</span>/
              <span className="text-black font-medium dark:text-gray-100">{props.difference}</span>
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
  const { data: levelsData , isloading } = useGetLevels();
  const userLevel = levelsData ? levelsData.find((level) => level.minScore <= userProfile?.score && level.maxScore >= userProfile?.score) : null;

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
