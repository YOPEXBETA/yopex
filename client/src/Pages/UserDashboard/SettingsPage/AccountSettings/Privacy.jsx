import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import AlertSuccess from "../../../../Components/successalert";
import { edit, reset } from "../../../../redux/auth/authSlice";
import AlertContainer from "../../../../Components/alerts";

export default function Privacy() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const { user, error, loading, success } = useSelector((state) => state.auth);

  const onSubmit = (data) => {
    if (data.password !== data.password2) return;
    return dispatch(
      edit({
        password: data.password,
        oldPassword: data.oldPassword,
      })
    );
  };

  return (
    <div className="space-y-8">
      <div className="dark:text-gray-200">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          Privacy Information{" "}
        </h2>
        <hr className="border dark:border-gray-200 mb-2" />
        <br />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-3"
        >
          <div className=" space-y-3   sm:grid-cols-2 gap-4">
            <div>
              <div>
                <label className="dark:text-gray-200 text-gray-600">
                  Old Password
                </label>

                <input
                  type="password"
                  placeholder="Enter old password"
                  className="w-full border dark:bg-zinc-700 dark:text-gray-200 border-gray-300 rounded-md px-3 py-2 mt-1 resize-none bg-gray-50"
                  {...register("oldPassword")}
                />
              </div>
            </div>
            <div>
              <div>
                <label className="dark:text-gray-200 text-gray-600">
                  New Password
                </label>
                <input
                  placeholder="New Password"
                  className="w-full border border-gray-300 dark:bg-zinc-700 dark:text-gray-200 rounded-md px-3 py-2 mt-1 resize-none bg-gray-50"
                  type="password"
                  {...register("password")}
                />
              </div>
            </div>
            <div>
              <label className="block dark:text-gray-200 text-gray-600">
                ReType Password
              </label>
              <input
                type="password"
                placeholder="ReType Password"
                className="w-full border border-gray-300 dark:bg-zinc-700 dark:text-gray-200 rounded-md px-3 py-2 mt-1 resize-none bg-gray-50"
                {...register("password2")}
              />
            </div>

            {error && <AlertContainer error={"Error"} />}
            {success && <AlertSuccess message="Edited" />}
            {!loading && error && <AlertContainer error={error} />}
            <div className="grid grid-cols-1">
              <div className="col-span-1">
                <button
                  className={`${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600"
                  } px-4 py-2 rounded-lg text-white w-40`}
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting" : "Save"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
