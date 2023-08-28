import React from "react";
import StarIcon from "@mui/icons-material/Star";
import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
import getDeadlineDifference from "./../../getDeadlineDifference";

const ChallengeCard = ({ challenge }) => {
  const isChallengeInProgress = (challenge) => {
    if (
      getDeadlineDifference(challenge?.deadline) === "0 Days 0 Hours 0 Minutes"
    )
      return false;
    return true;
  };

  return (
    <div>
      <Link to={`/browse/contestDetails/${challenge._id}`}>
        <div className="shadow-md border-green-500 border-b-2 rounded-lg flex hover:scale-105">
          <img
            src={challenge.company?.companyLogo}
            className="object-cover  bg-gray-400 h-40 w-40"
          />
          <div>
            <div className=" p-5">
              <div className="space-y-4">
                <div>
                  <h5 className=" text-lg font-semibold mb-2">
                    {challenge.title}
                  </h5>
                  <p className="truncate w-96">{challenge.description}</p>
                </div>

                <div className=" flex items-end gap-4">
                  <div className="flex items-end">
                    <Rating
                      name={`rating-${challenge._id}`}
                      value={challenge.totatlStars}
                      precision={0.5}
                      readOnly
                      icon={<StarIcon />}
                    />
                    <p>({challenge.totalStars})</p>
                  </div>

                  <div className="flex gap-1">
                    <p className="text-green-500 font-bold">
                      {challenge.price} XP
                    </p>
                    <p className="text-green-500">Prize</p>
                  </div>
                  <div className="flex gap-1">
                    <p className="font-bold">{challenge.users.length}</p>
                    <p>Participants</p>
                  </div>
                  <button
                    className={`${
                      isChallengeInProgress(challenge)
                        ? "text-green-500"
                        : "text-red-500"
                    }  p-0`}
                  >
                    {isChallengeInProgress(challenge)
                      ? "In Progress"
                      : "Finished"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ChallengeCard;
