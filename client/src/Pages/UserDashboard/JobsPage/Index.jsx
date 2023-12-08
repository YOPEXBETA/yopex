import React, { useState } from "react";
import Jobs from "./components/Jobs";
import JobSearchFilter from "./components/JobSearchFilter";

const Index = () => {
  const [jobQuery, setJobQuery] = useState("");
  const [selectedCategory, setCategoryQuery] = useState([]);
  const [selectedSkill, setSkillQuery] = useState([]);
  const [selectedJobType, setSelectedJobType] = useState([]);
  const [selectedOfferType, setSelectedOfferType] = useState([]);

  return (
    <div className="flex flex-col gap-10">
      <JobSearchFilter
        setJobQuery={setJobQuery}
        setCategoryQuery={setCategoryQuery}
        setSkillQuery={setSkillQuery}
        setSelectedJobType={setSelectedJobType}
        setSelectedOfferType={setSelectedOfferType}
        selectedSkill={selectedSkill}
        selectedCategory={selectedCategory}
        selectedJobType={selectedJobType}
        selectedOfferType={selectedOfferType}
      />
      <Jobs
        searchQuery={jobQuery}
        selectedCategory={selectedCategory}
        selectedSkill={selectedSkill}
        selectedJobType={selectedJobType}
        selectedOfferType={selectedOfferType}
        setCategoryQuery={setCategoryQuery}
        setSkillQuery={setSkillQuery}
        setSelectedJobType={setSelectedJobType}
      />
    </div>
  );
};

export default Index;
