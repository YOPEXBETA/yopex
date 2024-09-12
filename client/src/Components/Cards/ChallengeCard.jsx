import React from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaCheck, FaTimes } from "react-icons/fa";
import getDeadlineDifference from "../getDeadlineDifference";
import { useSelector } from "react-redux";
import Card from "./index";
import ChallengeMenuIcon from "../MenuIcons/ChallengeMenuIcon";
import challengeBanner from "../../assets/images/challengeBanner.jpg";

const ChallengeCard = ({ challenge, type, extra }) => {
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
      <Card extra={`${extra}`}>
      <div>
      <div className="max-w-sm mx-auto overflow-hidden sm:max-w-md md:max-w-lg lg:max-w-xl">
      <div className="relative">
        <img
          className="w-full h-64 object-cover"
          src={
            challenge?.organization?.organizationLogo
              ? challenge.organization.organizationLogo
              : challengeBanner
          }
          alt="Hackathon"
        />
  
      <button
        className={`absolute top-4 left-4 bg-purple-500 text-white text-sm px-2 py-1 rounded ${
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
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-2 dark:text-white text-black">{challenge?.title}</h2>
        <p className="text-sm font-light text-gray-400 mb-6 overflow-hidden whitespace-nowrap text-ellipsis">
          {challenge?.description}
        </p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-400">Organized by</p>
            <p className="text-base dark:text-white text-black">{challenge.organization?.organizationName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Total Prize</p>
            <p className="text-base dark:text-white text-black">{challenge.price > 0 ? `${challenge?.price} pts` : "Free"}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-6">
          <div>
            <p className="text-sm text-gray-400">Open To</p>
            <p className="text-base dark:text-white text-black">Everyone</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Participants</p>
            <p className="text-base dark:text-white text-black">{challenge?.users?.length} | {challenge?.nbruser}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Objective</p>
            <p className="text-base dark:text-white text-black">{challenge?.objective}</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
        <Link to={`/challenges/challengeDetails/${challenge._id}?type=challenge`}>

          <button className="bg-transparent border border-gray-400 text-gray-400 px-4 py-2 rounded hover:bg-gray-700 transition">
            Details
          </button>
        </Link>

          {(user?.organizations?.includes(challenge?.organization?._id) ||
                challenge?.owner === user?._id) && (
                <div onClick={(e) => e.preventDefault()}>
                  <ChallengeMenuIcon challenge={challenge} type="Challenge" />
                </div>
            )}
        </div>
      </div>
    </div>
    </div>
      </Card>
    </div>
  );
};

export default ChallengeCard;
