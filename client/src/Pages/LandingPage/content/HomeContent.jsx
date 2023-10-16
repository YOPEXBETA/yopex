import React from "react";
import HighlightSection from "./components/HighlightSection";
import HomeSection from "./components/HomeSection";
import Features from "./components/Features";
import RecentJobs from "./components/RecentJobs";
import Companies from "./components/Companies";
import Contact from "./components/Contact";
import GetStartedNow from "./components/GetStartedNow";

const HomeContent = () => {
  return (
    <div>
      <div className="pb-16 dark:bg-zinc-800">
        <HomeSection />
      </div>
      <div className="pb-16 dark:bg-zinc-800">
        <HighlightSection />
      </div>
      <div className="pb-16 dark:bg-zinc-800">
        <Features />
      </div>
      <div className="pb-16 dark:bg-zinc-800">
        <Companies />
      </div>
      <div className="pb-16 dark:bg-zinc-800">
        <GetStartedNow />
      </div>
      <div className="pb-16 dark:bg-zinc-800">
        <RecentJobs />
      </div>
      <Contact />
    </div>
  );
};


export default HomeContent;
