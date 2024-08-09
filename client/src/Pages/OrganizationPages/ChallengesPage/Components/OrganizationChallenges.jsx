import React from "react";
import NewChallengeCard from "../../../../Components/Cards/NewChallengeCard";
import LoadingSpinner from "../../../../Components/LoadingSpinner";

const OrganizationChallenges = ({ challenges, isLoading }) => {
    // Sort challenges by the newest ones first
    const sortedChallenges = challenges
        ? challenges
            .slice()
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        : [];

    return (
        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-1 gap-4">
            {isLoading ? (
                <div>
                    <LoadingSpinner />
                </div>
            ) : sortedChallenges.length > 0 ? (
                sortedChallenges.map((item) => (
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

export default OrganizationChallenges;
