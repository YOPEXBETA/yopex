import React, { lazy } from "react";
import Loadable from "../Components/PageLoading/Loadable";
import DashboardIcon from "../Components/icons/DashboardIcon";

import SettingsIcon from "../Components/icons/SettingsIcon";
import OrganizationLayout from "../Layouts/Organization Layout/OrganizationLayout";
import ContestIcon from "../Components/icons/ContestIcon";
import UsersIcon from "../Components/icons/UsersIcon";
import CompanyIcon from "../Components/icons/CompanyIcon";
import ApplicantsTable from "../Pages/OrganizationPages/ApplicantsPage/ApplicantsTable/ApplicantsTable";

// ==============================|| ORGANIZATION PAGES ||============================== //
//JobsPage
const Jobs = Loadable(
    lazy(() => import("../Pages/OrganizationPages/ApplicantsPage/JobsPage"))
);
//Challenges
const Challenges = Loadable(
    lazy(() => import("../Pages/OrganizationPages/ChallengesPage/ChallengesPage"))
);
//Dashboard
const Dashboard = Loadable(
    lazy(() => import("../Pages/OrganizationPages/DashboardPage/DashboardPage"))
);
//Settings
const OrganizationSettings = Loadable(
    lazy(() => import("../Pages/OrganizationPages/SettingsPage/Index"))
);
const OrganizationProfile = Loadable(
    lazy(() => import("../Pages/OrganizationPages/OrganizationProfile/OrganizationProfile"))
);
//NotFoundPage
const NotFoundPage = Loadable(
    lazy(() => import("../Pages/UserDashboard/NotFoundPage/NotFoundPage"))
);

// ==============================|| MAIN ORGANIZATION ROUTING ||============================== //

const OrganizationRoutes = {
    path: "/organization/:organizationId",
    element: <OrganizationLayout />,
    children: [
        {
            index: true,
            name: "Dashboard",
            path: "dashboard",
            icon: <DashboardIcon className="h-6 w-6" />,
            element: <Dashboard />,
        },
        {
            name: "Profile",
            path: "Profile",
            icon: <CompanyIcon className="h-6 w-6" />,
            element: <OrganizationProfile />,
        },
        {
            name: "Challenges",
            path: "challenges",
            icon: <ContestIcon className="h-6 w-6" />,
            element: <Challenges />,
        },
        {
            name: "Jobs",
            icon: <UsersIcon className="h-6 w-6" />,
            path: "jobs",
            element: <Jobs />,
        },
        {
            name: "Applicant Details",
            path: "jobs/:jobId/applicants",
            element: <ApplicantsTable />,
            hideInSidebar: true,
        },
        {
            name: "Settings",
            icon: <SettingsIcon className="h-6 w-6" />,
            path: "settings",
            element: <OrganizationSettings />,
        },
        {
            name: "Organization Profile",
            path: "organizationProfile",
            element: <OrganizationProfile />,
            hideInSidebar: true,
            customWidth: true,
        },
        {
            path: "*",
            element: <NotFoundPage />,
            hideInSidebar: true,
        },
    ],
};

export default OrganizationRoutes;
