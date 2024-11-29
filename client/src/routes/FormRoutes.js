import React, { lazy } from "react";
import Loadable from "../Components/PageLoading/Loadable";
import CreateFormLayout from "../Layouts/FormLayout/CreateFormLayout";

// CreateOrganization component
const CreateOrganization = Loadable(
    lazy(() => import("../Pages/UserDashboard/CreateOrganizationPage/index"))
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
      element: <CreateOrganization/>,
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
