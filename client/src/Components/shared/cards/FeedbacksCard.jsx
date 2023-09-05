import React from "react";

const FeedbacksCard = ({ review }) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg space-y-4 border-green-500 border-b-2 ">
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
      {/*<p className="text-lg text-gray-600">{review.challengeId?.title}</p>*/}
      <p
        className={`text-lg truncate w-96 ${
          review.star >= 5 ? "text-gray-500" : "text-green-500"
        }`}
      >
        {review.description}
      </p>
    </div>
  );
};

export default FeedbacksCard;
