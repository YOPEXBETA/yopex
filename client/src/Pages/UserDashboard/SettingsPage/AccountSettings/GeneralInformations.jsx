import React from "react";
import UserEdit from "./ProfileInformations/UserEdit";

const GeneralInformations = () => {
  return (
    <React.Fragment>
      <div className="">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          General Informations
        </h2>
        <hr className="border dark:border-gray-200 mb-2" />
        <br />
        <UserEdit />
      </div>
    </React.Fragment>
  );
};

export default GeneralInformations;
