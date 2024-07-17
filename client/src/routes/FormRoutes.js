import React, { lazy } from "react";
import Loadable from "../Components/PageLoading/Loadable";
import CreateFormLayout from "../Layouts/FormLayout/CreateFormLayout";

// CreateCompany component
const CreateCompany = Loadable(
  lazy(() => import("../Pages/UserDashboard/CreateCompanyPage/index"))
);

const FormRoutes = {
  path: "/",
  element: <CreateFormLayout />,
  children: [
    {
      name: "Create organization",
      path: "create-organization",
      element: <CreateCompany />,
      hideInSidebar: true,
    },
  ],
};

export default FormRoutes;
