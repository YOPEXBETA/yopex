import React, { lazy } from "react";
import Loadable from "../Components/PageLoading/Loadable";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Chat from "../Pages/UserDashboard/ChatPage/Chat";
import NotFoundPage from "../Pages/UserDashboard/NotFoundPage/NotFoundPage";
import Company from "../Pages/UserDashboard/CompanyPage/Company";

// ==============================|| USER PAGES ||============================== //
//HomePage
const HomeLayout = Loadable(
  lazy(() => import("../Pages/UserDashboard/HomePage/index"))
);

//UserProfilePage
const UserProfileLayout = Loadable(
  lazy(() => import("../Pages/UserDashboard/UserProfile/UserProfileLayout"))
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
  lazy(() =>
    import("../Pages/UserDashboard/ContestDescriptionPage/ContestDetails")
  )
);
//BrowsePage
const BrowseLayout = Loadable(
  lazy(() => import("../Pages/UserDashboard/BrowsePage/BrowseLayout"))
);

// const AllJobs = Loadable(
//   lazy(() =>
//     import("../Pages/UserDashboard/BrowsePage/Content/WorkCards/AllJobs")
//   )
// );
const BlogDetail = Loadable(
  lazy(() =>
    import("../Pages/UserDashboard/BrowsePage/Content/WorkCards/BlogDetail")
  )
);

const PaymentSuccess = Loadable(
  lazy(() =>
    import("../Pages/UserDashboard/SettingsPage/AccountSettings/PaymentSuccess")
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
        {
          path: "MyJobs/:id",
          element: <BlogDetail />,
        },
      ],
    },
    {
      path: "/paymentSuccess",
      element: <PaymentSuccess />,
    },

    {
      path: "*",
      element: <NotFoundPage />,
    },
  ],
};

export default MainRoutes;
