import React from "react";
import FireBaseSocialIcons from "./components/FirebaseSocialIcons";
// import AlertContainer from "../../Components/alerts";

function GoogleSignIn({ mode }) {
  // const [isActionCompleted, setIsActionCompleted] = useState(false);
  const handleSignIn = () => {
    window.open("http://localhost:8000/auth/google", "_self");
    
  };

  

  return (
    <div>
      {/* {isActionCompleted && <AlertContainer />} */}
      <FireBaseSocialIcons handleSignIn={handleSignIn} />
    </div>
  );
}

export default GoogleSignIn;
