import React from "react";
import NewChallengeCard from "../../../../Components/Cards/NewChallengeCard";
import LoadingSpinner from "../../../../Components/LoadingSpinner";
import TeamChallengeCard from "../../../../Components/Cards/TeamChallengeCard";

const TeamChallenges = ({ teamChallenges, isLoading }) => {
    const sortedChallenges = teamChallenges
        ? teamChallenges
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
                sortedChallenges?.map((item) => (
                    <div>
                        <TeamChallengeCard key={item._id} teamChallenge={item} />
                    </div>
                ))
            ) : (
                <p className="dark:text-white">No Challenges found</p>
            )}
        </div>
    );
};

export default TeamChallenges;
