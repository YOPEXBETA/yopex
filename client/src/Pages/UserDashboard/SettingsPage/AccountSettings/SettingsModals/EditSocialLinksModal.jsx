import React, { useEffect } from "react";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import countries from "../../../../../countries.json";
import { edit, reset } from "../../../../../redux/auth/authSlice";

const EditSocialLinksModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { user, error, loading, success } = useSelector((state) => state.auth);
  const countryList = countries?.map((country) => country?.name?.common);

  useEffect(() => {
    dispatch(reset());
  }, []);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      firstname: user?.firstname,
      lastname: user?.lastname,
      occupation: user?.occupation,
      birthDate: user?.birthDate,
      websiteURL: user?.websiteURL,
      country: user?.country,
      gender: user?.gender,
      phoneNumber: user?.phoneNumber,
      userDescription: user?.userDescription,
    },
  });

  const onSubmit = async (data) => {
    try {
      const { ...values } = data;

      await dispatch(edit({ ...values }));
      handleClose();
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div
      className={`fixed z-50 top-0 right-0 h-full flex items-center ${
        open ? "" : "hidden"
      }`}
    >
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50"></div>
      <div className="fixed top-0 right-0 h-full flex items-center">
        <div className="bg-white md:w-[40rem] w-full h-full px-8 py-4  shadow-md overflow-auto">
          <div className="">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-gray-400 bg-transparent  hover:text-gray-900 rounded-lg text-xs md:text-sm  inline-flex justify-center items-center  dark:hover:text-white"
                  data-modal-hide="defaultModal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
                <h5 className=" font-medium text-lg">Profile Details</h5>
              </div>

              <button
                onClick={handleSubmit(onSubmit)}
                className={`${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 dark:hover:bg-green-600 hover:bg-green-600"
                } px-4 py-2 rounded-lg text-white w-24`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting" : "Save"}
              </button>
            </div>
          </div>
          <hr className="border-zinc-100 border w-full mt-4" />
          <form className="grid grid-cols-1 gap-3 mt-4"></form>
        </div>
      </div>
    </div>
  );
};

export default EditSocialLinksModal;
