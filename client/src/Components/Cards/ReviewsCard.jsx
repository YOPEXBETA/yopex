import React from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Card from "./index";
import AvatarProfile from "../../assets/images/AvatarProfile.jpg";

const ReviewsCard = ({ extra, review }) => {
  const navigate = useNavigate();
  console.log(review);
  return (
    <Card
      extra={`p-8 ${extra}`}
      onClick={() => {
        if (review && review.companyId && review.companyId._id) {
          navigate(`/company/${review.companyId._id}`);
        } else {
          navigate(`/profile/${review.challengeOwnerId._id}`);
        }
      }}
    >
      <div className="w-full flex justify-start items-start flex-col">
        <div className="flex flex-col md:flex-row justify-between w-full">
          <div className="flex flex-row justify-between items-start">
            <p className="text-xl md:text-2xl font-bold leading-normal text-gray-800 dark:text-white whitespace-normal">
              {review.challengeId?.title}
            </p>
          </div>

          <button className="flex items-center gap-1">
            <span className="text-lg font-semibold dark:text-yellow-300 ">
              {review.star}
            </span>
            <FaStar className="text-yellow-400 dark:text-yellow-300 w-[1.125rem] h-[1.125rem]" />
          </button>
        </div>
        <div id="menu" className="md:block">
          <p className="mt-3 text-base leading-normal text-gray-600 dark:text-white w-full">
            {review.description}
          </p>

          <div className="mt-6 flex justify-start items-center flex-row space-x-2.5">
            <div>
              <img
                src={
                  review.companyId?.companyLogo ||
                  review.challengeOwnerId?.picturePath ||
                  AvatarProfile
                }
                className="rounded-full h-11 w-11 object-cover"
              />
            </div>
            <div className="flex flex-col justify-start items-start space-y-2">
              <p className="text-base font-medium leading-none text-gray-800 dark:text-white">
                {review.companyId?.companyName ||
                  review.challengeOwnerId?.firstname +
                    " " +
                    review.challengeOwnerId?.lastname}
              </p>
              <p className="text-sm leading-none text-gray-600 dark:text-white">
                {new Date(review.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ReviewsCard;
