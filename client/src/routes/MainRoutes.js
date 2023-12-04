import React, { lazy } from "react";
import Loadable from "../Components/PageLoading/Loadable";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import PaymentFail from "../Pages/UserDashboard/SettingsPage/AccountSettings/Billing/PaymentFail";
import Store from "../Pages/UserDashboard/StorePage/Store";

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
      path: "feed",
      element: <HomeLayout />,
    },

    {
      path: "/profile/:userId",
      element: <UserProfileLayout />,
    },
    {
      path: "/company/:companyId",
      element: <Company />,
    },
    {
      path: "/leaderboard",
      element: <LeaderBoardLayout />,
    },
    {
      path: "/settings",
      element: <SettingsLayout />,
    },
    {
      path: "/create-job-offer",
      element: <CreateJobOffer />,
    },
    {
      path: "/create-challenge",
      element: <CreateChallenge />,
    },
    {
      path: "/create-company",
      element: <CreateCompany />,
    },
    {
      path: "/create-post",
      element: <CreatePost />,
    },
    {
      path: "/postDetails/:id",
      element: <PostDetails />,
    },
    {
      path: "/store",
      element: <Store />,
    },
    {
      path: "/chat",
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
      path: "/browse",
      children: [
        {
          index: true,
          element: <BrowseLayout />,
        },

        {
          path: "contestDetails/:id",
          element: <ContestDetails />,
        },
      ],
    },
    {
      path: "/paymentSuccess",
      element: <PaymentSuccess />,
    },
    {
      path: "/paymentFail",
      element: <PaymentFail />,
    },

    {
      path: "*",
      element: <NotFoundPage />,
    },
    {
      path: "/Notifications",
      element: <MobileNotifications />,
    },
  ],
};

export default MainRoutes;
