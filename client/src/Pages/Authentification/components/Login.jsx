import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import AlertContainer from "../../../Components/alerts";
import Copyright from "../../../Components/shared/Copyright";
import {FaToggleOff,FaToggleOn} from 'react-icons/fa';
import {
  getCurrentUser,
  login,
  reset as resetAuth,
} from "../../../redux/auth/authSlice";
import GoogleSignIn from "../Google";

// user input validation schema
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const Login = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { error, user } = useSelector((state) => state.auth);
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data) => dispatch(login({ ...data, rememberMe }));

  // redirect user according to his role
  useEffect(() => {
    if (!user) {
      const { data: currentUser } = dispatch(getCurrentUser());
      console.log("currentUser", currentUser);
      if (!currentUser) return;
    }
    const isAdmin = user.role === "admin";

    if (isAdmin) {
      dispatch(resetAuth());
      return navigate("/Dashboard");
    }

    navigate("/feed");
    dispatch(resetAuth());
  }, [dispatch, navigate, user]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full lg:w-4/6">
      <div>
        {error && <AlertContainer error={error} />}
        <div class="grid grid-cols-1">
          <div className="flex justify-center">
            <p className=" text-green-500 font-bold text-4xl">LOGIN TO YOPEX</p>
          </div>
        </div>
        <div class="grid grid-cols-12 w-full mt-6">
          <div class="col-span-12">
            <label
              for="input-group-1"
              className="block  text-sm font-medium text-gray-400 mb-2"
            >
              Email
            </label>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 16"
                >
                  <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                  <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                </svg>
              </div>
              <input
                type="text"
                id="input-group-1"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@flowbite.com"
                {...register("email", { required: true })}
              />
            </div>
          </div>
          <div class="col-span-12">
            <label
              for="input-group-1"
              className="block  text-sm font-medium text-gray-400 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                 type={showPassword ? "text" : "password"}
                id="input-group-2"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="password"
                {...register("password", { required: true })}
              />
              <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 flex items-center pr-2"
        >
          {showPassword ? (
           <FaToggleOn/>
          ) : (
            <FaToggleOff/>
          )}
        </button>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-12 w-full mt-6">
          <div class="col-span-12">
            <div className="flex items-center mb-4 justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onChange={(e) => {
                    setRememberMe(e.target.checked);
                  }}
                />
                <label className="ml-2 text-sm font-mediu dark:text-gray-300 text-gray-400">
                  Remember me
                </label>
              </div>
              <div>
                <a
                  className="no-underline hover:underline text-sm fontmedium text-gray-400"
                  href="/forgetpassword"
                >
                  Forgot Password?
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-12 w-full mt-6">
          <div class="col-span-12">
            <button
              className="w-full bg-green-500 py-3 rounded-md text-md font-medium text-white"
              disabled={isSubmitting}
            >
              Login
            </button>
          </div>
        </div>
        <div class="grid grid-cols-12 w-full mt-6">
          <div class="col-span-12">
            <div className="flex justify-center gap-1">
              <p className="text-gray-400">Are you new here?</p>
              <a
                className="no-underline hover:underline text-sm fontmedium text-green-500"
                href="/register"
              >
                Sign up
              </a>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-12 w-full mt-6">
          <div class="col-span-12">
            <div className="flex items-center">
              <hr className="flex-grow border-t border-gray-300" />
              <p className="text-sm mx-4 text-gray-400">Login with</p>
              <hr className="flex-grow border-t border-gray-300" />
            </div>
          </div>
        </div>
        <div class="grid grid-cols-12 w-full mt-4 mb-6">
          <div class="col-span-12">
            <GoogleSignIn mode="login" />
          </div>
        </div>
        <Copyright />
      </div>
    </form>
  );
};

export default Login;

/* {isActionCompleted && <AlertContainer error={Error} />} */
/* {!myData && isSuccesss && <AlertSuccess message={"logged out"} />} */
/* {myData && isSuccesss && <AlertSuccess message={"logged in"} />} */
