import React, { useState } from "react";
import {useSelector} from "react-redux";
import OrganizationProfileCard from "../../../Components/Cards/OrganizationProfileCard";
import OrganizationDescriptionCard from "../../../Components/Cards/OrganizationDescriptionCard";
import { OrganizationNavigationTab } from "../../../Components/Tabs/OrganizationNavigationTab";
import OrganizationPageContent from "./components/OrganizationPageContent";

const OrganizationProfile = ({ }) => {
    const { currentOrganization } = useSelector(state => state.organization);
    const [value, setValue] = useState(0);
    const changeValue = (newValue) => {
      setValue(newValue);
    };
    return (

        <div className="space-y-2">
            <OrganizationProfileCard currentOrganization={currentOrganization} />
            <OrganizationNavigationTab changeValue={changeValue} value={value}/>
            <OrganizationPageContent currentOrganization={currentOrganization} value={value} changeValue={changeValue} />
        </div>
    );
};

export default OrganizationProfile;
