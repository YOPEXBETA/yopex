import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../redux/auth/authSlice";
import Loader from "../../Components/PageLoading/Loader";
import Navbar from "../../Components/Navbar/Navbar";
import routes from "../../routes/FormRoutes"; // Import routes from FormRoutes

const CreateOrganizationLayout = (props) => {
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
        <div>
            <Navbar brandText={currentRoute} {...rest} />
            <div className="h-full w-full bg-white dark:!bg-zinc-900">
                <main className="h-full flex-none transition-all mt-4 md:mx-6 md:p-2">
                    <div className="h-full">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default CreateOrganizationLayout;
