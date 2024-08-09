import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {useFetchOrganizationChallenges} from "../../../hooks/react-query/useCompany";
import {useSelector} from "react-redux";
import OrganizationChallengesHeader from "./Components/OrganizationChallengesHeader";
import OrganizationChallenges from "./Components/OrganizationChallenges";
import useDebounce from "../../../hooks/useDebounce";

const OrganizationChallengesPage = () => {
    const [challengeQuery, setChallengeQuery] = useState("");
    const [selectedCategory, setCategoryQuery] = useState([]);
    const [selectedSkill, setSkillQuery] = useState([]);
    const { currentOrganization } = useSelector(state => state.organization);

    // Get the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get("success");
    const error = urlParams.get("error");

    useEffect(() => {
        if (success) {
            toast.success("Payment successful");
        }
        if (error) {
            toast.error("Payment failed");
        }
    }, [success, error]);

    const [minAmount, setMinAmount] = useState(null);
    const [maxAmount, setMaxAmount] = useState(null);

    const organizationId = currentOrganization?._id;
    const debouncedChallengeQuery = useDebounce(challengeQuery, 500);
    const { data: challenges, isLoading } = useFetchOrganizationChallenges(
        organizationId,
        {
            query: debouncedChallengeQuery,
            min: minAmount,
            max: maxAmount,
            categories: selectedCategory,
            skills: selectedSkill,
        }
    );

    return (
        <div className="flex flex-col gap-6">
            <OrganizationChallengesHeader
                setChallengeQuery={setChallengeQuery}
                selectedSkill={selectedSkill}
                selectedCategory={selectedCategory}
                setMinAmount={setMinAmount}
                setMaxAmount={setMaxAmount}
                setSkillQuery={setSkillQuery}
                setCategoryQuery={setCategoryQuery}
            />

            <div className="grid grid-cols-2 md:grid-cols-12 gap-2">
                <div className="lg:col-span-12 col-span-12">
                    <OrganizationChallenges
                        challenges={challenges}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </div>
    );
};

export default OrganizationChallengesPage;
