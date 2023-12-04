import React from "react";
import AddSocialPostCard from "../../../Components/shared/CreatePost/AddSocialPostCard";
import ScrollableTabs from "../../../Components/Tabs/ScrollableTab";
import SocialPosts from "./components/SocialPosts";
import ExploreSection from "./components/ExploreSection";
import ScoreLeaderboard from "./components/ScoreLeaderboard";
import MyContestLists from "../../../Components/Cards/MyContestsLists";
import Widget from "../../../Components/Widget/Widget";

const HomeLayout = () => {
  return (
    <div className="mx-auto container dark:bg-zinc-800">
      <div className="grid grid-cols-12 dark:bg-zinc-800 gap-4 lg:py-6 lg:px-16 px-0 py-0">
        {/*
        <div className="hidden col-span-12 md:col-span-12 xl:block xl:col-span-3 lg:col-span-4 space-y-4">
          <ExploreSection />
        </div>*/}

        <div className="col-span-12 md:col-span-12 xl:col-span-9 lg:col-span-8 space-y-4 px-0 mb-20 mt-2 lg:mt-0 md:mt-0">
          {/*<AddSocialPostCard />
          <div className="xl:hidden lg:hidden block">
            <ScrollableTabs />
          </div>
  <SocialPosts />*/}

          <SocialPosts />
        </div>

        <div className="col-span-12 md:col-span-12 xl:block xl:col-span-3 lg:col-span-4 space-y-4 hidden md:block">
          {/* <MoneyBalance />*/}
          <ScoreLeaderboard />
          <MyContestLists />
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
