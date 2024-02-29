import React, { useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import AdminNavbar from "./components/AdminNavbar";
import Sidebar from "./components/AdminSideBar";
import routes from "../../routes/AdminRoutes";
import { getCurrentUser } from "../../redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/PageLoading/Loader";

export default function AdminLayout(props) {
  const { user } = useSelector((state) => state.auth);
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState("dashboard");

  React.useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, user]);

  const currentPath = location.pathname;
  const matchedRoute = routes.children.find((route) =>
    currentPath.includes(route.path)
  );

  React.useEffect(() => {
    if (matchedRoute) {
      setCurrentRoute(matchedRoute.path);
    }
  }, [currentPath]);

  if (!user) {
    return <Loader />; // Or you can render a loading component
  } else if (user?.role !== "admin") {
    return <h1>Unauthorized</h1>;
  } else
    return (
      <div className="flex h-full w-full">
        <Sidebar open={open} onClose={() => setOpen(false)} />
        <div className="h-full w-full bg-white dark:!bg-zinc-900">
          <main
            className={`h-full flex-none transition-all md:pr-2 xl:ml-[313px]`}
          >
            <div className="h-full">
              <AdminNavbar
                onOpenSidenav={() => setOpen(true)}
                brandText={currentRoute}
                {...rest}
              />
              <div className="pt-6 mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
    );
}
