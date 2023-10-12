import React from "react";
import FireBaseSocialIcons from "./components/FirebaseSocialIcons";

function GoogleSignIn({ mode }) {
  const handleSignIn = () => {
    window.open("https://yopex-api.tabaani.co/auth/google", "_self");
  };

  return (
    <div>
      {/* {isActionCompleted && <AlertContainer />} */}
      <FireBaseSocialIcons  handleSignIn={handleSignIn} />
    </div>
  );
}

export default GoogleSignIn;
