import React from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaCheck, FaTimes } from "react-icons/fa";
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

  return (
    <div>
      <Link to={`/browse/contestDetails/${challenge._id}`}>
        <div
          className={`w-full h-full flex-col lg:h-40 border-b-2 gap-6 dark:bg-zinc-800 dark:border-zinc-500 dark:border overflow-hidden bg-white md:flex-row lg:pr-11 rounded-lg hover:shadow-xl divide-gray-100 dark:divide-gray-700 md:rounded-lg flex`}
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
              <h5 className="text-lg font-semibold dark:text-white">
                {challenge.title}
              </h5>

              {user?.companies?.includes(challenge?.company._id) ? (
                <div onClick={(e) => e.preventDefault()}>
                  <ChallengeMenuIcon challenge={challenge} />
                </div>
              ) : (
                <p></p>
              )}
            </div>

            <p></p>

            <div className="flex items-center justify-between gap-2 pb-4">
              <p className="truncate w-[35rem] dark:text-white">
                {challenge.description}
              </p>
            </div>

            <div className="flex flex-wrap justify-between pb-8">
              <div className="flex items-center justify-start gap-2">
                <div>
                  <FaUsers size={20} className="dark:text-white" />
                </div>
                <div className="flex gap-1">
                  <p className="font-bold dark:text-white">
                    {challenge.users.length}
                  </p>
                  <div className="dark:text-white">/</div>
                  <p className="font-bold dark:text-white">
                    {challenge.nbruser}
                  </p>
                  <p className="dark:text-white">Participants</p>
                </div>
              </div>

              <div className="flex items-center justify-start gap-2">
                {challenge.price > 0 ? (
                  <div className="flex gap-1">
                    <p className="font-bold dark:text-white">
                      {challenge.price}
                    </p>
                    <p className="dark:text-white">Paid Entry</p>
                  </div>
                ) : (
                  <p className="font-bold dark:text-white">Free Entry</p>
                )}
              </div>

              <div className="flex items-center justify-start gap-2">
                <button
                  className={`${
                    isChallengeInProgress(challenge)
                      ? "text-green-500 font-bold"
                      : "text-red-500 font-bold"
                  } p-0`}
                >
                  {isChallengeInProgress(challenge) ? (
                    <div className="flex items-center gap-1">
                      <FaCheck size={20} />
                      <p>In Progress</p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <FaTimes size={20} />
                      <p>Finished</p>
                    </div>
                  )}
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
