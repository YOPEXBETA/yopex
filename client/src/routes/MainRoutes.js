import React, { lazy } from "react";
import Loadable from "../Components/PageLoading/Loadable";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import PaymentFail from "../Pages/UserDashboard/SettingsPage/AccountSettings/Billing/PaymentFail";
import Store from "../Pages/UserDashboard/StorePage/Store";
import BrowseIcon from "../Components/icons/BrowseIcon";
import LeaderboardIcon from "../Components/icons/LeaderboardIcon";
import StoreIcon from "../Components/icons/StoreIcon";
import SettingsIcon from "../Components/icons/SettingsIcon";
import ChatIcon from "../Components/icons/ChatIcon";

// ==============================|| USER PAGES ||============================== //
//HomePage
const HomeLayout = Loadable(
  lazy(() => import("../Pages/UserDashboard/HomePage/index"))
);
//CreateJobOffer
const CreateJobOffer = Loadable(
  lazy(() => import("../Pages/UserDashboard/CreateJobOfferPage/index"))
);
//CreateChallenge
const CreateChallenge = Loadable(
  lazy(() => import("../Pages/UserDashboard/CreateChallengePage/index"))
);
//CreateCompany
const CreateCompany = Loadable(
  lazy(() => import("../Pages/UserDashboard/CreateCompanyPage/index"))
);
//CreateProject
const CreatePost = Loadable(
  lazy(() => import("../Pages/UserDashboard/CreatePostPage/index"))
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

//NotFoundPage
const Chat = Loadable(
  lazy(() => import("../Pages/UserDashboard/ChatPage/Chat"))
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
  lazy(() => import("../Pages/UserDashboard/BrowsePage/BrowseLayout"))
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
      element: <HomeLayout />,
    },
    {
      name: "Browse",
      icon: <BrowseIcon className="h-6 w-6" />,
      path: "browse",
      customWidth: true,
      children: [
        {
          index: true,
          element: <BrowseLayout />,
          customWidth: true,
        },
        {
          path: "contestDetails/:id",
          element: <ContestDetails />,
          hideInSidebar: true,
          customWidth: false,
        },
      ],
    },
    {
      path: "/profile/:userId",
      element: <UserProfileLayout />,

      hideInSidebar: true,
    },
    {
      path: "/company/:companyId",
      element: <Company />,
      hideInSidebar: true,
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

      children: [
        {
          index: true,
          element: <Chat />,
        },
        {
          path: ":selectedConversationId",
          element: <Chat />,
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
      path: "/create-job-offer",
      element: <CreateJobOffer />,
      hideInSidebar: true,
    },
    {
      path: "create-challenge",
      element: <CreateChallenge />,
      hideInSidebar: true,
    },
    {
      name: "Create company",
      path: "create-company",
      element: <CreateCompany />,
      hideInSidebar: true,
    },
    {
      path: "create-post",
      element: <CreatePost />,
      hideInSidebar: true,
    },
    {
      path: "/postDetails/:id",
      element: <PostDetails />,
      hideInSidebar: true,
    },
    {
      name: "Store",
      path: "store",
      element: <Store />,
      icon: <StoreIcon className="h-6 w-6" />,
    },

    {
      path: "/paymentSuccess",
      element: <PaymentSuccess />,
      hideInSidebar: true,
    },
    {
      path: "/paymentFail",
      element: <PaymentFail />,
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
