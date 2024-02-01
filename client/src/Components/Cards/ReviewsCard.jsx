import React from "react";
import { FaStar } from "react-icons/fa";
import Card from "./index";
import AvatarProfile from "../../assets/images/AvatarProfile.jpg";


const ReviewsCard = ({ extra, review }) => {
  console.log(review);
  return (
    <Card extra={`p-8 ${extra}`}>
      <div className="w-full flex justify-start items-start flex-col">
        <div className="flex flex-col md:flex-row justify-between w-full">
          <div className="flex flex-row justify-between items-start">
            <p className="text-xl md:text-2xl font-medium leading-normal text-gray-800 dark:text-white whitespace-normal">
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
          <p className="mt-3 text-base leading-normal text-gray-600 dark:text-white w-full md:w-9/12 xl:w-5/6">
            {review.description}
          </p>
          {/*
          <div className="hidden md:flex mt-6 flex-row justify-start items-start space-x-4">
            <div>
              <img
                src="https://i.ibb.co/QXzVpHp/vincent-wachowiak-8g-Cm-EBVl6a-I-unsplash-1.png"
                alt="chair-1"
              />
            </div>
            <div>
              <img
                src="https://i.ibb.co/znYKsbc/vincent-wachowiak-z-P316-KSOX0-E-unsplash-1.png"
                alt="chair-2"
              />
            </div>
            <div className="hidden md:block">
              <img
                src="https://i.ibb.co/QXzVpHp/vincent-wachowiak-8g-Cm-EBVl6a-I-unsplash-1.png"
                alt="chair-3"
              />
            </div>
            <div className="hidden md:block">
              <img
                src="https://i.ibb.co/znYKsbc/vincent-wachowiak-z-P316-KSOX0-E-unsplash-1.png"
                alt="chair-4"
              />
            </div>
          </div>
          <div
            className="md:hidden carousel pt-8 cursor-none"
            data-flickity='{ "wrapAround": true,"pageDots": false }'
          >
            <div className="carousel-cell">
              <div className="md:w-full h-full relative">
                <img
                  src="https://i.ibb.co/znYKsbc/vincent-wachowiak-z-P316-KSOX0-E-unsplash-1.png"
                  alt="shoes"
                  className="w-full h-full object-fit object-cover"
                />
              </div>
            </div>
            <div className="carousel-cell">
              <div className="md:w-full h-full relative">
                <img
                  src="https://i.ibb.co/QXzVpHp/vincent-wachowiak-8g-Cm-EBVl6a-I-unsplash-1.png"
                  alt="wallet"
                  className="w-full h-full object-fit object-cover"
                />
              </div>
            </div>
            <div className="carousel-cell">
              <div className="md:w-full h-full relative">
                <img
                  src="https://i.ibb.co/znYKsbc/vincent-wachowiak-z-P316-KSOX0-E-unsplash-1.png"
                  alt="wallet"
                  className="w-full h-full object-fit object-cover"
                />
              </div>
            </div>
            <div className="carousel-cell">
              <div className="md:w-full h-full relative">
                <img
                  src="https://i.ibb.co/QXzVpHp/vincent-wachowiak-8g-Cm-EBVl6a-I-unsplash-1.png"
                  alt="wallet"
                  className="w-full h-full object-fit object-cover"
                />
              </div>
            </div>
            <div className="carousel-cell">
              <div className="md:w-full h-full relative">
                <img
                  src="https://i.ibb.co/znYKsbc/vincent-wachowiak-z-P316-KSOX0-E-unsplash-1.png"
                  alt="wallet"
                  className="w-full h-full object-fit object-cover"
                />
              </div>
            </div>
            <div className="carousel-cell"></div>
          </div>
            */}
          <div className="mt-6 flex justify-start items-center flex-row space-x-2.5">
            <div>
              <img
                src={review.companyId?.companyLogo || review.challengeOwnerId?.picturePath || AvatarProfile}
                
                className="rounded-full h-11 w-11 object-cover"
              />
            </div>
            <div className="flex flex-col justify-start items-start space-y-2">
              <p className="text-base font-medium leading-none text-gray-800 dark:text-white">
                {review.companyId?.companyName}
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
