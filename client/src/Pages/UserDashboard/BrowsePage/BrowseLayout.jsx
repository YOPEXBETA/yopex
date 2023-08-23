import React, { useState } from "react";
import BrowseContentPage from "./Content/BrowseContentPage";
import BrowseContestsHeader from "./Header/BrowseContestsHeader";
import BrowseJobsHeader from "./Header/BrowseJobsHeader";

const BrowseLayout = () => {
  const [contestQuery, setContestQuery] = useState("");
  const [jobQuery, setJobQuery] = useState("");
  const [value, setValue] = useState(0);
  const changeValue = (newValue) => {
    setValue(newValue);
  };

  return (
    <div className="space-y-6">
      {value === 0 && (
        <BrowseContestsHeader
          setContestQuery={setContestQuery}
          value={value}
          changeValue={changeValue}
        />
      )}
      {value === 1 && (
        <BrowseJobsHeader
          setJobQuery={setJobQuery}
          value={value}
          changeValue={changeValue}
        />
      )}

      <div className="xl:mt-1 xl:mx-40 mt-0 mx-0 ">
        <BrowseContentPage
          jobQuery={jobQuery}
          contestQuery={contestQuery}
          value={value}
        />
      </div>
    </div>
  );
};

export default BrowseLayout;
