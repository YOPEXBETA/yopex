import React from "react";
import AddSocialPostCard from "../../../Components/shared/CreatePost/AddSocialPostCard";
import MyContestLists from "../../../Components/shared/cards/MyContestsLists";
import MoneyBalance from "../../../Components/shared/cards/MoneyBalance";
import UserProgressCard from "../../../Components/shared/cards/UserProgressCard/UserProgressCard";
import ScrollableTabs from "../../../Components/Tabs/ScrollableTab";
import SocialPosts from "./components/SocialPosts";
import TopLeadersCard from "../../../Components/shared/cards/TopLeadersCard";
import UserCardHome from "../../../Components/shared/cards/UserProgressCard/UserCardHome";

const HomeLayout = () => {
  return (
    <div className="grid grid-cols-12 dark:bg-zinc-800 gap-4 lg:py-6 lg:px-16 px-0 py-0">
      <div className="hidden col-span-12 md:col-span-12 xl:block xl:col-span-3 lg:col-span-4 space-y-4">
        <UserCardHome />
      </div>

      <div className="col-span-12 md:col-span-12 xl:col-span-6 lg:col-span-8 space-y-4 lg:px-11 px-0 mb-20">
        <AddSocialPostCard />
        <div className="xl:hidden lg:hidden block">
          <ScrollableTabs />
        </div>
        <SocialPosts />
      </div>

      <div className="hidden col-span-12 md:col-span-12 xl:block xl:col-span-3 lg:col-span-4 space-y-4">
        {/* <MoneyBalance />*/}
        <UserProgressCard />
        <TopLeadersCard />
        <MyContestLists />
      </div>
    </div>
  );
};

export default HomeLayout;
