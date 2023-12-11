import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { edit } from "../../../../../redux/auth/authSlice";

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
    <div className="space-y-8 mt-5">
      <div className="flex items-center gap-4">
        <img
          src={user?.picturePath}
          className="h-11 w-11 border rounded-full"
        />
        <p className="dark:text-white">
          {user.firstname} {user.lastname}
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-3"
      >
        <div className=" space-y-3   sm:grid-cols-2 gap-4">
          <div>
            <div>
              <label className="dark:text-white">Old Password</label>
              <input
                type="password"
                placeholder="Enter old password"
                required
                className="w-full border border-gray-300 dark:bg-zinc-700 dark:text-gray-200 rounded-md px-3 py-2 mt-1 resize-none bg-white"
                {...register("oldPassword")}
              />
            </div>
          </div>

          <div>
            <div>
              <label className="dark:text-white">New Password</label>
              <input
                placeholder="New Password"
                className="w-full border border-gray-300 dark:bg-zinc-700 dark:text-gray-200 rounded-md px-3 py-2 mt-1 resize-none bg-white"
                type="password"
                required
                {...register("password")}
              />
            </div>
          </div>
          <div>
            <label className="dark:text-white">ReType Password</label>
            <input
              type="password"
              placeholder="ReType Password"
              required
              className="w-full border border-gray-300 dark:bg-zinc-700 dark:text-gray-200 rounded-md px-3 py-2 mt-1 resize-none bg-white"
              {...register("password2")}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 my-4">
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
      </form>
    </div>
  );
}
