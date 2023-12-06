import React, { useState } from "react";
import BrowseContentPage from "./Content/BrowseContentPage";
import BrowseContestsHeader from "./Header/BrowseContestsHeader";
import BrowseJobsHeader from "./Header/BrowseJobsHeader";

const BrowseLayout = () => {
  const [contestQuery, setContestQuery] = useState("");
  const [jobQuery, setJobQuery] = useState("");
  const [selectedCategory, setCategoryQuery] = useState([]);
  const [selectedSkill, setSkillQuery] = useState([]);
  const [value, setValue] = useState(0);
  const changeValue = (newValue) => {
    setValue(newValue);
  };

  return (
    <div className="md:space-y-6 space-y-1">
      {value === 0 && (
        <BrowseContestsHeader
          setContestQuery={setContestQuery}
          value={value}
          changeValue={changeValue}
          selectedSkill={selectedSkill}
          selectedCategory={selectedCategory}
        />
      )}
      {value === 1 && (
        <BrowseJobsHeader
          setJobQuery={setJobQuery}
          setCategoryQuery={setCategoryQuery}
          setSkillQuery={setSkillQuery}
          value={value}
          changeValue={changeValue}
          selectedSkill={selectedSkill}
          selectedCategory={selectedCategory}
        />
      )}

      <div className="mx-auto container">
        <div className="xl:mt-1 mt-0">
          <BrowseContentPage
            jobQuery={jobQuery}
            selectedCategory={selectedCategory}
            selectedSkill={selectedSkill}
            setCategoryQuery={setCategoryQuery}
            setSkillQuery={setSkillQuery}
            contestQuery={contestQuery}
            value={value}
          />
        </div>
      </div>
    </div>
  );
};

export default BrowseLayout;
