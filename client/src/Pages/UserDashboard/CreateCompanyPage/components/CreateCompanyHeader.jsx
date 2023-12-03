import React from "react";
import company from "../../../../assets/images/company.webp";

const CreateCompanyHeader = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row items-center bg-white lg:px-40 md:px-20 border md:h-72 py-8 overflow-hidden justify-between relative">
        <div className="text-center mb-4 md:mb-0 md:mr-4">
          <h1 className="mb-4 text-xl font-bold dark:text-white md:text-3xl text-center md:text-left">
            Create your company page
          </h1>

          <p className="text-lg dark:text-white text-center md:text-left">
            Complete essential details to build your company page and unlock
            opportunities.
          </p>
        </div>

        <div className="text-center">
          <img
            src={company}
            alt="No companies to select"
            className="w-auto h-64 hidden md:block"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateCompanyHeader;
