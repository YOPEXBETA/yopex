import React from "react";
import AddSocialPostCard from "../../../Components/shared/CreatePost/AddSocialPostCard";
import MyContestLists from "../../../Components/shared/cards/MyContestsLists";
import MoneyBalance from "../../../Components/shared/cards/MoneyBalance";
import UserProgressCard from "../../../Components/shared/cards/UserProgressCard/UserProgressCard";
import ScrollableTabs from "../../../Components/Tabs/ScrollableTab";
import SocialPosts from "./components/SocialPosts";
import TopLeadersCard from "../../../Components/shared/cards/TopLeadersCard";
import ExploreCard from "../../../Components/shared/cards/UserProgressCard/ExploreCard";
import Testy from "../../../Components/shared/cards/UserProgressCard/Testy";

const HomeLayout = () => {
  return (
    <div className="grid grid-cols-12 dark:bg-zinc-800 gap-4 lg:py-6 lg:px-16 px-0 py-0">
      <div className="hidden col-span-12 md:col-span-12 xl:block xl:col-span-3 lg:col-span-4 space-y-4">
        <ExploreCard />
      </div>

      <div className="col-span-12 md:col-span-12 xl:col-span-6 lg:col-span-8 space-y-4 lg:px-11 px-0 mb-20 md:mt-2">
        <AddSocialPostCard />
        <div className="xl:hidden lg:hidden block">
          <ScrollableTabs />
        </div>
        <SocialPosts />
      </div>

      <div className="col-span-12 md:col-span-12 xl:block xl:col-span-3 lg:col-span-4 space-y-4">
        {/* <MoneyBalance />*/}
        <Testy />
        <MyContestLists />
      </div>
    </div>
  );
};

export default HomeLayout;
