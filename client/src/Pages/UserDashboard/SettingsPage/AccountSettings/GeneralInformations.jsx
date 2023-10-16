import { Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import React from "react";
import UserEdit from "./ProfileInformations/UserEdit";

const GeneralInformations = () => {
  return (
    <React.Fragment>
      <Stack>
        <Typography variant="h5" className="dark:text-gray-200" gutterBottom>
          General Informations
        </Typography>
        <Divider className=" dark:bg-gray-200" />
        <br />
        <UserEdit />
      </Stack>
    </React.Fragment>
  );
};
export default GeneralInformations;
