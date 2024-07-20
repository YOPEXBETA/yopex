import React from "react";
import {useSelector} from "react-redux";
import OrganizationProfileCard from "../../../Components/Cards/OrganizationProfileCard";
import OrganizationDescriptionCard from "../../../Components/Cards/OrganizationDescriptionCard";

const OrganizationProfile = ({ }) => {
    const { currentOrganization } = useSelector(state => state.organization);
    return (

        <div className="space-y-6">
            <OrganizationProfileCard currentOrganization={currentOrganization} />
            <OrganizationDescriptionCard currentOrganization={currentOrganization}/>
        </div>
    );
};

export default OrganizationProfile;
