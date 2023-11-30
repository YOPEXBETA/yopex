import React from "react";
import company from "../../../../assets/images/company.png";

const CreateCompanyHeader = () => {
  return (
    <div>
      <section className="bg-purple-400 dark:bg-gray-900">
        <div className="grid max-w-screen-xl px-4 lg:py-10 py-6 mx-auto lg:gap-8 xl:gap-0  lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-5xl text-white  dark:text-white">
              Create your company page
            </h1>

            <p className="max-w-2xl mb-6 font-light text-white lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Complete essential details to build your company page and unlock
              opportunities to showcase jobs and challenges opportunities.
            </p>
          </div>

          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img
              src="https://cdn3d.iconscout.com/3d/premium/thumb/business-team-doing-discussion-5648600-4708252.png?f=webp"
              alt="hero image"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreateCompanyHeader;
