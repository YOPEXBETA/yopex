import { lazy } from "react";

// project import
import Loadable from "../Components/PageLoading/Loadable";
import AdminLayout from "../Layouts/admin";
import {
  MdDashboard,
  MdBusiness,
  MdPeople,
  MdCategory,
  MdAssessment,
  MdStar,
  MdTrendingUp,
  MdCode,
} from "react-icons/md";

import LevelPage from "../Pages/AdminDashboard/LevelPage/LevelPage";
import SkillsPage from "../Pages/AdminDashboard/SkillsPage/SkillsPage";
import PaymentsPage from "../Pages/AdminDashboard/PaymentsPage/PaymentsPage";

// render -

const AdminDashboard = Loadable(
  lazy(() => import("../Pages/AdminDashboard/AdminHomePage/AdminDashboard"))
);
const UsersPage2 = Loadable(
  lazy(() => import("../Pages/AdminDashboard/UsersPage/UsersPage2"))
);
const CompanyPage = Loadable(
  lazy(() => import("../Pages/AdminDashboard/CompanyPage/CompanyPage"))
);
const EvaluationPage = Loadable(
  lazy(() => import("../Pages/AdminDashboard/EvaluationPage/EvaluationPage"))
);
const BadgesPage = Loadable(
  lazy(() => import("../Pages/AdminDashboard/BadgesPage/BadgesPage"))
);
const Categories = Loadable(
  lazy(() => import("../Pages/AdminDashboard/Categories/Categories"))
);
// ==============================|| AUTH ROUTING ||============================== //

const AdminRoutes = {
  path: "/",
  element: <AdminLayout />,
  children: [
    {
      icon: <MdDashboard className="h-6 w-6" />,
      path: "Dashboard",
      element: <AdminDashboard />,
    },
    {
      icon: <MdPeople className="h-6 w-6" />,
      path: "Users",
      element: <UsersPage2 />,
    },
    {
      icon: <MdBusiness className="h-6 w-6" />,
      path: "Companies",
      element: <CompanyPage />,
    },
    {
      icon: <MdCategory className="h-6 w-6" />,
      path: "Categories",
      element: <Categories />,
    },
    {
      icon: <MdCode className="h-6 w-6" />,
      path: "skills",
      element: <SkillsPage />,
    },
    {
      icon: <MdTrendingUp className="h-6 w-6" />,
      path: "Level",
      element: <LevelPage />,
    },
    {
      icon: <MdStar className="h-6 w-6" />,
      path: "Badges",
      element: <BadgesPage />,
    },
    {
      icon: <MdAssessment className="h-6 w-6" />,
      path: "Evaluation",
      element: <EvaluationPage />,
    },
    {
      icon: <MdAssessment className="h-6 w-6" />,
      path: "Payments",
      element: <PaymentsPage />,

    }
  ],
};

export default AdminRoutes;
