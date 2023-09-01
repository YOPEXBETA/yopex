import React, { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useGetChallenges } from "../../../../../hooks/react-query/useChallenges";

import getDeadlineDifference from "../../../../../utils/deadlineModif";
import getTimeLeft from "../../../../../utils/getTimeLeft";

const getChallenges = async (userId) => {
  const { data } = await axios.get("http://localhost:8000/user/challenges", {
    params: {
      userId: userId,
    },
    withCredentials: true,
  });
  return data;
};

const MyContestLists = () => {
  const { user } = useSelector((state) => state.auth);
  console.log("user", user);
  const userId = user._id;
  //const { data: Mychallenges, isLoading, error } = useGetChallenges(userId);

  const { data } = useQuery({
    queryKey: ["challenges", user._id],
    queryFn: () => getChallenges(user._id),
  });

  const [inProgress, setInProgress] = useState([]);

  const handleProgress = (card) => {
    if (getDeadlineDifference(card?.deadline) === "0 Days 0 Hours 0 Minutes")
      return false;
    return true;
  };

  // filter out finished challenges
  useEffect(() => {
    if (!data) return;
    setInProgress(
      data.challenges?.filter((challenge) => handleProgress(challenge))
    );
  }, [data]);
  console.log(inProgress);

  return (
    <div>
      {inProgress?.length > 0 && (
        <div className="p-4 bg-white border-green-500 border-b-2 rounded-lg shadow-md">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h5 className="text-lg font-semibold">My Contests</h5>
            </div>
            <hr className="border-t border-gray-300" />
            {inProgress.slice(0, 2).map((user) => (
              <div key={user._id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img
                    className="w-10 h-10 rounded-lg"
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
