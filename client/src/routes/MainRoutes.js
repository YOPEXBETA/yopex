import React, { lazy } from "react";
import Loadable from "../Components/PageLoading/Loadable";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import PaymentFail from "../Pages/UserDashboard/SettingsPage/AccountSettings/Billing/PaymentFail";
import Store from "../Pages/UserDashboard/StorePage/Store";
import LeaderboardIcon from "../Components/icons/LeaderboardIcon";
import StoreIcon from "../Components/icons/StoreIcon";
import SettingsIcon from "../Components/icons/SettingsIcon";
import ChatIcon from "../Components/icons/ChatIcon";
import ContestIcon from "../Components/icons/ContestIcon";
import JobIcon from "../Components/icons/JobIcon";
import ProjectIcon from "../Components/icons/ProjectIcon";
import DiscoverIcon from "../Components/icons/DiscoverIcon";
import DashIcon from "../Components/icons/DashIcon";

// ==============================|| USER PAGES ||============================== //
//HomePage
const HomeLayout = Loadable(
  lazy(() => import("../Pages/UserDashboard/HomePage/index"))
);
//Discover
const DiscoverTalentsLayout = Loadable(
  lazy(() => import("../Pages/UserDashboard/DiscoverTalentsPage/Index"))
);
//CreateCompany
const CreateCompany = Loadable(
  lazy(() => import("../Pages/UserDashboard/CreateCompanyPage/index"))
);
//CreateProject
const PostDetails = Loadable(
  lazy(() => import("../Pages/UserDashboard/PostDetailsPage/index"))
);
//HomePage
const MobileNotifications = Loadable(
  lazy(() => import("../Components/Mobile/MobileNotifications"))
);

//CompanyPage
const Company = Loadable(
  lazy(() => import("../Pages/UserDashboard/CompanyPage/index"))
);

//NotFoundPage
const NotFoundPage = Loadable(
  lazy(() => import("../Pages/UserDashboard/NotFoundPage/NotFoundPage"))
);

//Messenger
const Messenger = Loadable(
  lazy(() => import("../Pages/UserDashboard/MessengerPage/Index"))
);

//UserProfilePage
const UserProfileLayout = Loadable(
  lazy(() => import("../Pages/UserDashboard/UserProfile/index"))
);
//LeaderBoardPage
const LeaderBoardLayout = Loadable(
  lazy(() => import("../Pages/UserDashboard/LeaderBoardPage/index"))
);
//SettingsPage
const SettingsLayout = Loadable(
  lazy(() => import("../Pages/UserDashboard/SettingsPage/SettingsLayout"))
);
//ContestDetailsPage
const ContestDetails = Loadable(
  lazy(() => import("../Pages/UserDashboard/ContestDescriptionPage/index"))
);

//BrowsePage
const BrowseLayout = Loadable(
  lazy(() => import("../Pages/UserDashboard/BrowsePage/Index"))
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

const paymentFail = Loadable(
  lazy(() =>
    import(
      "../Pages/UserDashboard/SettingsPage/AccountSettings/Billing/PaymentFail"
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
      name: "Feed",
      path: "feed",
      icon: <DashIcon className="h-6 w-6" />,
      element: <HomeLayout />,
    },
    {
      name: "Discover",
      icon: <DiscoverIcon className="h-6 w-6" />,
      path: "discover",
      customWidth: true,
      children: [
        {
          index: true,
          element: <DiscoverTalentsLayout />,
          customWidth: true,
        },
      ],
    },
    {
      name: "Jobs",
      icon: <JobIcon className="h-6 w-6" />,
      path: "/jobs",
      element: <JobLayout />,
      customWidth: true,
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
      name: "Profile",
      path: "/profile",
      children: [{ path: ":userId", element: <UserProfileLayout /> }],
      hideInSidebar: true,
      customWidth: true,
    },
    {
      name: "Company",
      path: "/company",
      children: [{ path: ":companyId", element: <Company /> }],
      hideInSidebar: true,
      customWidth: false,
    },
    {
      name: "Leaderboard",
      path: "leaderboard",
      element: <LeaderBoardLayout />,
      icon: <LeaderboardIcon />,
      customWidth: true,
    },
    {
      name: "Chat",
      path: "chat",
      icon: <ChatIcon />,
      customWidth: true,
      hideInSidebar: false,
      children: [
        {
          index: true,
          element: <Messenger />,
        },
        {
          path: ":selectedConversationId",
          element: <Messenger />,
        },
      ],
    },
    {
      name: "Settings",
      path: "settings",
      element: <SettingsLayout />,
      icon: <SettingsIcon />,
    },
    {
      name: "Create company",
      path: "create-company",
      element: <CreateCompany />,
      hideInSidebar: true,
    },

    {
      name: "post Details",
      path: "/postDetails",
      children: [{ path: ":id", element: <PostDetails /> }],
      hideInSidebar: true,
      customWidth: false,
    },

    {
      path: "/paymentSuccess",
      element: <PaymentSuccess />,
      hideInSidebar: true,
    },

    {
      path: "*",
      element: <NotFoundPage />,
      hideInSidebar: true,
    },
    {
      path: "/Notifications",
      element: <MobileNotifications />,
      hideInSidebar: true,
    },
  ],
};

export default MainRoutes;
