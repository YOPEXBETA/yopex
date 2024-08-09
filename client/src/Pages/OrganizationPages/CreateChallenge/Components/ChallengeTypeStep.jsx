import React from "react";
import OrganizationTypeCard from "../../../../Components/Cards/OrganizationTypeCard";

const ChallengeTypeStep = ({ onNext }) => {
    const handleCardClick = (type) => {
        onNext(type);
    };

    return (
        <div>
            <div className="text-center mb-10">
                <h2 className="text-2xl font-bold text-left dark:text-white">
                    What is the target audience for your challenge?
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                    Choose who will participate in your challenge. This will help tailor the challenge requirements and evaluation criteria.
                </p>
            </div>
            <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
                <OrganizationTypeCard onClick={() => handleCardClick("Individual")}>
                    <div className="card-content">
                        <h3 className="text-xl font-bold text-center py-4">Individuals</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Designed for single participants who will compete or contribute on their own. Ideal for personal projects or individual skills challenges.
                        </p>
                    </div>
                </OrganizationTypeCard>
                <OrganizationTypeCard onClick={() => handleCardClick("Team")}>
                    <div className="card-content">
                        <h3 className="text-xl font-bold text-center py-4">Teams</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Meant for groups of people working together. Perfect for collaborative projects, team-based competitions, or joint skill development.
                        </p>
                    </div>
                </OrganizationTypeCard>
            </div>
        </div>
    );
};

export default ChallengeTypeStep;
