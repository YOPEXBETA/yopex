import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import OrganizationSideBar from "./Components/SideBar/organizationSideBar";
import routes from "../../routes/OrganizationRoutes";
import { useCurrentOrganization } from "../../hooks/react-query/useCompany";
import { fetchCurrentOrganization } from "../../redux/organization/organizationSlice";
import { useSelector, useDispatch } from "react-redux";
import OrganizationNavbar from "./Components/NavBar/organizarionNavbar";
import {getCurrentUser} from "../../redux/auth/authSlice";

const OrganizationLayout = (props) => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [currentRoute, setCurrentRoute] = useState("dashboard");
  const { ...rest } = props;
  const { organizationId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser()).then((response) => {
      const fetchedUser = response.payload;
      if (fetchedUser) {
        if (fetchedUser.currentWorkspace.label !== "Organization") {
          navigate("/feed");
        }
      } else {
        navigate("/login?redirect=" + location.pathname);
      }
    });
  }, [dispatch, navigate, location.pathname]);

  
  useEffect(() => {
    dispatch(fetchCurrentOrganization(organizationId));
  }, [dispatch, organizationId]);

  const currentOrganization = useSelector(
    (state) => state.organization.currentOrganization
  );
  const isLoading = useSelector((state) => state.organization.loading);
  const error = useSelector((state) => state.organization.error);

  useEffect(() => {
    if (!currentOrganization || currentOrganization._id !== organizationId) {
      dispatch(fetchCurrentOrganization(organizationId));
    }
  }, [dispatch, organizationId, currentOrganization]);




  const handleNavigation = (route) => {
    setCurrentRoute(route);
    navigate(`/organization/${route}`);
  };

  React.useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);

  React.useEffect(() => {
    if (matchedRoute) {
      setCurrentRoute(matchedRoute.name);
    }
  }, [location.pathname, routes.children]);

  const currentPath = location?.pathname || "";
  const matchedRoute = routes.children.find((route) =>
    currentPath.includes(route.path)
  );

  const isChatRoute = currentRoute?.toLowerCase() === "chat" || false;

  return (
    <div>
      <div>
        <div className="flex h-full w-full">
          <OrganizationSideBar
            open={open}
            onClose={() => setOpen(false)}
            currentRoute={currentRoute}
            handleNavigation={handleNavigation}
          />
          <div className="h-full w-full bg-white dark:!bg-zinc-900">
            <main
              className={`h-full flex-none transition-all  ${
                matchedRoute?.customWidth ? "xl:ml-[100px]" : "xl:ml-[296px]"
              }`}
            >
              <div className="h-full">
                <OrganizationNavbar
                  onOpenSidenav={() => setOpen(true)}
                  brandText={currentRoute}
                  {...rest}
                />
                <div
                  className={`mb-auto min-h-[90vh] ${
                    isChatRoute ? "" : " mt-4 md:mx-6 md:p-2"
                  }`}
                >
                  <Outlet />
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationLayout;
