import React from "react";
import LoadingSpinner from "../../../../../Components/LoadingSpinner";
import NewChallengeCard from "../../../../../Components/Cards/NewChallengeCard";
import {useSelector} from "react-redux";
import {useFetchOrganizationChallenges} from "../../../../../hooks/react-query/useCompany";


const MyOrganizationChallenges = () => {
    const { currentOrganization } = useSelector(state => state.organization);
    const { data: challenges, isLoading } = useFetchOrganizationChallenges(currentOrganization._id, {});
    return (
        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-1 gap-4">
            {isLoading ? (
                <div>
                    <LoadingSpinner />
                </div>
            ) : challenges?.length > 0 ? (
                challenges?.map((item) => (
                    <div key={item._id}>
                        <NewChallengeCard challenge={item} />
                    </div>
                ))
            ) : (
                <p className="dark:text-white">No Challenges found</p>
            )}
        </div>
    );
};

export default MyOrganizationChallenges;
