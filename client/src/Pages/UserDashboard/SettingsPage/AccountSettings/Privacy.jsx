import { Button, Divider, InputLabel } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import AlertSuccess from "../../../../Components/successalert";
import { edit, reset } from "../../../../redux/auth/authSlice";

export default function Privacy() {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const { isSuccess } = useSelector((state) => state.auth);
  const onSubmit = (data) => {
    if (data.password !== data.password2) return;
    dispatch(edit({ password: data.password }));
    return dispatch(reset());
  };

  return (
    <React.Fragment>
      <Stack>
        <Typography variant="h5" gutterBottom>
          Privacy Informations
        </Typography>
        <Divider />

        <Divider />
        <br />
        <Typography variant="h5" gutterBottom>
          Change Password
        </Typography>
        <br />
        <Grid
          container
          spacing={3}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid item xs={12}>
            <InputLabel shrink={true}>New Password</InputLabel>
            <TextField
              required
              type="password"
              placeholder="New password"
              fullWidth
              autoComplete="newpassword"
              {...register("password", { required: true })}
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel shrink={true}>Retype Password</InputLabel>
            <TextField
              required
              type="password"
              placeholder="Retype password"
              fullWidth
              autoComplete="retypepassword"
              {...register("password2", { required: true })}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" size="large" type="submit">
              Save
            </Button>

            {isSuccess && <AlertSuccess message={"changed your password"} />}
          </Grid>
        </Grid>
      </Stack>
    </React.Fragment>
  );
}
