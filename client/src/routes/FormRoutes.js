import React, { lazy } from "react";
import Loadable from "../Components/PageLoading/Loadable";
import CreateOrganizationLayout from "../Layouts/CreateCompany/CreateCopanyLayout";

// CreateCompany component
const CreateCompany = Loadable(
    lazy(() => import("../Pages/UserDashboard/CreateCompanyPage/index"))
);

const FormRoutes = {
    path: "/",
    element: <CreateOrganizationLayout />,
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
