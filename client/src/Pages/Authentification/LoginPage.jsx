import React from "react";
import Login from "./components/Login";

const LoginPage = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 bg-white dark:bg-zinc-800">
      <div className="hidden lg:block md:block col-span-6 md:col-span-1 h-screen sm:hidden">
        <img
          src="https://source.unsplash.com/4wOkqiXNP7M"
          className=" h-[100vh] object-cover"
          alt="image"
        />
      </div>

      <div className="col-span-6 md:col-span-1 flex flex-col items-center my-16 px-8 lg:px-0 md:px-0">
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
