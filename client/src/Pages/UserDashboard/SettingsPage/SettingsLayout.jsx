import React, { useState } from "react";
import Billing from "./AccountSettings/Billing/Billing";
import Privacy from "./AccountSettings/Privacy/Privacy";
import VerticalSettingsTab from "./AccountSettings/SettingTabs/VerticalSettingsTab";
import GeneralInformations from "./AccountSettings/ProfileInformations/GeneralInformations";
import Links from "./AccountSettings/Links/Links";

const SettingsLayout = () => {
  const [value, setValue] = useState(0);
  const changeValue = (newValue) => {
    setValue(newValue);
  };

  return (
    <div className="mx-auto container">
      <div className="grid grid-cols-12 lg:gap-8 gap-0">
        <div className="col-span-3 lg:block">
          <div className="sticky top-24">
            <VerticalSettingsTab changeValue={changeValue} value={value} />
          </div>
        </div>

        {value === 0 && (
          <div className="col-span-12 lg:col-span-9 md:col-span-12 mt-4 md:mt-0">
            <GeneralInformations />
          </div>
        )}
        {value === 1 && (
          <div className="col-span-12 lg:col-span-9 md:col-span-12 mt-4 md:mt-0">
            <Links />
          </div>
        )}
        {value === 2 && (
          <div className="col-span-12 lg:col-span-9 md:col-span-12 mt-4 md:mt-0">
            <Privacy />
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsLayout;
