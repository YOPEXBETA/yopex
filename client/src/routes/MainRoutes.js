import React, { lazy } from "react";
import Loadable from "../Components/PageLoading/Loadable";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import SettingsIcon from "../Components/icons/SettingsIcon";
import ContestIcon from "../Components/icons/ContestIcon";
import JobIcon from "../Components/icons/JobIcon";
import DiscoverIcon from "../Components/icons/DiscoverIcon";
import DashIcon from "../Components/icons/DashIcon";

// ==============================|| USER PAGES ||============================== //

//HomePage
const BootcamPage = Loadable(
  lazy(() => import("../Pages/UserDashboard/BootcampPage/Index"))
);
//Discover
const DiscoverTalentsLayout = Loadable(
  lazy(() => import("../Pages/UserDashboard/DiscoverTalentsPage/Index"))
);
//CreateCompany
const CreateOrganization = Loadable(
  lazy(() => import("../Pages/UserDashboard/CreateOrganizationPage/index"))
);
//HomePage
const MobileNotifications = Loadable(
  lazy(() => import("../Components/Mobile/MobileNotifications"))
);

//CompanyPage
const Organization = Loadable(
  lazy(() => import("../Pages/UserDashboard/OrganizationPage/index"))
);

//NotFoundPage
const NotFoundPage = Loadable(
  lazy(() => import("../Pages/UserDashboard/NotFoundPage/NotFoundPage"))
);

//UserProfilePage
const UserProfileLayout = Loadable(
  lazy(() => import("../Pages/UserDashboard/UserProfile/index"))
);
//SettingsPage
const SettingsLayout = Loadable(
  lazy(() => import("../Pages/UserDashboard/SettingsPage/SettingsLayout"))
);
//ContestDetailsPage
const ContestDetails = Loadable(
  lazy(() => import("../Pages/UserDashboard/ChallengeDetailsPage/index"))
);

//BrowsePage
const BrowseLayout = Loadable(
  lazy(() => import("../Pages/UserDashboard/ChallengePage/Index"))
);
//JobPage
const JobLayout = Loadable(
  lazy(() => import("../Pages/UserDashboard/JobsPage/Index"))
);

const PaymentSuccess = Loadable(
  lazy(() =>
    import(
      "../Pages/UserDashboard/SettingsPage/AccountSettings/Billing/PaymentSuccess"
    )
  )
);


// ==============================|| MAIN USER ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      index: true,
      name: "Bootcamps",
      path: "bootcamps",
      icon: <DashIcon className="h-6 w-6" />,
      element: <BootcamPage width={6} height={6} color={"grey-100"} />,
    },
    {
      name: "Challenges",
      icon: <ContestIcon className="h-6 w-6" />,
      path: "challenges",
      customWidth: true,
      children: [
        {
          index: true,
          element: <BrowseLayout />,
          customWidth: true,
        },
        {
          path: "challengeDetails/:id",
          element: <ContestDetails />,
          hideInSidebar: true,
          customWidth: false,
        },
      ],
    },
    {
      name: "Discover",
      icon: <DiscoverIcon className="h-6 w-6" />,
      path: "discover",
      customWidth: true,
      children: [
        {
          index: true,
          element: (
            <DiscoverTalentsLayout width={6} height={6} color={"grey-100"} />
          ),
          customWidth: true,
        },
      ],
    },
    {
      name: "Jobs",
      icon: <JobIcon width={6} height={6} color={"grey-100"} />,
      path: "jobs",
      element: <JobLayout />,
      customWidth: true,
    },
    {
      name: "Profile",
      path: "profile",
      children: [{ path: ":userId", element: <UserProfileLayout /> }],
      hideInSidebar: true,
      customWidth: true,
    },
    {
      name: "Organization",
      path: "organization",
      children: [
        {
          path: ":organizationId",
          element: <Organization width={6} height={6} color={"grey-100"} />,
        },
      ],
      hideInSidebar: true,
      customWidth: false,
    },
    {
      name: "Settings",
      path: "settings",
      element: <SettingsLayout width={6} height={6} color={"grey-100"} />,
      icon: <SettingsIcon />,
    },
    {
      path: "paymentSuccess",
      element: <PaymentSuccess />,
      hideInSidebar: true,
    },

    {
      path: "*",
      element: <NotFoundPage />,
      hideInSidebar: true,
    },
    {
      path: "Notifications",
      element: <MobileNotifications />,
      hideInSidebar: true,
    },
  ],
};

export default MainRoutes;
