import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import AvatarProfile from "../../../../../assets/images/AvatarProfile.jpg";
import { edit } from "../../../../../redux/auth/authSlice";
import { useUpdatePassword } from "../../../../../hooks/react-query/useUsers";
import Card from "../../../../../Components/Cards";

export default function Privacy({ extra }) {
  const { mutate } = useUpdatePassword();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const { user, error, loading, success } = useSelector((state) => state.auth);

  const onSubmit = (data) => {
    if (data.password !== data.password2) return;
    mutate({
      newPassword: data.password,
      oldPassword: data.oldPassword,
    });
  };

  return (
    <Card extra={`p-8 ${extra}`}>
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          {user?.picturePath ? (
            <img
              alt="picture"
              src={user?.picturePath}
              className="h-11 w-11 border rounded-full"
            />
          ) : (
            <img
              alt="default"
              src={AvatarProfile}
              className="h-11 w-11 border rounded-full"
            />
          )}
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
                  {...register("password")}
                />
              </div>
            </div>
            <div>
              <label className="dark:text-white">ReType Password</label>
              <input
                type="password"
                placeholder="ReType Password"
                className="w-full border border-gray-300 dark:bg-zinc-700 dark:text-gray-200 rounded-md px-3 py-2 mt-1 resize-none bg-white"
                {...register("password2")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 my-5">
            <div className="col-span-1 flex justify-end">
              <button
                className={`${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80"
                } text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-28`}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting" : "Save"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
}
