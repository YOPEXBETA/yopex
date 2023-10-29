import React from "react";
import AddSocialPostCard from "../../../Components/shared/CreatePost/AddSocialPostCard";
import MyContestLists from "../../../Components/shared/cards/MyContestsLists";
import MoneyBalance from "../../../Components/shared/cards/MoneyBalance";
import Leaders from "../../../Components/shared/cards/Leaders";
import UserProgressCard from "../../../Components/shared/cards/UserProgressCard/UserProgressCard";
import UserHighlights from "../../../Components/shared/cards/UserHighlights/UserHighlights";
import ScrollableTabs from "../../../Components/Tabs/ScrollableTab";
import SocialPosts from "./components/SocialPosts";
import UserInfoCard from "../../../Components/shared/cards/UserInfoCard";

const HomeLayout = () => {
  return (
    <div className="grid grid-cols-12 dark:bg-zinc-800 gap-4 lg:py-6 lg:px-16 px-0 py-0">
      <div className="col-span-12  md:col-span-12 xl:col-span-3 lg:col-span-4 space-y-4">
        <UserProgressCard />
        <UserHighlights />
      </div>

      <div className="col-span-12 md:col-span-12 xl:col-span-6 lg:col-span-8 space-y-4 lg:px-8 px-0 mb-20">
        <AddSocialPostCard />
        <ScrollableTabs />
        <SocialPosts />
      </div>

      <div className="hidden col-span-12 md:col-span-12 xl:block xl:col-span-3 lg:col-span-4 space-y-4">
        {/* <MoneyBalance />*/}
        <Leaders />
        <MyContestLists />
      </div>
    </div>
  );
};

export default HomeLayout;
