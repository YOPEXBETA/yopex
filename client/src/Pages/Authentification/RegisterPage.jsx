import React from "react";
import Register from "./components/Register";

const RegisterPage = () => {
  return (
    <div class="grid gap-6 md:grid-cols-2 bg-white">
      <div class="col-span-6 md:col-span-1 h-full">
        <img
          src="https://source.unsplash.com/4wOkqiXNP7M"
          className=" h-full object-cover"
        />
      </div>

      <div class="col-span-6 md:col-span-1 flex flex-col items-center my-16">
        <Register />
      </div>
    </div>
  );
};

export default RegisterPage;
