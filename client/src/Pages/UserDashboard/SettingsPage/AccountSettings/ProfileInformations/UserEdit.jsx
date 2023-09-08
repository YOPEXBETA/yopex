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
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import countries from "world-countries";
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
    console.log(data.values);
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
        <Grid item xs={12}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <CustomIconButton
                aria-label="upload picture"
                component="label"
                sx={{ bgcolor: green[500], borderRadius: "50px" }}
              >
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  {...register("file")}
                />
                <PhotoCamera sx={{ fill: "white" }} />
              </CustomIconButton>
            }
          >
            <img
              className="rounded-full object-cover w-24 h-24"
              src={user?.picturePath ? user.picturePath : ""}
            />
          </Badge>
        </Grid>

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
        <Grid item xs={12} sm={12}>
          <label>Description</label>

          <textarea
            placeholder="Description"
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 resize-none bg-gray-50"
            value={user.userDescription}
            {...register("userDescription")}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <label>Email</label>

          <input
            placeholder="Email"
            disabled
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 resize-none bg-gray-200"
            type="email"
            value={user.email}
          />
        </Grid>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="col-span-1">
            <label>Country</label>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              fullWidth
              displayEmpty
              MenuProps={MenuProps}
              defaultValue={
                user.country?.charAt(0).toUpperCase() +
                  user.country?.slice(1) || ""
              }
              {...register("country")}
            >
              <MenuItem value="">Choose your country</MenuItem>
              {countryList.map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </Select>
          </div>

          <div className="col-span-1">
            <label>Gender</label>
            <Select
              labelId="gender-select-label"
              id="gender-select"
              fullWidth
              displayEmpty
              defaultValue={user.gender}
              {...register("gender")}
            >
              <MenuItem value="">Choose your gender</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
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
              className="w-full p-2 border bg-[#ffffff] rounded-lg focus:outline-none resize-none text-black"
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
