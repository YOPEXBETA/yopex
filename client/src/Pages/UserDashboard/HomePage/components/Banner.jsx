import React from "react";

const Banner = () => {
  return (
    <main className="flex  w-full items-center justify-center">
      <article className="group relative flex h-[12rem] w-[50rem] overflow-hidden rounded-2xl bg-indigo-500">
        <div className="absolute inset-y-0 left-0 w-48">
          <img
            src="https://unsplash.it/id/1/640/425"
            alt=""
            className="h-full w-full object-cover object-center opacity-95"
          />

          {/*<div className="invisible absolute inset-0 flex h-full w-full items-center justify-center bg-[#0c0c0c]/70 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
            <svg
              className="h-w-14 w-14 cursor-pointer text-white transition-all hover:text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clip-rule="evenodd"
              ></path>
            </svg>
        </div>*/}
        </div>

        <div className="absolute inset-y-0 left-44 w-[39rem] overflow-hidden rounded-2xl transition-all group-hover:w-[36rem]">
          <div className="h-full w-full bg-cover bg-center">
            <div className="h-full w-full bg-green-500/70 transition-all group-hover:bg-green-500/80"></div>
          </div>

          <section className="absolute inset-0 flex flex-col justify-between p-4 text-white">
            <header className="space-y-1">
              <div className="text-3xl font-medium">Challenge Name</div>
              <div className="font-medium">By Yopex</div>
            </header>

            <div className="flex space-x-3">
              {/*<span className="flex items-center space-x-1">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
                <div>33</div>
      </span>*/}

              {/*<span className="flex items-center space-x-1">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <div>75.7k</div>
    </span>*/}

              <span className="flex items-center space-x-1">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <div>25 Mar 2022</div>
              </span>
            </div>
          </section>
        </div>
      </article>
    </main>
  );
};

export default Banner;
