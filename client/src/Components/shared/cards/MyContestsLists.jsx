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

  const handleProgress = (card) => {
    if (getDeadlineDifference(card?.deadline) === "0 Days 0 Hours 0 Minutes")
      return false;
    return true;
  };

  useEffect(() => {
    if (!data) return;
    setInProgress(
      data.challenges?.filter((challenge) => handleProgress(challenge))
    );
  }, [data]);

  return (
    <div>
      {inProgress?.length > 0 && (
        <div className="p-4 bg-white border-green-500 border-b-2 rounded-lg shadow-md">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h5 className="text-lg font-medium">My Contests</h5>
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
      )}
    </div>
  );
};

export default MyContestLists;
