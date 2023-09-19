import { lazy } from "react";

// ==============================|| PROJECT IMPORT ||============================== //

import Loadable from "../Components/PageLoading/Loadable";
import MinimalLayout from "../Layouts/MinimalLayout";

// ==============================|| AUTH Pages ||============================== //

const Register = Loadable(
  lazy(() => import("../Pages/Authentification/RegisterPage"))
);
const Login = Loadable(
  lazy(() => import("../Pages/Authentification/LoginPage"))
);
const ForgetPassword = Loadable(
  lazy(() => import("../Pages/Authentification/ForgetPassword"))
);

const ResetPassword = Loadable(
  lazy(() => import("../Pages/Authentification/ResetPassword"))
);

const EmailVerification = Loadable(
  lazy(() => import("../Pages/Authentification/EmailVerification"))
);

const LandingPage = Loadable(
  lazy(() => import("../Pages/LandingPage/LandingPage"))
);
// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      index: true,
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "forgetpassword",
      element: <ForgetPassword />,
    },
    {
      path: "reset-password/:resetToken",
      element: <ResetPassword />,
    },
    {
      path: "emailverification/:token",
      element: <EmailVerification />,
    },
    {
      path: "register",
      element: <Register />,
    },
    {
      path: "login",
      element: <Login />,
    },
  ],
};

export default LoginRoutes;
