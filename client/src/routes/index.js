import { useRoutes } from "react-router-dom";

// project import
import LoginRoutes from "./LoginRoutes";
import MainRoutes from "./MainRoutes";
import AdminRoutes from "./AdminRoutes";
import FormRoutes from "./FormRoutes";
import OrganizationRoutes from "./OrganizationRoutes";
// ==============================|| ROUTING RENDER ||============================== //
export default function ThemeRoutes() {
  return useRoutes([MainRoutes, LoginRoutes, AdminRoutes, FormRoutes ,OrganizationRoutes]);
}
