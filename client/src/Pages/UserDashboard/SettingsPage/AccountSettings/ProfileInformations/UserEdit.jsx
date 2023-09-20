import PhotoCamera from "@mui/icons-material/PhotoCamera";
import {
  Avatar,
  Button,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
} from "@mui/material";
import Badge from "@mui/material/Badge";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { green } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import countries from "../../../../../countries.json";
import { edit, reset } from "../../../../../redux/auth/authSlice";
import uploadFile from "../../../../../utils/uploadFile";
import AlertContainer from "../../../../../Components/alerts";
import AlertSuccess from "../../../../../Components/successalert";

const CustomIconButton = styled(IconButton)(({ theme }) => ({
  width: 30,
  height: 30,
}));
const CustomAvatar = styled(Avatar)(({ theme }) => ({
  width: 80,
  height: 80,
  border: `2px solid ${theme.palette.background.paper}`,
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const formatDate = (date) => {
  const currentDate = new Date(date);
  const year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1;
  let day = currentDate.getDate();
  if (month < 10) month = `0${month}`;
  if (day < 10) day = `0${day}`;
  return `${year}-${month}-${day}`;
};

const UserEdit = () => {
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
    <div className="mb-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-3"
      >
        <div className="relative">
          <div className="relative w-24 h-24">
            <img
              className="rounded-full object-cover w-24 h-24"
              src={user?.picturePath || ""}
              alt=""
            />
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
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <FaCamera className="w-4 h-4" />
            </label>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="col-span-1">
            <label htmlFor="firstname" className="block text-gray-600">
              First Name
            </label>
            <input
              id="firstname"
              type="text"
              placeholder="First name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 resize-none bg-gray-50"
              {...register("firstname")}
            />
          </div>
          <div className="col-span-1">
            <label htmlFor="lastname" className="block text-gray-600">
              Last Name
            </label>
            <input
              id="lastname"
              type="text"
              placeholder="Last name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 resize-none bg-gray-50"
              {...register("lastname")}
            />
          </div>
        </div>
        <div className="grid grid-cols-1">
          <div className="col-span-1">
            <label>Description</label>

            <textarea
              placeholder="Description"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 resize-none bg-gray-50"
              value={user.userDescription}
              {...register("userDescription")}
            />
          </div>
        </div>
        <div className="grid grid-cols-1">
          <div className="col-span-1">
            <label>Email</label>
            <input
              placeholder="Email"
              disabled
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 resize-none bg-gray-200"
              type="email"
              value={user.email}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="col-span-1">
            <label>Country</label>
            <select
              id="demo-multiple-name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 bg-gray-50"
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
            <label>Gender</label>
            <select
              id="gender-select"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 bg-gray-50"
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
            <label shrink={true}>Date of Birth</label>

            <input
              type="date"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 resize-none bg-gray-50"
              defaultValue={formatDate(user.birthDate)}
              {...register("birthDate")}
            />
          </div>

          <div className="col-span-1">
            <label>Phone Number</label>

            <input
              id="phone"
              placeholder="+216"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 resize-none bg-gray-50"
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
                isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-green-500"
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
export default UserEdit;
