import React from "react";
import AddSocialPostCard from "../../../Components/shared/CreatePost/AddSocialPostCard";
import ScrollableTabs from "../../../Components/Tabs/ScrollableTab";
import ExploreSection from "./components/ExploreSection";
import ScoreLeaderboard from "./components/ScoreLeaderboard";
import MyContestLists from "../../../Components/Cards/MyContestsLists";
import Widget from "../../../Components/Widget/Widget";
import Banner from "./components/Banner";
import Posts from "./components/Posts";

const HomeLayout = () => {
  return (
    <div className="grid grid-cols-12 gap-4  lg:py-6 px-0 py-0">
      <div className="col-span-12 md:col-span-12 xl:col-span-8 lg:col-span-6 space-y-4">
        {/*<Banner />*/}
        <div className="lg:px-8 xl:mx-12">
          <Posts />
        </div>
      </div>
      <div className="col-span-12 md:col-span-12 xl:block xl:col-span-4 lg:col-span-4 space-y-4 hidden md:block">
        {/* <MoneyBalance />*/}
        <ScoreLeaderboard />
        <MyContestLists />
      </div>
    </div>
  );
};

export default HomeLayout;
