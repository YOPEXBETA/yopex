import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useUserChallenges } from "../../../../../hooks/react-query/useUsers";
import getDeadlineDifference from "../../../../../utils/deadlineModif";

const CompletedChallenges = () => {
  const { user } = useSelector((state) => state?.auth);
  const { data } = useUserChallenges(user?._id);

  const handleProgress = (card) => {
    if (getDeadlineDifference(card?.deadline) === "0 Days 0 Hours 0 Minutes")
      return false;
    return true;
  };

  const completed = useMemo(() => {
    let counter = 0;
    if (data) {
      data.challenges?.forEach((item) => {
        if (!handleProgress(item)) {
          counter++;
        }
      });
    }
    return counter;
  }, [data]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="text-medium text-gray-500 dark:text-gray-200">
          {" "}
          Completed Challenges
        </div>
        <div className="text-xl font-bold dark:text-gray-300">{completed}</div>
      </div>
    </div>
  );
};

export default CompletedChallenges;
