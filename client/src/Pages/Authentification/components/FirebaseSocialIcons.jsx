import React from "react";
import FaceIcon from "@mui/icons-material/Face";
import GoogleIcon from "../../../assets/images/icons/google.svg";

const FireBaseSocialIcons = ({
  showbutton,
  handleSignIn,
  handleShowWebcam,
}) => {
  return (
    <div className="flex flex-row space-x-2 sm:space-x-4 justify-between items-center px-2 mt-4">
      {!showbutton && (
        <button
          className="w-full flex items-center justify-center border border-secondary text-secondary py-3 hover:bg-slate-50 dark:hover:bg-green-600   px-4 rounded-lg hover:bg-secondary"
          onClick={handleSignIn}
        >
          <img src={GoogleIcon} alt="Google" className="w-6 h-6 mr-1 " />
          <span className="hidden sm:inline dark:text-white">Google</span>
        </button>
      )}
      {showbutton && (
        <button
          className="flex items-center border border-secondary text-secondary py-2 px-4 rounded-full hover:bg-secondary hover:text-white transition duration-300 ease-in-out"
          onClick={handleShowWebcam}
        >
          <FaceIcon className="w-6 h-6 mr-1" />
          <span className="hidden sm:inline">Face Recognition</span>
        </button>
      )}
    </div>
  );
};

export default FireBaseSocialIcons;
