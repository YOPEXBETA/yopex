import React, { lazy } from "react";
import Loadable from "../Components/PageLoading/Loadable";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import PaymentFail from "../Pages/UserDashboard/SettingsPage/AccountSettings/PaymentFail";
import Store from "../Pages/UserDashboard/StorePage/Store";

// ==============================|| USER PAGES ||============================== //
//HomePage
const HomeLayout = Loadable(
  lazy(() => import("../Pages/UserDashboard/HomePage/index"))
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

const paymentFail = Loadable(
  lazy(() =>
    import("../Pages/UserDashboard/SettingsPage/AccountSettings/PaymentFail")
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
      path: "/paymentFail",
      element: <PaymentFail />,
    },

    {
      path: "*",
      element: <NotFoundPage />,
    },
  ],
};

export default MainRoutes;
