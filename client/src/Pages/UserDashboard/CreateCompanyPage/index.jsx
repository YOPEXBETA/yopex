import React from "react";
import CreateCompanyForm from "./Components/CreateCompanyForm";

const index = () => {
  return (
    <div>
      <div>
        <div className="grid grid-cols-12 mt-4 md:mt-0">
          <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 col-span-12">
            <CreateCompanyForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
