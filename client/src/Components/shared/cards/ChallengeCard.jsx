import React from "react";
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import { Rating } from "@mui/material";
import getDeadlineDifference from "./../../getDeadlineDifference";
import ChallengeMenuIcon from "../../../Pages/UserDashboard/CompanyPage/ContentSide/Components/MyChallenges/Components/ChallengeMenuIcon";
import { useSelector } from "react-redux";

const ChallengeCard = ({ challenge, type }) => {

  const { user } = useSelector((state) => state.auth);

  const isChallengeInProgress = (challenge) => {
    if (
      getDeadlineDifference(challenge?.deadline) === "0 Days 0 Hours 0 Minutes"
    )
      return false;
    return true;
  };
  console.log(challenge.company);

  return (
    <div>
      <Link to={`/browse/contestDetails/${challenge._id}`}>
        <div
          className={`w-full h-full flex-col lg:h-40 border-b-2 gap-6 bg-white md:flex-row lg:pr-11 shadow-md border-green-500 md:rounded-lg flex`}
        >
          <div className="w-full xl:w-[30%]">
            <img
              className={`h-full xl:h-30 md:h-40 w-screen md:rounded-l-lg object-cover lg:block`}
              src={challenge.company?.companyLogo}
              alt="picture"
            />
          </div>
          <div className="flex w-full flex-col justify-between xl:w-[70%] lg:px-0 px-4">
            <div className="py-4 pb-4 flex justify-between items-center">

              <h5 className="text-lg font-semibold">{challenge.title}</h5>
          
                {user?.companies?.includes(challenge?.company._id) ? (
               
                <div onClick={(e)=> e.preventDefault()}>
                <ChallengeMenuIcon post={challenge} />
                </div>
              ) : (
                <p></p>
              )}
            </div>

           
               
          
                <p></p>
          

            <div className="flex items-center justify-between gap-2 pb-4">
              <p className="truncate w-96">{challenge.description}</p>
            </div>

            <div className="flex flex-wrap justify-between pb-8">
              <div className="flex items-center justify-start gap-2">
                <div className="flex gap-1">
                  <p className="font-bold">{challenge.users.length}</p>
                  <p>Participants</p>
                </div>
              </div>

              <div className="flex items-center justify-start gap-2">
                <div className="text-sm capitalize text-opacity-75 font-bold text-green-500">
                  {challenge.price} Points
                </div>
              </div>
              <div className="flex items-center justify-start gap-2">
                <button
                  className={`${
                    isChallengeInProgress(challenge)
                      ? "text-green-500"
                      : "text-red-500"
                  } p-0`}
                >
                  {isChallengeInProgress(challenge)
                    ? "In Progress"
                    : "Finished"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ChallengeCard;
