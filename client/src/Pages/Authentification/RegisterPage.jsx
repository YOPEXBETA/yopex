import React from "react";
import Register from "./components/Register";

const RegisterPage = () => {
  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 bg-white dark:bg-zinc-800">
        <div className="hidden lg:block md:block col-span-6 md:col-span-1 h-screen sm:hidden">
          <img
            src="https://source.unsplash.com/4wOkqiXNP7M"
            className=" h-screen object-cover"
          />
        </div>

        <div className="col-span-6 md:col-span-1 flex flex-col items-center my-16">
          <Register />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
