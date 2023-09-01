import React from "react";
import Login from "./components/Login";

const LoginPage = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 bg-white">
      <div className="col-span-6 md:col-span-1 h-screen">
        <img
          src="https://source.unsplash.com/4wOkqiXNP7M"
          className=" h-screen object-cover"
        />
      </div>

      <div className="col-span-6 md:col-span-1 flex flex-col items-center my-16">
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
