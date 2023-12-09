import React from "react";
import HomeContent from "./content/HomeContent";
import HomeHeader from "../../Components/HomeHeader/homeHeader";
import Footer from "../../Components/footer/Footer";

const LandingPage = () => {
  return (
    <div>
      <div>
        <HomeHeader />
      </div>
      <HomeContent />
      <Footer />
    </div>
  );
};

export default LandingPage;
