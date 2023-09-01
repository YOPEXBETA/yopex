import React from "react";
import { useParams } from "react-router-dom";
import getDeadlineDifference from "../../utils/deadlineModif";
import { useChallengeById } from "../../hooks/react-query/useChallenges";
import { useSelector } from "react-redux";

const ChallengeNavigationTab = ({ value, changeValue }) => {
  const { id: challengeId } = useParams();

  const { data: challenge } = useChallengeById(challengeId);
  const { user } = useSelector((state) => state.auth);

  const isOwner = user.companies.find(
    (company) => company === challenge.company._id
  )
    ? true
    : false;

  const handleProgress = (card) => {
    if (getDeadlineDifference(card?.deadline) === "0 Days 0 Hours 0 Minutes")
      return true;
    return false;
  };

  return (
    <div className="w-full">
      <div className="border-b border-divider">
        <ul className="flex">
          <li
            className={`cursor-pointer px-4 py-2 ${
              value === 0 ? "bg-green-500 text-white" : "text-green-500"
            }`}
            onClick={() => changeValue(0)}
          >
            Description
          </li>
          <li
            className={`cursor-pointer px-4 py-2 ${
              value === 1 ? "bg-green-500 text-white" : "text-green-500"
            }`}
            onClick={() => changeValue(1)}
          >
            Participants
          </li>
          {isOwner && handleProgress(challenge) && !challenge?.winner && (
            <li
              className="cursor-pointer px-4 py-2 ml-auto font-semibold uppercase text-red-500 border border-red-500"
              onClick={() => changeValue(2)}
            >
              Choose Winner
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ChallengeNavigationTab;
