import React, {useState} from "react";
import OrganizationJobSearchFilter from "./components/OrganizationJobSearchFilter";
import OrganizationJobs from "./components/OrganizationJobs";


const JobsPage = ({}) => {
    const [jobQuery, setJobQuery] = useState("");
    const [selectedSkill, setSkillQuery] = useState([]);
    const [selectedJobType, setSelectedJobType] = useState([]);
    const [selectedOfferType, setSelectedOfferType] = useState([]);

    return (
        <div className="flex flex-col gap-6">
            <OrganizationJobSearchFilter
                setJobQuery={setJobQuery}
                setSkillQuery={setSkillQuery}
                setSelectedJobType={setSelectedJobType}
                setSelectedOfferType={setSelectedOfferType}
                selectedSkill={selectedSkill}
                selectedJobType={selectedJobType}
                selectedOfferType={selectedOfferType}
            />
            <OrganizationJobs
                searchQuery={jobQuery}
                selectedSkill={selectedSkill}
                selectedJobType={selectedJobType}
                selectedOfferType={selectedOfferType}
                setSkillQuery={setSkillQuery}
                setSelectedJobType={setSelectedJobType}
            />
        </div>
    );
};

export default JobsPage;
