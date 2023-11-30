import React from "react";
import CreateCompanyForm from "../../../Components/forms/CreateCompanyForm";
import CreateCompanyHeader from "./components/CreateCompanyHeader";

const index = () => {
  return (
    <div>
      <div className="col-span-12 mb-4">
        <CreateCompanyHeader />
      </div>
      <div className="lg:mx-60 md:mx-20 my-8">
        <div className="grid grid-cols-12 mt-4 md:mt-0">
          <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 col-span-12">
            <div className="p-4 rounded-lg border bg-white mb-8">
              <CreateCompanyForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
