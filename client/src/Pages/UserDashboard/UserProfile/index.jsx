import React, { useState } from "react";
/*--------------------components-----------------*/
import { ProfileNavigationTab } from "../../../Components/Tabs/ProfileNavigationTab";
import ProfilePageContent from "./ContentSide/ProfilePageContent";
import UserProfileCard from "./TopSide/UserProfileCard";
/*--------------------code-----------------*/
const UserProfileLayout = () => {
  const [value, setValue] = useState(0);
  const changeValue = (newValue) => {
    setValue(newValue);
  };

  return (
    <div className="mx-auto container">
      <div className="grid grid-cols-12 xl:gap-8 lg:gap-2 md:gap-2">
        <div className="xl:col-span-4 lg:col-span-12 md:col-span-12 col-span-12">
          <UserProfileCard />
        </div>
        <div className="xl:col-span-8  lg:col-span-12 md:col-span-12  col-span-12 md:space-y-2">
          <ProfileNavigationTab changeValue={changeValue} value={value} />
          <ProfilePageContent value={value} changeValue={changeValue} />
        </div>
      </div>
    </div>
  );
};

export default UserProfileLayout;
