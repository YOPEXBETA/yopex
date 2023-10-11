import React from "react";
import HighlightSection from "./components/HighlightSection";
import HomeSection from "./components/HomeSection";
import Features from "./components/Features";
import RecentJobs from "./components/RecentJobs";
import Companies from "./components/Companies";
import Contact from "./components/Contact";

const HomeContent = () => {
  return (
    <div>
      <HomeSection />
      <HighlightSection />
      <Features />
      <Companies />
      <RecentJobs />
      <Contact />
    </div>
  );
};

export default HomeContent;
