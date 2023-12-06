import React from "react";
import MyCompanyJobs from "./Components/MyJobs/MyJobs";
import MyCompanyChallenges from "./Components/MyChallenges/MyChallenges";
import MyCompanySocialPosts from "./Components/MyPosts/MyCompanySocialPosts";
import CompanyInfos from "./Components/CompanyInfos/CompanyInfos";
import JobAppliers from "./Components/MyAppliers/JobAppliers";

const CompanyPageContent = ({ changeValue, value }) => {
  return (
    <div className="mx-auto container">
      {value === 0 && (
        <div className="flex justify-center ">
          <div className="w-full  lg:w-12/12 md:w-12/12 xs:w-full">
            <CompanyInfos />
          </div>
        </div>
      )}
      {value === 1 && (
        <div className="flex justify-center">
          <div className="w-full  lg:w-12/12 md:w-12/12 xs:w-full">
            <MyCompanySocialPosts />
          </div>
        </div>
      )}

      {value === 2 && (
        <div className="flex justify-center">
          <div className="w-full lg:w-12/12 md:w-12/12 xs:w-full">
            <MyCompanyJobs />
          </div>
        </div>
      )}
      {value === 3 && (
        <div className="flex justify-center">
          <div className="w-full lg:w-12/12 md:w-12/12 xs:w-full">
            <MyCompanyChallenges />
          </div>
        </div>
      )}
      {value === 4 && (
        <div className="flex justify-center">
          <div className="w-full lg:w-12/12 md:w-12/12 xs:w-full">
            <JobAppliers />
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyPageContent;
