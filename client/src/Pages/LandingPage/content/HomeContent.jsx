import React from "react";
import HighlightSection from "./components/HighlightSection";
import HomeSection from "./components/HomeSection";
import Features from "./components/Features";
import Partners from "./components/Partners";
import RecentChallenges from "./components/RecentChallenges";
import Contact from "./components/Contact";
import SocialLinks from "./components/SocialLinks";

const HomeContent = () => {
  return (
    <div>
      <HomeSection />
      <HighlightSection />
      <Features />
      <Partners />
      <RecentChallenges />
      <Contact />
      <SocialLinks />
    </div>
  );
};

export default HomeContent;
