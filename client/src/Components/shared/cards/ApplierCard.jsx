import React, { useState } from "react";
import { Link } from "react-router-dom";
import ApplierMenuIcon from "../../../Pages/UserDashboard/CompanyPage/ContentSide/Components/MyAppliers/ApplierMenuIcon";



const ApplierCard = ({ Applier,jobId }) => {


const Applierids = jobId.acceptedAppliers?.map((Applier) => Applier.user) ;
const userIsInAcceptedApplier = Applierids.includes(Applier._id );



  return (
    <div>
      <Link to={`/profile/${Applier._id}`}>
        <div
          className={`shadow-md border-${
            userIsInAcceptedApplier ? "green" : "red"
          }-500 border-b-2 rounded-lg bg-white hover:scale-102 duration-500 ${
            userIsInAcceptedApplier ? "hover:shadow-green-500" : ""
          }`}
        >
          <div className="flex flex-col">
            <div className="bg- rounded-md p-4 h-full">
              <div className="flex justify-between flex-row-reverse mb-4">
                <div className="w-16 h-16 border-2 rounded-full flex items-center justify-center">
                  <img
                    src={Applier.picturePath}
                    alt="Icon"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-gray-500 mt-2 text-left">
                    {Applier.lastname} {Applier.firstname}
                  </p>
                  <p className="text-gray-500 text-left pb-2">
                    Applier for the job : {jobId.title}
                  </p>
                  <div onClick={(e) => e.preventDefault()}>
                    <ApplierMenuIcon Applier={Applier} job={jobId} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ApplierCard;
