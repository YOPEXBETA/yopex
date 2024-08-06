import React, { useState } from "react";
import {useJobById, useJobs} from "../../../../hooks/react-query/useJobs";
import LoadingSpinner from "../../../../Components/LoadingSpinner";
import WorkCard from "../../../../Components/Cards/WorkCard";
import OrganizationWorkCard from "./OrganizationWorkCard";
import {useSelector} from "react-redux";
import useDebounce from "../../../../hooks/useDebounce";

const OrganizationJobs = ({
                  searchQuery,
                  selectedSkill,
                  selectedJobType,
                  selectedOfferType,
              }) => {
    // ==============================|| JOB CARD MODAL ||============================== //
    const [openJobModal, setOpenJobModal] = useState(false);
    const { currentOrganization } = useSelector(state => state.organization);
    const handleClickOpenModalJob = () => {
        setOpenJobModal(true);
    };

    const debouncedJobQuery = useDebounce(searchQuery, 500);
    const { data: jobs, isLoading } = useJobById(
        currentOrganization?._id,
        debouncedJobQuery,
        selectedSkill,
        selectedJobType,
        selectedOfferType
    );

    const sortedJobs = jobs
        ? jobs.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        : [];

    console.log('jobs', jobs)
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-2 xl:grid-cols-1 mb-16 xl:mb-4">
                {isLoading ? (
                    <div>
                        <LoadingSpinner />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-2">
                        {sortedJobs?.length > 0 ? (
                            sortedJobs?.map((job) => (
                                <div key={job._id} onClick={() => handleClickOpenModalJob(job)}>
                                    <OrganizationWorkCard job={job} />
                                </div>
                            ))
                        ) : (
                            <p className="dark:text-white">No job found</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrganizationJobs;
