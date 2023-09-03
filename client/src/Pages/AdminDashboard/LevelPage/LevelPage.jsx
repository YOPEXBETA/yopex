import React from "react";
import { useCreateLevel } from "../../../hooks/react-query/useLevels";

const LevelPage = () => {

  const { mutate } =useCreateLevel() 
  
  return <div><button onClick={mutate}>Create New Level</button></div>;
};

export default LevelPage;
