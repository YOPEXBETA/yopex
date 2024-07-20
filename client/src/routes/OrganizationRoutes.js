import React, { lazy } from "react";
import Loadable from "../Components/PageLoading/Loadable";
import DashboardIcon from "../Components/icons/DashboardIcon";

import SettingsIcon from "../Components/icons/SettingsIcon";
import OrganizationLayout from "../Layouts/Organization Layout/OrganizationLayout";

// ==============================|| ORGANIZATION PAGES ||============================== //
//DashboardPage
const Dashboard = Loadable(
    lazy(() => import("../Pages/OrganizationPages/DashboardPage/DashboardPage"))
);
//Challenges
const Challenges = Loadable(
    lazy(() => import("../Pages/OrganizationPages/ChallengesPage/ChallengesPage"))
);
//Applicants
const Applicants = Loadable(
    lazy(() => import("../Pages/OrganizationPages/ApplicantsPage/ApplicantsPage"))
);
//Settings
const OrganizationSettings = Loadable(
    lazy(() => import("../Pages/OrganizationPages/SettingsPage/SettingsPage"))
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
            name: "Challenges",
            path: "challenges",
            element: <Challenges />,
        },
        {
            name: "Applicants",
            path: "applicants",
            element: <Applicants />,
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
