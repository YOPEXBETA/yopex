import React from "react";
import { RiLightbulbLine } from "react-icons/ri";
import { AiOutlineFileText } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import JobIcon from "../../../../Components/icons/JobIcon";

const Features = () => {
  return (
    <div>
    <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
      <div className="" id="features">
        <section class="pb-8 pt-20 dark:bg-dark lg:pb-[70px] lg:pt-20">
          <div class="container">
            <div class="-mx-4 flex flex-wrap">
              <div class="w-full px-4">
                <div class="mx-auto mb-12 max-w-[485px] text-center lg:mb-[70px]">
                  <h2 class="mb-3 text-3xl font-bold dark:text-white sm:text-4xl md:text-[40px] md:leading-[1.2]">
                    Our Main Features
                  </h2>
                  <p class="text-base text-body-color text-md dark:text-white">
                    Discover the features that set our platform apart
                  </p>
                </div>
              </div>
            </div>
            <div class="-mx-4 flex flex-wrap">
              <div class="w-full px-4 md:w-1/2 lg:w-1/4">
                <div class="wow fadeInUp group mb-12" data-wow-delay=".1s">
                  <h4 class="mb-3 text-xl font-bold text-dark dark:text-white">
                  Connect with Leaders
                  </h4>
                  <p class="mb-8 text-body-color dark:text-dark-6 lg:mb-9 dark:text-white">
                   Build a network with mentors and tech experts
                  </p>
                </div>
              </div>
              <div class="w-full px-4 md:w-1/2 lg:w-1/4">
                <div class="wow fadeInUp group mb-12" data-wow-delay=".15s">
                  <h4 class="mb-3 text-xl font-bold text-dark dark:text-white">
                    Build Your Skills
                  </h4>
                  <p class="mb-8 text-body-color dark:text-dark-6 lg:mb-9 dark:text-white">
                  Hands-on coding challenges and workshops
                  </p>
              
                </div>
              </div>
              <div class="w-full px-4 md:w-1/2 lg:w-1/4">
                <div class="wow fadeInUp group mb-12" data-wow-delay=".2s">
                  <h4 class="mb-3 text-xl font-bold text-dark dark:text-white">
                    Profile Builder
                  </h4>
                  <p class="mb-8 text-body-color dark:text-dark-6 lg:mb-9 dark:text-white">
                    Showcase your achievements and experiences as you build your profile.
                  </p>
                </div>
              </div>
              <div class="w-full px-4 md:w-1/2 lg:w-1/4">
                <div class="wow fadeInUp group mb-12" data-wow-delay=".25s">
                  <h4 class="mb-3 text-xl font-bold text-dark dark:text-white">
                  Win Exciting Prizes
                  </h4>
                  <p class="mb-8 text-body-color dark:text-dark-6 lg:mb-9 dark:text-white">
                  Opportunities to win cash prizes and recognition
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    </div>
  );
};

export default Features;
