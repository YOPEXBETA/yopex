import React from "react";
import { TypeAnimation } from "react-type-animation";
import LoadingSpinner from "../../../../Components/LoadingSpinner";
import { useStat } from "../../../../hooks/react-query/useUsers";

const HomeSection = () => {
  const { data, isLoading } = useStat();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div
      id="home"
      className="relative overflow-hidden bg-indigo-600 pt-[120px] md:pt-[130px] lg:pt-[160px]"
    >
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4">
            <div
              className="hero-content wow fadeInUp mx-auto max-w-[780px] text-center"
              data-wow-delay=".2s"
            >
              <h1 className="mb-6 text-3xl font-bold leading-snug text-white sm:text-4xl sm:leading-snug lg:text-5xl lg:leading-[1.2]">
                Matching Top Talents With Business Owners
              </h1>
              <p className="mx-auto mb-9 max-w-[600px] text-base text-white sm:text-lg sm:leading-[1.44]">
                Tackle exciting challenges, apply for numerous job openings, and
                join the Yopex community in your thriving industry. Your next
                adventure awaits!
              </p>
              <ul className="mb-10 flex flex-wrap items-center justify-center gap-5">
                <li>
                  <a
                    href="/login"
                    className="inline-flex items-center justify-center rounded-md hover:bg-green-600 bg-green-500 text-white px-7 py-[14px] text-center text-base font-medium text-dark shadow-1 transition duration-300 ease-in-out hover:bg-gray-2 hover:text-body-color"
                  >
                    REGISTER TODAY
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full px-4">
            <div>
              <span className="absolute left-0 top-0">
                <svg
                  width="495"
                  height="470"
                  viewBox="0 0 495 470"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="446"
                    r="39"
                    stroke="white"
                    stroke-opacity="0.04"
                    stroke-width="20"
                  />
                  <path
                    d="M245.406 137.609L233.985 94.9852L276.609 106.406L245.406 137.609Z"
                    stroke="white"
                    stroke-opacity="0.08"
                    stroke-width="12"
                  />
                </svg>
              </span>
              <span className="absolute left-0 bottom-0"></span>
              <span className="absolute bottom-0 right-0">
                <svg
                  width="493"
                  height="470"
                  viewBox="0 0 493 470"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="49"
                    cy="470"
                    r="39"
                    stroke="white"
                    stroke-opacity="0.04"
                    stroke-width="20"
                  />
                  <path
                    d="M222.393 226.701L272.808 213.192L259.299 263.607L222.393 226.701Z"
                    stroke="white"
                    stroke-opacity="0.06"
                    stroke-width="13"
                  />
                </svg>
              </span>
            </div>
            <div class="py-6 sm:py-6">
              <div class="mx-auto max-w-7xl px-6 lg:px-8">
                <div class="mx-auto max-w-2xl lg:max-w-none">
                  <dl class="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
                    <div class="flex flex-col bg-white/5 p-8">
                      <dt class=" text-md font-medium leading-6 text-gray-300">
                        Registered users
                      </dt>
                      <dd class="order-first text-3xl font-semibold tracking-tight text-white">
                        {data?.countusers}
                      </dd>
                    </div>
                    <div class="flex flex-col bg-white/5 p-8">
                      <dt class=" text-md font-medium leading-6 text-gray-300">
                        Registered companies
                      </dt>
                      <dd class="order-first text-3xl font-semibold tracking-tight text-white">
                        {data?.countcompanies}
                      </dd>
                    </div>
                    <div class="flex flex-col bg-white/5 p-8">
                      <dt class=" text-md font-medium leading-6 text-gray-300">
                        Posted Jobs
                      </dt>
                      <dd class="order-first text-3xl font-semibold tracking-tight text-white">
                        {data?.countjobs}
                      </dd>
                    </div>
                    <div class="flex flex-col bg-white/5 p-8">
                      <dt class=" text-md font-medium leading-6 text-gray-300">
                        Posted Challenges
                      </dt>
                      <dd class="order-first text-3xl font-semibold tracking-tight text-white">
                        {data?.countchallenges}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
