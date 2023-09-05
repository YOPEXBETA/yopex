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
          <h2 className="text-2xl font-semibold">
            {review.companyId.companyName}
          </h2>
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-3xl text-yellow-500">★</span>
          <p className="text-lg">{`${review.star} / 10`}</p>
        </div>
      </div>
      <p className="text-lg text-gray-600">{review.challengeId?.title}</p>

      <p
        className={`text-lg ${
          review.star >= 5 ? "text-green-500" : "text-black"
        }`}
      >
        {review.description}
      </p>
      <div className="flex justify-between items-center">
        <p className="text-xl text-gray-600">
          {new Date(review.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default FeedbacksCard;
