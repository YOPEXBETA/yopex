import React, { useState } from "react";
import Jobs from "./components/Jobs";
import JobSearchFilter from "./components/JobSearchFilter";

const Index = () => {
  const [jobQuery, setJobQuery] = useState("");
  const [selectedCategory, setCategoryQuery] = useState([]);
  const [selectedSkill, setSkillQuery] = useState([]);

  return (
    <div className="flex flex-col gap-10">
      <JobSearchFilter
        setJobQuery={setJobQuery}
        setCategoryQuery={setCategoryQuery}
        setSkillQuery={setSkillQuery}
        selectedSkill={selectedSkill}
        selectedCategory={selectedCategory}
      />
      <Jobs
        jobQuery={jobQuery}
        selectedCategory={selectedCategory}
        selectedSkill={selectedSkill}
        setCategoryQuery={setCategoryQuery}
        setSkillQuery={setSkillQuery}
      />
    </div>
  );
};

export default Index;
