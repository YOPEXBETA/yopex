import { Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import React from "react";
import UserEdit from "./ProfileInformations/UserEdit";

const GeneralInformations = () => {
  return (
    <React.Fragment>
      <Stack>
        <Typography variant="h5" gutterBottom>
          General Informations
        </Typography>
        <Divider />
        <br />
        <UserEdit />
      </Stack>
    </React.Fragment>
  );
};
export default GeneralInformations;
