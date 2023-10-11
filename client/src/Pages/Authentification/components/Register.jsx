import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import countries from "../../../countries.json";
import AlertContainer from "../../../Components/alerts";
import Copyright from "../../../Components/shared/Copyright";
import GoogleSignIn from "../Google";
import { register as registerUser } from "../../../redux/auth/authSlice";
import { reset as resetAuth } from "../../../redux/auth/authSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const { error, success } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const countryList = countries.map((country) => country.name.common);
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      role: "user",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const role = watch("role");

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  // after auth
  useEffect(() => {
    if (!success) return;
    navigate("/login");
    return () => dispatch(resetAuth());
  }, [success, dispatch, navigate]);

  return (
    <div>
      <form
        className="md:w-[35rem] w-96 h-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        {error && <AlertContainer error={error} />}

        <div className="grid grid-cols-1 mb-4">
          <div className="flex justify-center">
            <p className=" text-green-500 font-bold text-4xl">
              JOIN YOPEX COMMUNITY
            </p>
          </div>
        </div>

        <>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                for="first_name"
                className="block mb-2 text-sm font-medium text-gray-400"
              >
                First name
              </label>
              <input
                type="text"
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John"
                {...register("firstname", { required: true })}
              />
            </div>
            <div>
              <label
                for="last_name"
                className="block mb-2 text-sm font-medium text-gray-400"
              >
                Last name
              </label>
              <input
                type="text"
                id="last_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Doe"
                {...register("lastname", { required: true })}
              />
            </div>
          </div>

          <div className="col-span-12">
            <label
              htmlFor="country"
              className="block mb-2 text-sm font-medium text-gray-400"
            >
              Country
            </label>
            <select
              id="country"
              name="country"
              {...register("country", { required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Choose your country</option>
              {countryList.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-12 w-full mt-6">
            <div className="col-span-12">
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
            <div className="col-span-12">
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
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>
            <div className="col-span-12 mt-5">
              <label
                for="input-group-1"
                className="block  text-sm font-medium text-gray-400 mb-2"
              >
                Repeat Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="input-group-2"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Repeat password"
                  {...register("repeatPassword", { required: true })}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-2"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>
          </div>
        </>

        <div className="grid grid-cols-12 w-full mt-6">
          <div className="col-span-12">
            <button
              className=" w-full bg-green-500 py-3 rounded-md text-md font-medium text-white"
              type="submit"
            >
              Sign up
            </button>
          </div>
        </div>
        <div className="grid grid-cols-12 w-full mt-6">
          <div className="col-span-12">
            <div className="flex justify-center gap-1">
              <p className="text-gray-400">Already have an account?</p>
              <a
                className="no-underline hover:underline text-sm fontmedium text-green-500"
                href="/login"
              >
                Login
              </a>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 w-full mt-6">
          <div className="col-span-12">
            <div className="flex items-center">
              <hr className="flex-grow border-t border-gray-300" />
              <p className="text-sm mx-4 text-gray-400">Sign up with</p>
              <hr className="flex-grow border-t border-gray-300" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 w-full mt-4 mb-6">
          <div className="col-span-12">
            <GoogleSignIn mode="register" />
          </div>
        </div>
        <Copyright />
      </form>
    </div>
  );
};

export default Register;
