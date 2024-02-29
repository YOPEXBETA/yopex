import React, { useState } from "react";
import CompanyProfileInformations from "./TopSide/CompanyProfileInformations";
import CompanyPageContent from "./ContentSide/ProfilePageContent";

const Company = () => {
  const [value, setValue] = useState(0);
  const changeValue = (newValue) => {
    setValue(newValue);
  };

  return (
    <div className="mx-auto container">
      <CompanyProfileInformations changeValue={changeValue} value={value} />
      <CompanyPageContent value={value} changeValue={changeValue} />
    </div>
  );
};

export default Company;
