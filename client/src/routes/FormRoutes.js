import React, { lazy } from "react";
import Loadable from "../Components/PageLoading/Loadable";
import CreateFormLayout from "../Layouts/FormLayout/CreateFormLayout";

// CreateCompany component
const CreateCompany = Loadable(
    lazy(() => import("../Pages/UserDashboard/CreateCompanyPage/index"))
);
const CreateChallenge = Loadable(
    lazy(() => import("../Pages/OrganizationPages/CreateChallenge/index"))
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
    },{
      name: "Create Challenge",
      path: "create-challenge",
      element: <CreateChallenge />,
      hideInSidebar: true,
    },
  ],
};

export default FormRoutes;
