import React, { useState } from "react";
import ProfilePageContent from "./ContentSide/ProfilePageContent";
import UserProfileCard from "./TopSide/UserProfileCard";
import { ProfileNavigationTab } from "./ContentSide/Components/ProfileNavigationTab";

const UserProfileLayout = () => {
  const [value, setValue] = useState(0);
  const changeValue = (newValue) => {
    setValue(newValue);
  };

  return (
    <div className="grid grid-cols-12 gap-2 py-6 lg:mx-16">
      <div className="lg:col-span-4 md:col-span-4 col-span-12">
        <UserProfileCard />
      </div>
      <div className="lg:col-span-8 col-span-12 space-y-2">
        <ProfileNavigationTab changeValue={changeValue} value={value} />
        <ProfilePageContent value={value} changeValue={changeValue} />
      </div>
    </div>
  );
};

export default UserProfileLayout;
