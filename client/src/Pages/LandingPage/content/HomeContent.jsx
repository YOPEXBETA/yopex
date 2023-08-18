import React from "react";
import HighlightSection from "./components/HighlightSection";
import HomeSection from "./components/HomeSection";
import Features from "./components/Features";
import Contact from "./components/Contact";
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
      <Contact />
    </div>
  );
};

export default HomeContent;
