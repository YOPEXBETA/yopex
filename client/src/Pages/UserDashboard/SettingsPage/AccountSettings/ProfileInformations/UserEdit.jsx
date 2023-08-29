import PhotoCamera from "@mui/icons-material/PhotoCamera";
import {
  Avatar,
  Button,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Badge from "@mui/material/Badge";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { green } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import countries from "world-countries";
import { edit } from "../../../../../redux/auth/authSlice";
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
  const { user, error, loading, success } = useSelector((state) => state.auth);

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

  const dispatch = useDispatch();

  const [progress, setUploadProgress] = useState(0);
  const countryList = countries.map((country) => country.name.common);

  const onSubmit = async (data) => {
    const { file, ...values } = data;
    if (data.file.length > 0) {
      const url = await uploadFile(data.file[0], setUploadProgress);
      return dispatch(edit({ ...values, picturePath: url }));
    }
    return dispatch(edit(values));
  };

  return (
    <Stack>
      <Grid
        container
        spacing={3}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
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
            <CustomAvatar src={user?.picturePath ? user.picturePath : ""} />
          </Badge>
        </Grid>

        <Grid item xs={12} sm={6}>
          <InputLabel shrink={true}>FirstName</InputLabel>

          <TextField
            required
            id="firstName"
            placeholder="First name"
            fullWidth
            autoComplete="given-name"
            {...register("firstname")}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel shrink={true}>Lastname</InputLabel>

          <TextField
            required
            id="lastName"
            placeholder="Last name"
            fullWidth
            autoComplete="family-name"
            {...register("lastname")}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel shrink={true}>Email</InputLabel>

          <TextField
            required
            id="Email"
            placeholder="Email"
            fullWidth
            disabled
            autoComplete="email"
            value={user.email}
          />
        </Grid>

        {user.role === "user" && (
          <>
            <Grid item xs={12} sm={6}>
              <InputLabel shrink={true}>Country</InputLabel>
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
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputLabel shrink={true}>Gender</InputLabel>
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
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputLabel shrink={true}>Date of Birth</InputLabel>

              <TextField
                required
                fullWidth
                type="date"
                defaultValue={formatDate(user.birthDate)}
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("birthDate")}
              />
            </Grid>
          </>
        )}

        <Grid item xs={12} sm={6}>
          <InputLabel shrink={true}>Phone Number</InputLabel>

          <TextField
            required
            id="phone"
            placeholder="+216"
            fullWidth
            autoComplete="phone"
            defaultValue={user.phoneNumber}
            {...register("phoneNumber")}
          />
        </Grid>

        {success && <AlertSuccess message="Edited" />}
        {!loading && error && <AlertContainer error={error} />}

        <Grid item xs={12}>
          <Button
            variant="contained"
            size="large"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting" : "Save"}
          </Button>
        </Grid>
      </Grid>
    </Stack>
  );
};
export default UserEdit;
