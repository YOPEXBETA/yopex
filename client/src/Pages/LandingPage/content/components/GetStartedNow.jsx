import React from "react";

const GetStartedNow = () => {
  return (
    <div>
      <div className="relative py-16">
        <div
          aria-hidden="true"
          className="absolute inset-0 h-max w-full m-auto grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
        >
          <div className="blur-[106px] dark:hidden h-56 bg-gradient-to-br from-purple-400 to-purple-400 dark:from-blue-700"></div>
          <div className="blur-[106px] dark:hidden h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
          <div className="blur-[106px] hidden dark:block h-56 bg-gradient-to-br from-green-400 to-green-200 dark:from-green-700"></div>
          <div className="blur-[106px] hidden dark:block h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-green-600"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
          <div className="relative">
            <div className="mt-6 m-auto space-y-6 md:w-8/12 lg:w-7/12">
              <h1 className="text-center text-4xl font-bold text-gray-800 dark:text-white md:text-5xl">
                Get Started now
              </h1>
              <p className="text-center text-xl text-gray-600 dark:text-gray-300">
                Join Yopex and be part of our global freelance community
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <a
                  href="/login"
                  className="relative flex h-12 w-full items-center justify-center px-8 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                >
                  <span className="relative text-base text-white font-semibold border-2 border-green-500 py-4 px-8 bg-green-500 rounded-full hover:border-green-700 hover:text-green-700 transition duration-300 ease-in-out transform hover:scale-105">
                    Get Started
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStartedNow;
