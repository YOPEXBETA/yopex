import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useChallengeById } from "../../../hooks/react-query/useChallenges";
import Banner from "./TopSide/Banner";
import ContentSide from "./leftSide/ContentSide";

const ContestDetails = () => {
  const [value, setValue] = useState(0);
  const changeValue = (newValue) => {
    setValue(newValue);
  };
  const { id: challengeId } = useParams();
  const { data: challenge } = useChallengeById(challengeId);

  if (challenge) {
    return (
      <div className="space-y-6 bg-white h-screen">
        <Banner value={value} changeValue={changeValue} />
        <div className="grid grid-cols-12 gap-4 px-6 lg:px-8 xl:px-32">
          <div className="col-span-12 ">
            <ContentSide value={value} />
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default ContestDetails;
