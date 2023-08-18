import React from "react";

const HomeSection = () => {
  return (
    <div id="home">
      <div className="flex items-center justify-center bg-zinc-100 border-gray-500 border-b-2">
        <div className=" flex my-48 mx-4">
          <div className="space-y-8 flex flex-col items-center">
            <div className="space-y-2 flex flex-col items-center">
              <h2 className="text-black text-[2.5rem] font-bold mb-1 ">
                Connect With Fellow Freelancers
              </h2>

              <p className="text-gray-500 text-xl mb-6">
                Take on challenges, apply for jobs, and connect with other
                freelancers in your industry.
              </p>
            </div>
            <a href="/login" className="block">
              <button className=" border-2 border-green-500 py-4 px-8 text-green-500 rounded-lg hover:border-green-700 hover:text-green-700">
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
