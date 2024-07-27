import React, { useState } from "react";
import VerticalSettingsTab from "./Components/SettingTabs/VerticalSettingsTab";
import MembersSettings from "./Components/Members/MembersSettings";
import EditOrganization from "./Components/WorkspaceInformation/WorkspaceInformation";
import Links from "./Components/Links/Links";

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
                <EditOrganization/>
            </div>
          )}
          {value === 1 && (
            <div className="col-span-12 lg:col-span-9 md:col-span-12 mt-4 md:mt-0">
             <MembersSettings/>
              </div>
          )}
          {value === 2 && (
            <div className="col-span-12 lg:col-span-9 md:col-span-12 mt-4 md:mt-0">
             <Links/>
              </div>
          )}
        </div>
      </div>
    );
};

export default SettingsPage;
