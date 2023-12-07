import React, { useState } from "react";
import Billing from "./AccountSettings/Billing/Billing";
import Privacy from "./AccountSettings/Privacy/Privacy";
import HorizantalSettingsTab from "./AccountSettings/SettingTabs/HorizantalSettingsTab";
import VerticalSettingsTab from "./AccountSettings/SettingTabs/VerticalSettingsTab";
import GeneralInformations from "./AccountSettings/ProfileInformations/GeneralInformations";
import MoreInformation from "./AccountSettings/MoreInformation/MoreInformation";

const SettingsLayout = () => {
  const [value, setValue] = useState(0);
  const changeValue = (newValue) => {
    setValue(newValue);
  };

  return (
    <div className="">
      <div className="grid grid-cols-12 lg:gap-8 gap-0  h-[100vh]">
        <div className="col-span-3 lg:block hidden md:hidden">
          <div className="sticky top-24">
            <VerticalSettingsTab changeValue={changeValue} value={value} />
          </div>
        </div>

        <div className="col-span-12 mt-2 block lg:hidden md:block">
          <HorizantalSettingsTab changeValue={changeValue} value={value} />
        </div>

        {value === 0 && (
          <div className="col-span-12  lg:col-span-9 md:col-span-12 mt-8  p-6 bg-white rounded-lg dark:bg-zinc-800 my-8">
            <GeneralInformations />
          </div>
        )}
        {value === 1 && (
          <div className="col-span-12  lg:col-span-9 md:col-span-12 mt-8  p-6 bg-white  rounded-lg dark:bg-zinc-800 my-8">
            <Privacy />
          </div>
        )}
        {value === 2 && (
          <div className="col-span-12  lg:col-span-9 md:col-span-12 mt-8 p-6 bg-white rounded-lg dark:bg-zinc-800 my-8">
            <Billing />
          </div>
        )}
        {value === 3 && (
          <div className="col-span-12  lg:col-span-9 md:col-span-12 mt-8 p-6 bg-white rounded-lg dark:bg-zinc-800 my-8">
            <MoreInformation />
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsLayout;
