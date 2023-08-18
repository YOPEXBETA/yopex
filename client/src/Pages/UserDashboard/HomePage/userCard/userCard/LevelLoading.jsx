import React from "react";
import { useSelector } from "react-redux";
import { getUserLevelData } from "../../../../../utils";
import { useUserById } from "../../../../../hooks/react-query/useUsers";

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
          <div className=" flex justify-between">
            <p>PROGRESS</p>
            <div className="text-xs text-center p-0.5 leading-none rounded-full">
              <span className="text-black font-medium">{props.value}</span>/
              <span className="text-black font-medium">{props.difference}</span>
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

  const { level, percentage, difference } = getUserLevelData(
    userProfile?.score || 0
  );
  return (
    <div>
      <LinearProgressWithLabel
        value={percentage}
        level={level}
        difference={difference}
      />
    </div>
  );
};

export default LevelLoading;
