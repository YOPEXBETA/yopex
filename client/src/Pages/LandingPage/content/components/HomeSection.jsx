import React from "react";
import AiPicture from "../../../../assets/images/AiPicture.png";
import MovieTexture from "../../../../assets/images/MovieTexture.jpg";

const HomeSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-green-900 to-black py-96 overflow-hidden">
    {/* Decorative Gradient Elements */}
    <div className="absolute top-0 left-0 transform -translate-x-1/6 -translate-y-1/2 w-[55rem] h-[11rem] bg-gradient-to-br from-green-700 to-green-900 rounded-full"></div>
    <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/3 w-[50rem] h-[50rem] bg-gradient-to-tr from-green-200 to-green-800 opacity-80 rounded-full"></div>

    {/* Futuristic Shapes */}
    <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-gradient-to-br from-green-700 to-white opacity-60 rounded-full mix-blend-lighten transform rotate-45"></div>
    <div className="absolute top-3/4 left-1/3 w-32 h-32 bg-gradient-to-bl from-green-700 to-white opacity-40 rounded-full mix-blend-lighten"></div>
    <div className="absolute bottom-1/4 left-1/5 w-36 h-36 bg-gradient-to-t from-green-700 to-white opacity-20 rounded-full mix-blend-lighten"></div>


    {/* Content Section */}
    <div className="px-4 lg:pl-24 md:pl-24 relative z-10">
      <div className="flex flex-col lg:flex-row justify-between items-center">
        {/* Content */}
        <div className="absolute  lg:w-1/2 transform -translate-x-0 -translate-y-0 lg:text-left">
          <h1 className="text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-orange-500">
           Where Talent Meets <br /> Opportunity.
          </h1>
          <p className="mt-6 text-lg text-white lg:max-w-xl">
            Join the most vibrant student community where learning meets
            competition. Start your journey to enhance skills and stand out at hackathons!
          </p>
          <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <a
              href="/login"
              className="mt-6 px-6 py-3 text-lg text-white bg-orange-500 rounded-lg hover:bg-orange-600">
              Get Started
            </a>
          </div>
        </div>

        {/* Image Section */}
        <div className="absolute hidden md:hidden lg:block top-16 right-0 transform -translate-x-0 -translate-y-1/2">
          <img
            src={AiPicture}
            className="relative z-10 h-[47rem] w-[47rem]"
            alt="Illustration"
          />
        </div>
      </div>
    </div>
  </div>
  );
};

export default HomeSection;
