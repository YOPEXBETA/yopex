import React from "react";
import Billing from "./AccountSettings/Billing/Billing";
import Privacy from "./AccountSettings/Privacy/Privacy";
import HorizantalSettingsTab from "./AccountSettings/SettingTabs/HorizantalSettingsTab";
import VerticalSettingsTab from "./AccountSettings/SettingTabs/VerticalSettingsTab";
import GeneralInformations from "./AccountSettings/ProfileInformations/GeneralInformations";

const SettingsLayout = () => {
  const [value, setValue] = React.useState(0);
  const changeValue = (newValue) => {
    setValue(newValue);
  };

  return (
    <div className="dark:bg-zinc-800">
      <div className="px-2 md:px-5 lg:px-24">
        <div className="grid grid-cols-12 lg:gap-8 gap-0 ">
          <div className="col-span-3 lg:block hidden md:hidden">
            <VerticalSettingsTab changeValue={changeValue} value={value} />
          </div>

          <div className="col-span-12 mt-2 block lg:hidden md:block">
            <HorizantalSettingsTab changeValue={changeValue} value={value} />
          </div>

          {value === 0 && (
            <div className="col-span-12  lg:col-span-9 md:col-span-12 mt-8 lg:px-10 lg:py-8 px-2 md:border my-8 rounded-lg">
              <GeneralInformations />
            </div>
          )}
          {value === 1 && (
            <div className="col-span-12  lg:col-span-9 md:col-span-12 mt-8 lg:px-10  lg:py-8 px-2 md:border my-8 rounded-lg">
              <Privacy />
            </div>
          )}
          {value === 2 && (
            <div className="col-span-12  lg:col-span-9 md:col-span-12 mt-8 lg:px-10  lg:py-8 px-2 md:border my-8 rounded-lg">
              <Billing />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
