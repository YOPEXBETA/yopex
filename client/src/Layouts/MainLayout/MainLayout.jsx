import React, { useEffect, useState } from "react";

//render the data under the navbar
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../redux/auth/authSlice";
import Loader from "../../Components/PageLoading/Loader";
import Sidebar from "../../Components/sidebar/Index";
import routes from "../../routes/MainRoutes";
import Navbar from "../../Components/Navbar/Navbar";
import CreateMenuModal from "../../Components/Modals/CreateMenuModal";

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = (props) => {
  const { user, error } = useSelector((state) => state.auth); // Assuming you have an error state in your Redux slice
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const [currentRoute, setCurrentRoute] = useState("feed");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateClick = () => {
    setIsModalOpen(true);
  };

  const closeCreateMenuModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);

  const currentPath = location?.pathname || "";
  const matchedRoute = routes.children.find((route) =>
    currentPath.includes(route.path)
  );

  React.useEffect(() => {
    if (matchedRoute) {
      setCurrentRoute(matchedRoute.name);
    }
  }, [location.pathname, routes.children]);

  useEffect(() => {
    if (!user) {
      dispatch(getCurrentUser()).then((response) => {
        // Check if fetching current user was successful
        if (response.payload) {
          // Successfully fetched user, continue rendering
        } else {
          // Fetching user failed, navigate to /login
          navigate("/login");
        }
      });
    }
  }, [dispatch, user]);

  // Render the loading state if user data is being fetched
  if (!user) {
    return <Loader />; // Or you can render a loading component
  }

  // Render the main layout once user data is available
  return (
    <div>
      <div className="flex h-full w-full">
        <Sidebar
          open={open}
          onClose={() => setOpen(false)}
          isRouteWithSpecificWidth={matchedRoute?.customWidth || false}
          handleCreateClick={handleCreateClick}
          closeCreateMenuModal={closeCreateMenuModal}
        />
        <div className="h-full w-full bg-lightPrimary dark:!bg-zinc-900">
          <main
            className={`mx-[12px] h-full flex-none transition-all md:pr-2 ${
              matchedRoute?.customWidth ? "xl:ml-[100px]" : "xl:ml-[313px]"
            }`}
          >
            <div className="h-full">
              <Navbar
                onOpenSidenav={() => setOpen(true)}
                brandText={currentRoute}
                {...rest}
              />
              <div className="pt-11 mx-3 mb-auto h-full min-h-[84vh] p-2 md:pr-2">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
      {isModalOpen && (
        <CreateMenuModal
          onClose={closeCreateMenuModal}
          handleCreateClick={handleCreateClick}
        />
      )}
    </div>
  );
};

export default MainLayout;
