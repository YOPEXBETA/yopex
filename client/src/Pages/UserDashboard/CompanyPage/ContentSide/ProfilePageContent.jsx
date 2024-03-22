import React from "react";
import MyCompanyJobs from "./Components/MyJobs/MyJobs";
import MyCompanyChallenges from "./Components/MyChallenges/MyChallenges";
import CompanyInfos from "./Components/CompanyInfos/CompanyInfos";
import JobAppliers from "./Components/MyAppliers/JobAppliers";

const CompanyPageContent = ({ changeValue, value }) => {
  return (
    <div className="mx-auto container">
      {value === 0 && (
        <div className="flex justify-center lg:h-[100vh]">
          <div className="w-full lg:w-12/12 md:w-12/12 xs:w-full my-4">
            <CompanyInfos />
          </div>
        </div>
      )}

      {value === 1 && (
        <div className="flex justify-center lg:h-[100vh]">
          <div className="w-full lg:w-12/12 md:w-12/12 xs:w-full my-4">
            <MyCompanyJobs />
          </div>
        </div>
      )}
      {value === 2 && (
        <div className="flex justify-center lg:h-[100vh]">
          <div className="w-full lg:w-12/12 md:w-12/12 xs:w-full my-4">
            <MyCompanyChallenges />
          </div>
        </div>
      )}
      {value === 3 && (
        <div className="flex justify-center lg:h-[100vh]">
          <div className="w-full lg:w-12/12 md:w-12/12 xs:w-full my-4">
            <JobAppliers />
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyPageContent;
