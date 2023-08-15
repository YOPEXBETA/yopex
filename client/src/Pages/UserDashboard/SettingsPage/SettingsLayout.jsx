import React from "react";
import Billing from "./AccountSettings/Billing";
import GeneralInformations from "./AccountSettings/GeneralInformations";
import Privacy from "./AccountSettings/Privacy";
import HorizantalSettingsTab from "./AccountSettings/SettingTabs/HorizantalSettingsTab";
import VerticalSettingsTab from "./AccountSettings/SettingTabs/VerticalSettingsTab";

const SettingsLayout = () => {
  const [value, setValue] = React.useState(0);
  const changeValue = (e, params) => setValue(params);

  return (
    <div className="px-2 md:px-5 lg:px-5">
      <div className="grid grid-cols-12 lg:gap-8 gap-0">
        <div className="col-span-3 hidden lg:block md:hidden">
          <VerticalSettingsTab changeValue={changeValue} value={value} />
        </div>

        <div className="col-span-12 mt-2 block lg:hidden md:block">
          <HorizantalSettingsTab changeValue={changeValue} value={value} />
        </div>

        {value === 0 && (
          <div className="col-span-12 lg:col-span-9 md:col-span-12 mt-8 lg:px-16 px-2">
            <GeneralInformations />
          </div>
        )}
        {value === 1 && (
          <div className="col-span-12 lg:col-span-9 md:col-span-12 mt-8 lg:px-16 px-2">
            <Privacy />
          </div>
        )}
        {value === 2 && (
          <div className="col-span-12 lg:col-span-9 md:col-span-12 mt-8 lg:px-16 px-2">
            <Billing />
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsLayout;
