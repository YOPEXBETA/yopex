import React from "react";
import { RiLightbulbLine } from "react-icons/ri";
import { AiOutlineFileText } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import JobIcon from "../../../../Components/icons/JobIcon";

const Features = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
      <div className="dark:bg-zinc-800" id="features">
        <section class="pb-8 pt-20 dark:bg-dark lg:pb-[70px] lg:pt-20">
          <div class="container">
            <div class="-mx-4 flex flex-wrap">
              <div class="w-full px-4">
                <div class="mx-auto mb-12 max-w-[485px] text-center lg:mb-[70px]">
                  <span class="mb-2 block text-xl font-semibold text-amber-500">
                    Features
                  </span>
                  <h2 class="mb-3 text-3xl font-bold text-dark dark:text-white sm:text-4xl md:text-[40px] md:leading-[1.2]">
                    Our Main Features
                  </h2>
                  <p class="text-base text-body-color dark:text-white">
                    Discover the powerful features that set our platform apart
                  </p>
                </div>
              </div>
            </div>
            <div class="-mx-4 flex flex-wrap">
              <div class="w-full px-4 md:w-1/2 lg:w-1/4">
                <div class="wow fadeInUp group mb-12" data-wow-delay=".1s">
                  <div class="relative z-10 mb-10 flex h-[70px] w-[70px] items-center justify-center rounded-[14px] bg-gradient-to-r from-emerald-600  to-emerald-800">
                    <span class="absolute left-0 top-0 -z-[1] mb-8 flex h-[70px] w-[70px] rotate-[25deg] items-center justify-center rounded-[14px] bg-emerald-500 bg-opacity-20 duration-300 group-hover:rotate-45"></span>
                    <JobIcon width={10} height={10} color={"white"} />
                  </div>
                  <h4 class="mb-3 text-xl font-bold text-dark dark:text-white">
                    Find Your Perfect Job Fit
                  </h4>
                  <p class="mb-8 text-body-color dark:text-dark-6 lg:mb-9 dark:text-white">
                    Discover your perfect job match tailored to your unique
                    skills and expertise.
                  </p>
                  {/* <a
                    href="javascript:void(0)"
                    class="text-base font-medium text-dark hover:text-primary dark:text-white dark:hover:text-primary"
                  >
                    Learn More
  </a>*/}
                </div>
              </div>
              <div class="w-full px-4 md:w-1/2 lg:w-1/4">
                <div class="wow fadeInUp group mb-12" data-wow-delay=".15s">
                  <div class="relative z-10 mb-10 flex h-[70px] w-[70px] items-center justify-center rounded-[14px] bg-gradient-to-r from-emerald-600  to-emerald-800">
                    <span class="absolute left-0 top-0 -z-[1] mb-8 flex h-[70px] w-[70px] rotate-[25deg] items-center justify-center rounded-[14px] bg-emerald-500 bg-opacity-20 duration-300 group-hover:rotate-45"></span>
                    <RiLightbulbLine className="w-10 h-10 text-white" />
                  </div>
                  <h4 class="mb-3 text-xl font-bold text-dark dark:text-white">
                    Participate In Challenges
                  </h4>
                  <p class="mb-8 text-body-color dark:text-dark-6 lg:mb-9 dark:text-white">
                    Participate in challenges to showcase your skill and get
                    experience points.
                  </p>
                  {/* <a
                    href="javascript:void(0)"
                    class="text-base font-medium text-dark hover:text-primary dark:text-white dark:hover:text-primary"
                  >
                    Learn More
  </a>*/}
                </div>
              </div>
              <div class="w-full px-4 md:w-1/2 lg:w-1/4">
                <div class="wow fadeInUp group mb-12" data-wow-delay=".2s">
                  <div class="relative z-10 mb-10 flex h-[70px] w-[70px] items-center justify-center rounded-[14px] bg-gradient-to-r from-emerald-600  to-emerald-800">
                    <span class="absolute left-0 top-0 -z-[1] mb-8 flex h-[70px] w-[70px] rotate-[25deg] items-center justify-center rounded-[14px] bg-emerald-500 bg-opacity-20 duration-300 group-hover:rotate-45"></span>
                    <AiOutlineFileText className="w-10 h-10 text-white" />
                  </div>
                  <h4 class="mb-3 text-xl font-bold text-dark dark:text-white">
                    Profile Builder
                  </h4>
                  <p class="mb-8 text-body-color dark:text-dark-6 lg:mb-9 dark:text-white">
                    Seamlessly showcase your achievements and experiences as you
                    build your profile.
                  </p>
                  {/* <a
                    href="javascript:void(0)"
                    class="text-base font-medium text-dark hover:text-primary dark:text-white dark:hover:text-primary"
                  >
                    Learn More
  </a>*/}
                </div>
              </div>
              <div class="w-full px-4 md:w-1/2 lg:w-1/4">
                <div class="wow fadeInUp group mb-12" data-wow-delay=".25s">
                  <div class="relative z-10 mb-10 flex h-[70px] w-[70px] items-center justify-center rounded-[14px] bg-gradient-to-r from-emerald-600  to-emerald-800">
                    <span class="absolute left-0 top-0 -z-[1] mb-8 flex h-[70px] w-[70px] rotate-[25deg] items-center justify-center rounded-[14px] bg-emerald-500 bg-opacity-20 duration-300 group-hover:rotate-45"></span>
                    <FiUsers className="w-10 h-10 text-white" />
                  </div>
                  <h4 class="mb-3 text-xl font-bold text-dark dark:text-white">
                    Expand Your Network
                  </h4>
                  <p class="mb-8 text-body-color dark:text-dark-6 lg:mb-9 dark:text-white">
                    Unite with Professionals who Share Your Interests.
                  </p>
                  {/* <a
                    href="javascript:void(0)"
                    class="text-base font-medium text-dark hover:text-primary dark:text-white dark:hover:text-primary"
                  >
                    Learn More
  </a>*/}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Features;
