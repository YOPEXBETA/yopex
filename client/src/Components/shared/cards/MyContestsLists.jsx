import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetChallenges } from "../../../hooks/react-query/useChallenges";
import getDeadlineDifference from "../../../utils/deadlineModif";
import getTimeLeft from "../../../utils/getTimeLeft";

const MyContestLists = () => {
  const { user } = useSelector((state) => state.auth);
  const userId = user._id;
  const { data } = useGetChallenges(userId);
  const [inProgress, setInProgress] = useState([]);

  useEffect(() => {
    if (!data) return;

    const filteredChallenges = data.challenges?.filter(
      (challenge) =>
        getDeadlineDifference(challenge?.deadline) ===
        "0 Days 0 Hours 0 Minutes"
    );

    setInProgress(filteredChallenges);
  }, [data]);

  if (inProgress?.length === 0) {
    return null;
  }

  return (
    <div className="p-4 divide-gray-100 dark:text-white dark:divide-gray-700 overflow-hidden rounded-lg border bg-white dark:bg-zinc-800 text-gray-600 dark:border-gray-700 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4">
      <div className="space-y-2">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-xl font-bold dark:text-gray-200">Contests</h4>
        </div>
        {inProgress.slice(0, 2).map((user) => (
          <div key={user._id} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img
                className="w-10 h-10 rounded-lg object-cover"
                src={user.company.companyLogo}
                alt="Company Logo"
              />
              <div className="space-y-1">
                <h6 className="text-md font-bold">
                  {user?.company.companyName}
                </h6>
                <p className="text-xs text-primary">
                  {getTimeLeft(user.deadline)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyContestLists;
