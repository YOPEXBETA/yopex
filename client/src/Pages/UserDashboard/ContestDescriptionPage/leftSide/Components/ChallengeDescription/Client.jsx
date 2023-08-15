import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useChallengeById } from "../../../../../../hooks/react-query/useChallenges";

const ClientCard = () => {
  const { id: challengeId } = useParams();
  const { data: challenge } = useChallengeById(challengeId);

  return (
    <div className="border-2 border-gray-100 bg-white p-4 rounded-lg">
      <div className="space-y-3">
        <div className="space-y-4">
          <h4 className="text-xl font-bold">About the client</h4>
          <hr className="border-t border-gray-200" />
        </div>
        <div className="flex flex-row space-x-4 items-center">
          <img
            src={challenge?.company.companyLogo}
            alt="Client Logo"
            className="bg-secondary w-12 h-12 rounded-lg"
          />
          <div className="space-y-1">
            <div className="flex flex-row items-center space-x-1">
              <h5 className="text-lg font-md">
                {challenge?.company.companyName}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientCard;
