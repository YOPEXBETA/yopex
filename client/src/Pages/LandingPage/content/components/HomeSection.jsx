import React from "react";

const HomeSection = () => {
  return (
    <div id="home" className="relative pt-32 dark:bg-zinc-800">
      <div className="flex items-center justify-center bg-white dark:bg-zinc-800 border-gray-500 relative">
        <div
          aria-hidden="true"
          className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-10"
        >
          <div className="blur-[106px] dark:hidden h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
          <div className="blur-[106px] dark:hidden h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
         
        </div>
       
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
          <div classNameName="relative pt-36 ml-auto">
            <div className="lg:w-2/3 text-center mx-auto">
              <h1 className="text-gray-900 dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">
                Connect With Fellow
                <span className="text-green-500 dark:text-green-500">
                  {" "}
                  Freelancers.
                </span>
              </h1>
              <p className="mt-8 text-gray-700 dark:text-gray-300">
                Embark on a Journey of Opportunities: Seize Exciting Challenges,
                Apply for a Myriad of Job Openings, and Forge Valuable
                Connections with Fellow Freelancers in Your Thriving Industry.
                Your Next Adventure Awaits
              </p>
              <div className="mt-16 flex flex-wrap justify-center gap-y-4">
                <a
                  href="/login"
                  className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                >
                  <span className="relative text-base text-white font-semibold border-2 border-green-500 py-4 px-8 bg-green-500 rounded-full hover:border-green-700 hover:text-green-700 transition duration-300 ease-in-out transform hover:scale-105">
                    Get started
                  </span>
                </a>
              </div>
            </div>
            {/* <div className="mt-12 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6">
              <div className="p-4 grayscale transition duration-200 hover:grayscale-0">
                <img
                  src="./images/clients/microsoft.svg"
                  className="h-12 w-auto mx-auto"
                  loading="lazy"
                  alt="client logo"
                  width=""
                  height=""
                />
              </div>
              <div className="p-4 grayscale transition duration-200 hover:grayscale-0">
                <img
                  src="./images/clients/airbnb.svg"
                  className="h-12 w-auto mx-auto"
                  loading="lazy"
                  alt="client logo"
                  width=""
                  height=""
                />
              </div>
              <div className="p-4 flex grayscale transition duration-200 hover:grayscale-0">
                <img
                  src="./images/clients/google.svg"
                  className="h-9 w-auto m-auto"
                  loading="lazy"
                  alt="client logo"
                  width=""
                  height=""
                />
              </div>
              <div className="p-4 grayscale transition duration-200 hover:grayscale-0">
                <img
                  src="./images/clients/ge.svg"
                  className="h-12 w-auto mx-auto"
                  loading="lazy"
                  alt="client logo"
                  width=""
                  height=""
                />
              </div>
              <div className="p-4 flex grayscale transition duration-200 hover:grayscale-0">
                <img
                  src="./images/clients/netflix.svg"
                  className="h-8 w-auto m-auto"
                  loading="lazy"
                  alt="client logo"
                  width=""
                  height=""
                />
              </div>
              <div className="p-4 grayscale transition duration-200 hover:grayscale-0">
                <img
                  src="./images/clients/google-cloud.svg"
                  className="h-12 w-auto mx-auto"
                  loading="lazy"
                  alt="client logo"
                  width=""
                  height=""
                />
              </div>
</div>*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
