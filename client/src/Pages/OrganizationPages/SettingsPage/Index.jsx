import React, { useState } from "react";
import VerticalSettingsTab from "./Components/SettingTabs/VerticalSettingsTab";

const SettingsPage = () => {
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
              <p>Workspace Info</p>
            </div>
          )}
          {value === 1 && (
            <div className="col-span-12 lg:col-span-9 md:col-span-12 mt-4 md:mt-0">
              <p>Overview</p>
              </div>
          )}
          {value === 2 && (
            <div className="col-span-12 lg:col-span-9 md:col-span-12 mt-4 md:mt-0">
              <p>Social Links</p>
              </div>
          )}
        </div>
      </div>
    );
};

export default SettingsPage;
