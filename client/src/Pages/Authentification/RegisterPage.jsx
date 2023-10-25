import React from "react";
import Register from "./components/Register";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 bg-white dark:bg-zinc-800">
        <div className="from-green-900 w-full to-green-500 i group relative hidden items-center justify-around overflow-hidden bg-gradient-to-tr md:flex">
          <div className="mx-auto max-w-xs text-center space-y-4">
            <h2 className="text-white text-3xl">Have an Account?</h2>
            <p className="font-thin text-white mb-3">
              No need to waste time on this page, let's take you back to your
              account
            </p>
            <button className="text-primary-600 w-full bg-white px-6 py-2 rounded-lg font-medium  focus:underline focus:outline-none">
              <Link to="login">Login to Account</Link>
            </button>
          </div>
          <div className="bg-gray-200/20 absolute -start-6 -top-6 h-14 w-0 origin-top-left rotate-45 rounded-full transition-all delay-[25ms] duration-300 group-hover:w-72"></div>
          <div className="bg-gray-200/20 absolute -top-12 start-20 h-14 w-0 origin-top-left rotate-45 rounded-full transition-all delay-75 duration-300 group-hover:w-48"></div>
          <div className="bg-gray-200/20 absolute -start-7 top-24 h-14 w-0 origin-top-left rotate-45 rounded-full transition-all delay-150 duration-300 group-hover:w-40"></div>
          <div className="bg-gray-200/20 absolute -bottom-6 -end-6 h-14 w-0 origin-bottom-right rotate-45 rounded-full transition-all delay-150 duration-300 group-hover:w-72"></div>
          <div className="bg-gray-200/20 absolute -bottom-12 end-20 h-14 w-0 origin-bottom-right rotate-45 rounded-full transition-all delay-75 duration-300 group-hover:w-48"></div>
          <div className="bg-gray-200/20 absolute -end-7 bottom-24 h-14 w-0 origin-bottom-right rotate-45 rounded-full transition-all delay-[25ms] duration-300 group-hover:w-40"></div>
        </div>

        <div className="col-span-6 md:col-span-1 flex flex-col items-center my-16">
          <Register />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
