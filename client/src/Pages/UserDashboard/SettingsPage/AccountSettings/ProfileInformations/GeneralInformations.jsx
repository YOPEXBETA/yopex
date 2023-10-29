import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import countries from "../../../../../countries.json";
import { edit, reset } from "../../../../../redux/auth/authSlice";
import uploadFile from "../../../../../utils/uploadFile";
import AlertContainer from "../../../../../Components/alerts";
import AlertSuccess from "../../../../../Components/successalert";
import AvatarProfile from "../../../../../assets/images/AvatarProfile.jpg";

const formatDate = (date) => {
  const currentDate = new Date(date);
  const year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1;
  let day = currentDate.getDate();
  if (month < 10) month = `0${month}`;
  if (day < 10) day = `0${day}`;
  return `${year}-${month}-${day}`;
};

const GeneralInformations = () => {
  const dispatch = useDispatch();
  const { user, error, loading, success } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(reset());
  }, []);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      firstname: user.firstname,
      lastname: user.lastname,
    },
  });

  const [progress, setUploadProgress] = useState(0);
  const countryList = countries.map((country) => country.name.common);

  const onSubmit = async (data) => {
    const { file, ...values } = data;
    if (data.file.length > 0) {
      const url = await uploadFile(
        data.file[0],
        setUploadProgress,
        "profilePic"
      );
      return dispatch(edit({ ...values, picturePath: url }));
    }
    return dispatch(edit(values));
  };

  return (
    <div className="mb-24 md:mb-8 ">
      <div>
        <h2 className="text-xl font-bold  dark:text-white uppercase">
          General Info
        </h2>
        <p className="text-gray-400 mb-4">
          Edit your account's general information
        </p>
      </div>
      <hr className=" dark:border-gray-200 mb-2" />
      <br />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-3"
      >
        <div className="relative">
          <div className="relative w-24 h-24">
            {user?.picturePath ? (
              <img
                alt="picture"
                src={user?.picturePath}
                className="rounded-full object-cover w-24 h-24 border-2"
              />
            ) : (
              <img
                alt="default"
                src={AvatarProfile}
                className="rounded-full object-cover w-24 h-24 border-2"
              />
            )}
            <label
              htmlFor="fileInput"
              className="absolute bottom-0 right-0 p-2 bg-green-500 rounded-full text-white cursor-pointer"
            >
              <input
                id="fileInput"
                hidden
                accept="image/*"
                type="file"
                {...register("file")}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-2"
              />
              <FaCamera className="w-4 h-4" />
            </label>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="col-span-1">
            <label
              htmlFor="firstname"
              className="block text-gray-600 dark:text-gray-300"
            >
              First Name
            </label>
            <input
              id="firstname"
              type="text"
              placeholder="First name"
              className="w-full border border-gray-300 dark:bg-zinc-700 dark:border-zinc-600 dark:text-gray-300 rounded-md px-3 py-2 mt-1 resize-none bg-gray-50"
              {...register("firstname")}
            />
          </div>
          <div className="col-span-1">
            <label
              htmlFor="lastname"
              className="block text-gray-600 dark:text-gray-300"
            >
              Last Name
            </label>
            <input
              id="lastname"
              type="text"
              placeholder="Last name"
              className="w-full border dark:bg-zinc-700 dark:border-zinc-600 dark:text-gray-300 border-gray-300 rounded-md px-3 py-2 mt-1 resize-none bg-gray-50"
              {...register("lastname")}
            />
          </div>
        </div>
        <div className="grid grid-cols-1">
          <div className="col-span-1">
            <label className="dark:text-gray-300">Description</label>

            <textarea
              id="userDescription"
              placeholder="Description"
              className="w-full border dark:bg-zinc-700 dark:border-zinc-600 dark:text-gray-300 border-gray-300 rounded-md px-3 py-2 mt-1 resize-none bg-gray-50"
              defaultValue={user.userDescription}
              {...register("userDescription")}
            />
          </div>
        </div>
        <div className="grid grid-cols-1">
          <div className="col-span-1">
            <label className="dark:text-gray-300">Email</label>
            <input
              placeholder="Email"
              disabled
              className="w-full border dark:bg-zinc-800 dark:border-zinc-600 dark:text-gray-300 border-gray-300 rounded-md px-3 py-2 mt-1 resize-none bg-gray-200"
              type="email"
              value={user.email}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="col-span-1">
            <label className="dark:text-gray-300">Country</label>
            <select
              id="demo-multiple-name"
              className="w-full border dark:bg-zinc-700 dark:border-zinc-600 dark:text-gray-300 border-gray-300 rounded-md px-3 py-2 mt-1 bg-gray-50"
              defaultValue={
                user.country
                  ? user.country.charAt(0).toUpperCase() + user.country.slice(1)
                  : ""
              }
              {...register("country")}
            >
              <option value="">Choose your country</option>
              {countryList.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-1">
            <label className="dark:text-gray-300">Gender</label>
            <select
              id="gender-select"
              className="w-full border dark:bg-zinc-700 dark:border-zinc-600 dark:text-gray-300 border-gray-300 rounded-md px-3 py-2 mt-1 bg-gray-50"
              defaultValue={user.gender}
              {...register("gender")}
            >
              <option value="">Choose your gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="col-span-1">
            <label shrink={true} className="dark:text-gray-300">
              Date of Birth
            </label>

            <input
              type="date"
              className="w-full border dark:bg-zinc-700 dark:border-zinc-600 dark:text-gray-300 border-gray-300 rounded-md px-3 py-2 mt-1 resize-none bg-gray-50"
              defaultValue={formatDate(user.birthDate)}
              {...register("birthDate")}
            />
          </div>

          <div className="col-span-1">
            <label className="dark:text-gray-300 ">Phone Number</label>

            <input
              id="phone"
              placeholder="+216"
              className="w-full border dark:bg-zinc-700 dark:border-zinc-600 dark:text-gray-300 border-gray-300 rounded-md px-3 py-2 mt-1 resize-none bg-gray-50"
              defaultValue={user.phoneNumber}
              {...register("phoneNumber")}
            />
          </div>
        </div>

        {success && <AlertSuccess message="Edited" />}
        {!loading && error && <AlertContainer error={error} />}

        <div className="grid grid-cols-1">
          <div className="col-span-1">
            <button
              className={`${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 dark:hover:bg-green-600 hover:bg-green-600"
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
};
export default GeneralInformations;
