import React from "react";
import CreateCompanyForm from "./Components/CreateCompanyForm";
import Card from "../../../Components/Cards";

const index = ({ extra }) => {
  return (
    <Card extra={`${extra} p-8 h-full flex items-center justify-center`}>
      <div className="grid grid-cols-12 mt-4 md:mt-0">
        <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 col-span-12">
          <CreateCompanyForm />
        </div>
      </div>
    </Card>
  );
};

export default index;
