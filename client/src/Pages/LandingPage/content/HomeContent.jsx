import React from "react";
import HighlightSection from "./components/HighlightSection";
import HomeSection from "./components/HomeSection";
import Features from "./components/Features";
import RecentJobs from "./components/RecentJobs";
import Companies from "./components/Companies";
import Contact from "./components/Contact";
import GetStartedNow from "./components/GetStartedNow";
import RecentChallenges from "./components/RecentChallenges";
import Partners from "./components/Partners";

const HomeContent = () => {
  return (
    <div>
      <div className="dark:bg-zinc-800 bg-white">
        <HomeSection />
      </div>
      {/*<div className="dark:bg-zinc-800 bg-white">
        <Partners />
  </div>*/}
      <div className="dark:bg-zinc-800 bg-white">
        <Features />
      </div>
      <div className="dark:bg-zinc-800 bg-white">
        <Companies />
      </div>
      <div className="dark:bg-zinc-800 bg-white">
        <RecentChallenges />
      </div>

      <div className="pb-16 dark:bg-zinc-800 bg-white">
        <GetStartedNow />
      </div>
      <div className="pb-16 dark:bg-zinc-800 bg-white">
        <RecentJobs />
      </div>
      <div className="dark:bg-zinc-800 bg-white">
        <Contact />
      </div>
    </div>
  );
};

export default HomeContent;
