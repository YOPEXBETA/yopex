import React from "react";
import HomeHeader from "./header/homeHeader";
import HomeContent from "./content/HomeContent";
import Footer from "./footer/Footer";
import LandingHeader from "./header/LandingHeader";

const LandingPage = () => {
  return (
    <div >
      <div >
        <HomeHeader />
      </div>
      <HomeContent />
      <Footer />
    </div>
  );
};

export default LandingPage;
