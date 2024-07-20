import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../redux/auth/authSlice";
import Loader from "../../Components/PageLoading/Loader";
import Navbar from "../../Components/Navbar/Navbar";
import routes from "../../routes/FormRoutes"; // Import routes from FormRoutes

const CreateFormLayout = (props) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ...rest } = props;
  const location = useLocation();
  const [currentRoute, setCurrentRoute] = useState("Create organization");

  useEffect(() => {
    const currentPath = location?.pathname || "";
    const matchedRoute = routes.children.find((route) =>
      currentPath.includes(route.path)
    );

    if (matchedRoute) {
      setCurrentRoute(matchedRoute.name);
    }
  }, [location.pathname, routes.children]);

  useEffect(() => {
    if (!user) {
      dispatch(getCurrentUser()).then((response) => {
        if (!response.payload) {
          navigate("/login?redirect=" + location.pathname);
        }
      });
    }
  }, [dispatch, user]);

  if (!user) {
    return <Loader />;
  }

  return (
    <div className="w-full h-screen bg-gradient-to-r from-indigo-500 via-blue-500 to-green-500 background-animate dark:!bg-zinc-900">
      <div className="h-screen">
        {/*<Navbar brandText={currentRoute} {...rest} />*/}

        <div className="mb-auto h-full min-h-[91vh] md:mx-32">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CreateFormLayout;
