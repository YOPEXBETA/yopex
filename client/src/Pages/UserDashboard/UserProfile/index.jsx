import React, { useState } from "react";
/*--------------------components-----------------*/
import { ProfileNavigationTab } from "../../../Components/Tabs/ProfileNavigationTab";
import ProfilePageContent from "./ContentSide/ProfilePageContent";
import UserProfileCard from "./TopSide/UserProfileCard";
import UserProfileInfoCard from "./TopSide/UserProfileInfoCard";
/*--------------------code-----------------*/
const UserProfileLayout = () => {
  const [value, setValue] = useState(0);
  const changeValue = (newValue) => {
    setValue(newValue);
  };

  return (
    <div className="grid grid-cols-12 xl:gap-8 lg:gap-2 md:gap-2 md:space-y-0">
      <div className="xl:col-span-12 lg:col-span-12 md:col-span-12 col-span-12">
        <UserProfileInfoCard/>
      </div>
      <div className="xl:col-span-12 lg:col-span-12 md:col-span-12 col-span-12 space-y-4">
        <ProfileNavigationTab changeValue={changeValue} value={value} />
        <ProfilePageContent value={value} changeValue={changeValue} />
      </div>
    </div>
  );
};

export default UserProfileLayout;
