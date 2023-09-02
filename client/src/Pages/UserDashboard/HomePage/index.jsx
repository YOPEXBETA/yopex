import React from "react";
import AddSocialPostCard from "../../../Components/shared/CreatePost/AddSocialPostCard";
import MyContestLists from "../../../Components/shared/cards/MyContestsLists";
import MoneyBalance from "../../../Components/shared/cards/MoneyBalance";
import Leaders from "../../../Components/shared/cards/Leaders";
import UserProgressCard from "../../../Components/shared/cards/UserProgressCard/UserProgressCard";
import UserHighlights from "../../../Components/shared/cards/UserHighlights/UserHighlights";
import ScrollableTabs from "../../../Components/Tabs/ScrollableTab";
import SocialPosts from "./components/SocialPosts";

const HomeLayout = () => {
  return (
    <div className="grid grid-cols-12 gap-4 lg:py-6 lg:px-16 px-0 py-0">
      <div className="col-span-12 md:col-span-12 lg:col-span-3 space-y-4 ">
        <UserProgressCard />
        <UserHighlights />
      </div>

      <div className="col-span-12 md:col-span-12 lg:col-span-6 space-y-4 lg:px-8 px-0">
        <AddSocialPostCard />
        <ScrollableTabs />
        <SocialPosts />
      </div>

      <div className="col-span-12 md:col-span-0 lg:col-span-3 hidden lg:block space-y-4">
        <MoneyBalance />
        <Leaders />
        <MyContestLists />
      </div>
    </div>
  );
};

export default HomeLayout;
