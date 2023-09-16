import React from "react";
import MyCompanyJobs from "./Components/MyJobs/MyJobs";
import MyCompanyChallenges from "./Components/MyChallenges/MyChallenges";
import MyCompanySocialPosts from "./Components/MyPosts/MyCompanySocialPosts";
import MyAppliersJob from "./Components/MyAppliers/MyAppliers";

const CompanyPageContent = ({ changeValue, value }) => {
  return (
    <div>
      {value === 0 && (
        <div className="flex justify-center">
          <div className="w-full lg:w-12/12 md:w-12/12 xs:w-full xl:px-16 lg:px-6 px-0">
            <MyCompanySocialPosts />
          </div>
        </div>
      )}

      {value === 1 && (
        <div className="flex justify-center">
          <div className="w-full lg:w-12/12 md:w-12/12 xs:w-full xl:px-16 lg:px-6 px-0">
            <MyCompanyJobs />
          </div>
        </div>
      )}
      {value === 2 && (
        <div className="flex justify-center">
          <div className="w-full lg:w-12/12 md:w-12/12 xs:w-full xl:px-16 lg:px-6 px-0 pb-11">
            <MyCompanyChallenges />
          </div>
        </div>
      )}
      {value === 3 && (
        <div className="flex justify-center">
          <div className="w-full lg:w-12/12 md:w-12/12 xs:w-full xl:px-16 lg:px-6 px-0 pb-11">
            <MyAppliersJob />
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyPageContent;
