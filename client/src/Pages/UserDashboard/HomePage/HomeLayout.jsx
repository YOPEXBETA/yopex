import React from "react";
import AddSocialPostCard from "../../../Components/shared/CreatePost/AddSocialPostCard";
import Content from "./Content/Content";
import MoneyBalance from "./rightSide/MoneyBalance/MoneyBalance";
import Leaders from "./rightSide/Leaders/Leaders";
import MyContestLists from "./rightSide/MyContestsLists/MyContestsLists";
import UserCard from "./userCard/userCard/UserCard";
import UserHighlights from "./userCard/UserHighlights/UserHighlights";

const HomeLayout = () => {
  return (
    <div className="grid grid-cols-12 gap-4 py-6 px-16">
      <div className="col-span-12 md:col-span-2 lg:col-span-3 space-y-4 ">
        <UserCard />
        <UserHighlights />
      </div>

      <div className="col-span-12 md:col-span-8 lg:col-span-6 space-y-4 sm:px-8">
        <AddSocialPostCard />
        <Content />
      </div>

      <div className="col-span-12 md:col-span-2 lg:col-span-3 hidden lg:block space-y-4">
        <MoneyBalance />
        <Leaders />
        <MyContestLists />
      </div>
    </div>
  );
};

export default HomeLayout;
