import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { emailVerification } from "../../redux/actions/AuthAction";
import { useNavigate, useParams } from "react-router-dom";
import Copyright from "../../Components/shared/Copyright";

const EmailVerification = () => {

  const {token} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(token);

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = await dispatch(emailVerification(token));
    console.log(data);
    if (data) navigate("/login");
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-[#282828]">
        <form className="w-full h-full lg:w-2/6">
          <div className="grid grid-cols-1">
            <div className="flex justify-center">
              <p className=" text-white font-bold text-4xl">WELCOME TO </p>
              <p className=" text-green-500 font-bold text-4xl ml-2">YOPEX</p>
            </div>
          </div>

      
          <div className="grid grid-cols-12 w-full mt-6 mb-4">
            <div className="col-span-12">
              <button
                className=" w-full bg-green-500 hover:bg-white hover:text-green-500 py-3 rounded-md text-md font-medium text-white"
                onClick={(e) => submitHandler(e)}
              >
                Activate your account
              </button>
            </div>
          </div>
          <Copyright />
        </form>
      </div>
    </div>
  );
};

export default EmailVerification;
