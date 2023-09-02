import React, { useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import AdminNavbar from "./components/AdminNavbar";
import Sidebar from "./components/AdminSideBar";
import routes from "../../routes/AdminRoutes";
import { getCurrentUser } from "../../redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

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
    console.log("layout");
    if (!user) {
      dispatch(getCurrentUser())
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
    return <div>Loading...</div>; // Or you can render a loading component
  }
  return (
    <div className="flex h-full w-full">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        <main
          className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]`}
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