import { lazy } from "react";

// project import
import Loadable from "../Components/PageLoading/Loadable";
import AdminLayout from "../Layouts/admin";
import LevelPage from "../Pages/AdminDashboard/LevelPage/LevelPage";
import SkillsPage from "../Pages/AdminDashboard/SkillsPage/SkillsPage";
import PaymentsPage from "../Pages/AdminDashboard/PaymentsPage/PaymentsPage";
import DashboardIcon from "../Components/icons/DashboardIcon";
import UsersIcon from "../Components/icons/UsersIcon";
import CategoryIcon from "../Components/icons/CategoryIcon";
import CompanyIcon from "../Components/icons/CompanyIcon";
import CreditCardIcon from "../Components/icons/CreditCardIcon";
import StarIcon from "../Components/icons/StarIcon";
// import EvaluationIcon from "../Components/icons/EvaluationIcon";
import LevelIcon from "../Components/icons/LevelIcon";
import SkillsIcon from "../Components/icons/SkillsIcon";
import ProfessionIcon from "../Components/icons/PersonalInfoIcon";

// render -

const AdminDashboard = Loadable(
  lazy(() => import("../Pages/AdminDashboard/AdminHomePage/AdminDashboard"))
);
const AdminUsersTable = Loadable(
  lazy(() => import("../Pages/AdminDashboard/UsersPage/AdminUsersTable"))
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
const ProfessionsPage = Loadable(
    lazy(() => import("../Pages/AdminDashboard/OccupationsPage/OccupationsPage"))
);
const WaitingList = Loadable(
    lazy(() => import("../Pages/AdminDashboard/WaitingList/WaitingList"))
);
// ==============================|| AUTH ROUTING ||============================== //

const AdminRoutes = {
  path: "/",
  element: <AdminLayout />,
  children: [
    {
      name: "WaitingList",
      icon: <DashboardIcon className="h-6 w-6" />,
      path: "WaitingList",
      element: <WaitingList />,
    },
    {
      name: "Dashboard",
      icon: <DashboardIcon className="h-6 w-6" />,
      path: "Dashboard",
      element: <AdminDashboard />,
    },
    {
      name: "Users",
      icon: <UsersIcon className="h-6 w-6" />,
      path: "Users",
      element: <AdminUsersTable />,
    },
    {
      name: "Organizations",
      icon: <CompanyIcon className="h-6 w-6" />,
      path: "Organizations",
      element: <CompanyPage />,
    },
    {/*the variable is null because the company table should have organization instead of company as an attribute*/},
    {
      name: "Categories",
      icon: <CategoryIcon className="h-6 w-6" />,
      path: "Categories",
      element: <Categories />,
    },
    {
      name: "Skills",
      icon: <SkillsIcon className="h-6 w-6" />,
      path: "skills",
      element: <SkillsPage />,
    },
    {
      name: "Occupations",
      icon: <SkillsIcon className="h-6 w-6" />,
      path: "occupations",
      element: <ProfessionsPage />,
    },
    {
      name: "Levels",
      icon: <LevelIcon className="h-6 w-6" />,
      path: "Level",
      element: <LevelPage />,
    },
    {
      name: "Badges",
      icon: <StarIcon className="h-6 w-6" />,
      path: "Badges",
      element: <BadgesPage />,
    },
    {
      /*
      name: "Evaluation",
      icon: <EvaluationIcon className="h-6 w-6" />,
      path: "Evaluation",
      element: <EvaluationPage />,
  */
    },
    {
      name: "Payments",
      icon: <CreditCardIcon className="h-6 w-6" />,
      path: "Payments",
      element: <PaymentsPage />,
    },
  ],
};

export default AdminRoutes;
