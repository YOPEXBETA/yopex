import React from "react";

const FeedbacksCard = ({ review }) => {
  return (
    <div className="bg-white p-4 shadow-md md:rounded-lg space-y-4 dark:bg-zinc-800 dark:border-zinc-500 dark:border dark:text-white border-green-500 border-b-2 ">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={review.companyId.companyLogo}
            alt="Company Logo"
            className="w-16 h-16 rounded-lg"
          />
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold">
              {review.companyId.companyName}
            </h2>
            <div className="text-md text-gray-500">
              {new Date(review.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <span className="text-3xl text-yellow-500">★</span>
          <p className="text-lg">{`${review.star} / 10`}</p>
        </div>
      </div>
      <hr className="h-[1px] bg-gray-200" />
      <div className="space-y-1">
        <p className="text-lg font-md uppercase font-semibold">
          {review.challengeId?.title}
        </p>
        <p
          className={`className="text-md whitespace-normal" ${
            review.star >= 5 ? "text-black" : "text-green-500"
          }`}
        >
          {review.description}
        </p>
      </div>
    </div>
  );
};

export default FeedbacksCard;
