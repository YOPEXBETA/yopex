import React from "react";

const HomeSection = () => {
  return (
    <div id="home">
      <div className="flex items-center justify-center bg-white dark:bg-zinc-800 border-gray-500 border-b-[1px] relative overflow-hidden">
        <div className="flex my-48 mx-4">
          <div className="space-y-8 flex flex-col items-center">
            <div className="space-y-2 flex flex-col items-center">
              <h2 className="text-black text-[2.5rem] dark:text-white font-bold mb-1">
                Connect With Fellow Freelancers
              </h2>

              <p className="text-gray-500 text-xl mb-6 dark:text-white">
                Take on challenges, apply for jobs, and connect with other
                freelancers in your industry.
              </p>
            </div>
            <a href="/login" className="block">
              <button className="border-2 border-green-500 py-4 px-8 dark:bg-green-500 dark:text-white text-green-500 rounded-lg dark:hover:bg-green-600  hover:text-green-700 transition duration-300 ease-in-out transform hover:scale-105">
                GET STARTED
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
