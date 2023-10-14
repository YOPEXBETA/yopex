import React, { useEffect } from "react";
import CustomNavbar from "./Navbar/CustomNavbar";

//render the data under the navbar
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../redux/auth/authSlice";
import Loader from "../../Components/PageLoading/Loader";
import FloatingButton from "../../Components/shared/Buttons/FloatingButton";

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
  const { user, error } = useSelector((state) => state.auth); // Assuming you have an error state in your Redux slice
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      <div className="pb-[4.6rem]">
        <CustomNavbar />
      </div>
      <div className="">
        <Outlet />
      </div>
      <div className="block md:hidden">
        <FloatingButton />
      </div>
    </div>
  );
};

export default MainLayout;
