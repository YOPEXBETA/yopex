import React from "react";
import CreatePostForm from "../../../Components/forms/CreatePostForm";

const index = () => {
  return (
    <div className="grid grid-cols-12 mt-4 md:mt-0 mx-auto container">
      <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 col-span-12">
        <CreatePostForm />
      </div>
    </div>
  );
};

export default index;
