import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import BasicStatsCard from "../../../Components/Cards/BasicStatsCard";
import {fetchCurrentOrganization} from "../../../redux/organization/organizationSlice";
import {useParams} from "react-router-dom";
import JobPostingTrends from "../../../Components/Stats/JobsPostingTrends";
import JobApplicationStats from "../../../Components/Stats/JobApplicationStats";
import JobPerformance from "../../../Components/Stats/JobPerformance";
import RoleDistribution from "../../../Components/Stats/RoleDistribution";
import NotificationTrends from "../../../Components/Stats/NotificationTrends";
import {useGetOrganizationNotifications} from "../../../hooks/react-query/useCompany";
import {useJobById} from "../../../hooks/react-query/useJobs";

const DashboardPage = () => {
    const dispatch = useDispatch();
    const {organizationId} = useParams();
    const currentOrganization = useSelector(
        (state) => state.organization.currentOrganization
    );
    useEffect(() => {
        dispatch(fetchCurrentOrganization(organizationId));
    }, [dispatch, organizationId]);
    const { data: jobs, isLoading } = useJobById(currentOrganization?._id,);
    const { data: notifications } = useGetOrganizationNotifications(currentOrganization?._id);

    const totalJobs = currentOrganization?.jobs?.length ?? 0;
    const totalChallenges = currentOrganization?.challenges?.length ?? 0;
    const organizationBalance = currentOrganization?.organizationBalance ?? 0;
    const numberOfMembers = (currentOrganization?.organizationMembers?.length ?? 0) + 1;


    const jobTitles = jobs?.map(job => job.title) ?? [];
    const applicationCounts = jobs?.map(job => job.appliers.length) ?? [];
    const jobPostingDates = jobs?.map(job => new Date(job.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })) ?? [];
    const jobPostingValues = jobs?.map(job => job.appliers.length) ?? [];

    const jobPostingData = { dates: jobPostingDates, values: jobPostingValues };
    const jobApplicationData = { jobTitles, applicationCounts };


    const members = currentOrganization?.organizationMembers || [];
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                <BasicStatsCard title="Total Number of Jobs" value={totalJobs}/>
                <BasicStatsCard title="Total Challenges" value={totalChallenges}/>
                <BasicStatsCard
                    title="Organization Balance"
                    value={`$${organizationBalance.toFixed(2)}`} // Ensure organizationBalance is a number
                />
                <BasicStatsCard title="Number of Members" value={numberOfMembers}/>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 mt-6 md:grid-cols-2 gap-6">
                <JobPostingTrends data={jobPostingData} />
                <JobApplicationStats data={jobApplicationData} />
                <RoleDistribution members={members}/>
                <NotificationTrends notifications={notifications?.notifications} />
            </div>
        </div>
    );
};

export default DashboardPage;
