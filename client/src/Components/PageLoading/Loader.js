import React, { useState, useEffect } from "react";
import yopexLogo from "./../../../src/images/LogoYopex.png";
import LoadingProgress from "./LoadingProgress";
//import { useRedirect } from "../../utils/useRedirect";

const Loader = ({ backgroundColor, delay }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  //useRedirect();

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prevProgress) =>
        prevProgress < 100 ? prevProgress + 10 : 100
      );
    }, delay);

    setTimeout(() => {
      clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [delay]);

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-${backgroundColor}`}
    >
      <div className="flex flex-col items-center">
        <img src={yopexLogo} alt="logo" className="mb-4 w-11 h-11" />

        <LoadingProgress
          progress={loadingProgress}
          duration={delay}
          backgroundColor={backgroundColor}
        />
      </div>
    </div>
  );
};

export default Loader;
