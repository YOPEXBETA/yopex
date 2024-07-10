import React from 'react';
import Card from '../../../../Components/Cards';
import OrganizationTypeCard from "../../../../Components/Cards/OrganizationTypeCard";

const OrganizationTypeStep = ({onNext}) => {
    const handleCardClick = (type) => {
        onNext(type);
    };

    return (
        <div>
            <div className="text-center mb-10">
                <h2 className="text-2xl font-bold">What kind of organization do you want to create?</h2>
            </div>
            <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
                <OrganizationTypeCard onClick={() => handleCardClick('company')}>
                    <div className="card-content">
                        <h3 className="text-xl font-bold text-center py-4">Lead Your Company to Success</h3>
                        <p className="text-gray-700 text-base px-6 pb-4">
                            Post new offers, discover top talent, and watch your business thrive.
                        </p>
                    </div>
                </OrganizationTypeCard>
                <OrganizationTypeCard onClick={() => handleCardClick('university')}>
                    <div className="card-content">
                        <h3 className="text-xl font-bold text-center py-4">Fuel Your Academic Journey</h3>
                        <p className="text-gray-700 text-base px-6 pb-4">
                            Engage with professors, explore new knowledge, and shape your future.
                        </p>
                    </div>
                </OrganizationTypeCard>
                <OrganizationTypeCard onClick={() => handleCardClick('club')}>
                    <div className="card-content">
                        <h3 className="text-xl font-bold text-center py-4">Connect with Your Tribe</h3>
                        <p className="text-gray-700 text-base px-6 pb-4">
                            Discover shared interests, network with like-minded people, and build lasting friendships.
                        </p>
                    </div>
                </OrganizationTypeCard>
                <OrganizationTypeCard onClick={() => handleCardClick('NGO')}>
                    <div className="card-content">
                        <h3 className="text-xl font-bold text-center py-4">Be a Force for Good</h3>
                        <p className="text-gray-700 text-base px-6 pb-4">
                            Make a positive impact, find volunteers, and join a movement that matters.
                        </p>
                    </div>
                </OrganizationTypeCard>
            </div>
        </div>
    );
};

export default OrganizationTypeStep;
