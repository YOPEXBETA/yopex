import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { forgetPassword } from "../../redux/actions/AuthAction";
import Copyright from "../../Components/shared/Copyright";
import toast from "react-hot-toast";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const [email, SetEmail] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = await dispatch(forgetPassword({ email }));
    console.log(data);
    if (data.message) toast.success("Password reset email sent");
    else if (data.error) toast.error("Email not found");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form className="w-full h-full lg:w-2/6">
        <div className="grid grid-cols-1">
          <div className="flex justify-center">
            <p className=" text-green-500 font-bold text-4xl">YOPEX</p>
          </div>
        </div>

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
              onChange={(e) => SetEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 w-full mt-6 mb-4">
          <div className="col-span-12">
            <button
              className=" w-full bg-green-500 py-3 rounded-md text-md font-medium text-white"
              onClick={(e) => submitHandler(e)}
            >
              Send Email
            </button>
          </div>
        </div>
        <Copyright />
      </form>
    </div>
  );
};

export default ForgetPassword;
