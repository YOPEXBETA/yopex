import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../redux/actions/AuthAction";
import { useNavigate, useParams } from "react-router-dom";
import Copyright from "../../Components/shared/Copyright";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [passwordVerification, setPasswordVerification] = useState("");
  const { resetToken } = useParams();
  const [isSaveDisabled, setIsSaveDisabled] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = await dispatch(resetPassword({ resetToken, password }));
    if (data) navigate("/login");
  };

  const handleRetypePasswordChange = (e) => {
    const retypePassword = e.target.value;
    if (password !== retypePassword) {
      setIsSaveDisabled(false);
    } else {
      setIsSaveDisabled(true);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen">
        <form className="w-full h-full lg:w-2/6">
          <div className="grid grid-cols-1">
            <div className="flex justify-center">
              <p className=" text-green-500 font-bold text-4xl">YOPEX</p>
            </div>
          </div>

          <div className="col-span-12">
            <label
              for="input-group-1"
              className="block  text-sm font-medium text-gray-400 mb-2"
            >
              New Password
            </label>
            <div className="relative mb-6">
              <input
                type="password"
                id="input-group-1"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="New Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="col-span-12">
            <label
              for="input-group-1"
              className="block  text-sm font-medium text-gray-400 mb-2"
            >
              Retype Password
            </label>
            <div className="relative mb-6">
              <input
                type="password"
                id="input-group-1"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Retype Password"
                onChange={(e) => {
                  setPasswordVerification(e.target.value);
                  handleRetypePasswordChange(e);
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-12 w-full mt-6 mb-4">
            <div className="col-span-12">
              <button
                className=" w-full bg-green-500 py-3 rounded-md text-md font-medium text-white"
                onClick={(e) => submitHandler(e)}
                disabled={!isSaveDisabled}
              >
                Save
              </button>
            </div>
          </div>
          <Copyright />
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
