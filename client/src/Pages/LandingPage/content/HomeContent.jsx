import React from "react";
import HomeSection from "./components/HomeSection";
import RecentJobs from "./components/RecentJobs";
import Companies from "./components/Companies";
import Contact from "./components/Contact";
import GetStartedNow from "./components/GetStartedNow";
import RecentChallenges from "./components/RecentChallenges";
import Partners from "./components/Partners";
import AboutUs from "./components/AboutUs";

const HomeContent = () => {
  return (
    <div>
      <div className="">
        <HomeSection />
      </div>
      {/*<div className="dark:bg-zinc-800 bg-white">
        <Partners />
  </div>*/}
      <div className="dark:bg-zinc-800">
        <AboutUs/>
      </div>
      <div className="dark:bg-zinc-800">
        <RecentChallenges />
      </div>
      <div className="dark:bg-zinc-800">
        <Companies />
      </div>
      <div className="dark:bg-zinc-800">
        <GetStartedNow />
      </div>
      <div className="dark:bg-zinc-800">
        <RecentJobs />
      </div>
      <div className="dark:bg-zinc-800">
        <Contact />
      </div>
    </div>
  );
};

export default HomeContent;
