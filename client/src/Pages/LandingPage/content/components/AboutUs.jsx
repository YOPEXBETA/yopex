import React from "react";
import Instructor from "../../../../assets/images/Instructor.jpg";

const AboutUs = () => {
  return (
    <div>
      <section
        id="about"
        className="pb-8 pt-20 dark:bg-zinc-800 lg:pb-[70px] lg:pt-[120px] md:px-24 px-4"
      >
          <div>
            <div className="flex flex-wrap items-center -mx-4">
              {/* Left Section */}
              <div className="w-full px-4 lg:w-1/2">
                <div className="mb-12 max-w-[540px] lg:mb-0">
                  <h2 className="mb-5 text-3xl font-bold leading-tight text-dark dark:text-white sm:text-[40px] sm:leading-[1.2]">
                    Accelerate your skills with virtual bootcamps.
                  </h2>
                  <p className="mb-10 text-lg dark:text-white">
                    Master tech skills with Yopex through expert-led bootcamps
                    and online classes. We connect talent with businesses,
                    helping you build practical skills and fast-track your
                    career.
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center justify-center py-3 text-base font-medium bg-orange-500 rounded-lg text-white border-primary px-7 hover:border-blue-dark hover:bg-blue-dark"
                  >
                    Know More
                  </a>
                </div>
              </div>

              {/* Right Section */}
              <div className="w-full px-4 lg:w-1/2 md:w-full">
                <div className="h-auto">
                  <img
                    src={Instructor}
                    alt="about image"
                    className="object-cover object-center w-full h-full rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
      </section>
    </div>
  );
};

export default AboutUs;