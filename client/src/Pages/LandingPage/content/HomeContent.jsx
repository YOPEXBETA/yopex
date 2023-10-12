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
      <div className="pb-16">
        <HomeSection />
      </div>
      <div className="pb-16">
        <HighlightSection />
      </div>
      <div className="pb-16">
        <Features />
      </div>
      <div className="pb-16">
        <Companies />
      </div>
      <div className="pb-16">
        <GetStartedNow />
      </div>
      <div className="pb-16">
        <RecentJobs />
      </div>
      <Contact />
    </div>
  );
};

export default HomeContent;
