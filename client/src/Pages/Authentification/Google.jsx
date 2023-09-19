import React from "react";
import FireBaseSocialIcons from "./components/FirebaseSocialIcons";

function GoogleSignIn({ mode }) {
  const handleSignIn = () => {
    window.open("http://199.247.3.38:8000/auth/google", "_self");
  };

  return (
    <div>
      {/* {isActionCompleted && <AlertContainer />} */}
      <FireBaseSocialIcons handleSignIn={handleSignIn} />
    </div>
  );
}

export default GoogleSignIn;
