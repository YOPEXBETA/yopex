import React from "react";
import HighlightSection from "./components/HighlightSection";
import HomeSection from "./components/HomeSection";
import Features from "./components/Features";
import RecentJobs from "./components/RecentJobs";
import Companies from "./components/Companies";

const HomeContent = () => {
  return (
    <div>
      <HomeSection />
      <HighlightSection />
      <Features />
      <Companies />
      <RecentJobs />
    </div>
  );
};

export default HomeContent;
