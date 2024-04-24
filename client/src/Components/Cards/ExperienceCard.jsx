import React from "react";
import { useSelector } from "react-redux";
import getDeadlineDifference from "../getDeadlineDifference";
import challengeBanner from "../../assets/images/challengeBanner.jpg";

const ExperienceCard = ({ challenge, type, extra }) => {
  const { user } = useSelector((state) => state.auth);
  console.log(challenge);
  const isChallengeInProgress = (challenge) => {
    if (
      getDeadlineDifference(challenge?.deadline) === "0 Days 0 Hours 0 Minutes"
    )
      return false;
    return true;
  };
  return (
    <div>
      <a href="#">
        <div className="justify-between sm:flex">
          <div>
            <h5 className="text-xl font-bold text-slate-900 dark:text-white">
              {challenge?.title}
            </h5>
            <p className="mt-1 text-xs font-medium text-slate-600">
              By Ana Doe
            </p>
          </div>

          <div className="flex-shrink-0 hidden ml-3 sm:block">
            <img
              className="object-cover w-16 h-16 rounded-lg shadow-sm border"
              src={
                challenge?.company?.companyLogo
                  ? challenge?.company.companyLogo
                  : challengeBanner
              }
              alt=""
            />
          </div>
        </div>

        <dl className="flex mt-6">
          <div className="flex flex-col-reverse">
            <dt className="text-sm font-medium text-slate-600">Published</dt>
            <dd className="text-xs text-slate-500">31st June, 2022</dd>
          </div>

          <div className="flex flex-col-reverse ml-3 sm:ml-6">
            <dt className="text-sm font-medium text-slate-600">Reading time</dt>
            <dd className="text-xs text-slate-500">5 minutes</dd>
          </div>
        </dl>
      </a>
    </div>
  );
};

export default ExperienceCard;
