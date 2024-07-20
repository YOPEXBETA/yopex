import React from "react";
import challengeBanner from "../../assets/images/challengeBanner.jpg";

const ExperienceCard = ({ challenge }) => {
  function formatDate(dateString) {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", options);
  }

  return (
    <div>
      <a href="#" className="flex justify-between items-center">
        <div className="flex gap-4 items-center sm:flex">
          <div className="flex-shrink-0 hidden sm:block">
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
          <div>
            <h5 className="text-md font-bold dark:text-white">
              {challenge?.title}
            </h5>
            <p className="mt-1 text-xs font-medium text-gray-600 dark:text-gray-200">
              By {challenge?.company?.companyName}
            </p>
          </div>
        </div>

        <dl className="flex mt-6">
          <div className="flex flex-col-reverse">
            <dt className="text-sm font-medium text-gray-600">
              {challenge?.deadline && formatDate(challenge?.deadline)}
            </dt>
          </div>
        </dl>
      </a>
    </div>
  );
};

export default ExperienceCard;
