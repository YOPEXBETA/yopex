import React from "react";
import CreatePostForm from "../../../Components/forms/CreatePostForm";

const index = () => {
  return (
    <div className="lg:mx-60 md:mx-20 mx-0 md:my-8">
      <div className="grid grid-cols-12 mt-4 md:mt-0">
        <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 col-span-12">
          <div className="p-4 rounded-lg border bg-white mb-8 mx-auto container">
            <CreatePostForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
