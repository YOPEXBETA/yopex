import React from "react";
import HomeHeader from "./header/homeHeader";
import HomeContent from "./content/HomeContent";
import Footer from "./footer/Footer";
import LandingHeader from "./header/LandingHeader";

const LandingPage = () => {
  return (
    <div className="">
      <div className="pb-32">
        <HomeHeader />
      </div>
      <HomeContent />
      <Footer />
    </div>
  );
};

export default LandingPage;
