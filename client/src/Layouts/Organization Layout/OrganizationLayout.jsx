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
import CreateOrganizationChallengeModal from "../../Components/Modals/CreateOrganizationChallengeModal";
import CreateOrganizationJobOfferModal from "../../Components/Modals/CreateOrganizationJobOfferModal";
import CreateMenuModal from "../../Components/Modals/CreateMenuModal";

const OrganizationLayout = (props) => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentRoute, setCurrentRoute] = useState("dashboard");
  const { ...rest } = props;
  const { organizationId } = useParams();
  const dispatch = useDispatch();
  const handleCreateClick = () => {
    setIsModalOpen(true);
  };

  const closeCreateMenuModal = () => {
    setIsModalOpen(false);
  };


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

  const openPostChallengeModal = () => {
    navigate(`/create-challenge`);
  };

  const closePostChallengeModal = () => {
    setIsChallengeModalOpen(false); // Close the modal
  };
  const openPostJobModal = () => {
    setIsJobModalOpen(true); // Open the modal
  };

  const closePostJobModal = () => {
    setIsJobModalOpen(false); // Close the modal
  };
  return (
    <div>
      <div className="flex h-full w-full">
          <OrganizationSideBar
            open={open}
            onClose={() => setOpen(false)}
            currentRoute={currentRoute}
            handleNavigation={handleNavigation}
            onPostChallengeClick={openPostChallengeModal}
            onPostJobClick={openPostJobModal}
            handleCreateClick={handleCreateClick}

          />     
        <div className="h-full w-full bg-white dark:!bg-zinc-900">
          <main className="h-full flex-none transition-all xl:ml-[318px]">
            <div className="h-full">
                <OrganizationNavbar
                  onOpenSidenav={() => setOpen(true)}
                  brandText={currentRoute}
                  {...rest}
                />
                <div
                className={`mb-auto min-h-[90vh] ${
                  isChatRoute ? "": "mt-4 md:mx-6 md:p-2"
                }`}
              >
                  <Outlet />
                </div>
              </div>
            </main>
          </div>
        </div>
      {/*<CreateOrganizationChallengeModal
          open={isChallengeModalOpen}
          handleClose={closePostChallengeModal}
      />
      <CreateOrganizationJobOfferModal
          open={isJobModalOpen}
          handleClose={closePostJobModal}
      />*/}
   {isModalOpen && (
        <CreateMenuModal
          onClose={closeCreateMenuModal}
          handleCreateClick={handleCreateClick}
        />
      )}
    </div>
  );
};

export default OrganizationLayout;
