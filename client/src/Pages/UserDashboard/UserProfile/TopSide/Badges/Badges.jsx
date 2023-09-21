import TokenIcon from "@mui/icons-material/Token";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import React, { useState } from "react";
import Badge from "./Badge";

const Badges = ({ userProfile }) => {
  const [openModal, setOpenModal] = useState(false);
  const toggleModal = () => setOpenModal((prev) => !prev);

  return (
    <div>
      <Stack direction="row" spacing={2} alignItems={"flex-end"}>
        {userProfile?.badgesEarned?.map((badge) => (
          <Avatar key={badge._id} src={badge.badgeImg} />
        ))}

        <Typography variant="h6" color={"gray"} onClick={toggleModal}>
          All Badges
        </Typography>

        <Dialog open={openModal} onClose={toggleModal} fullWidth={true}>
          <DialogTitle variant="h5">
            <Stack flexDirection={"row"} columnGap={1} alignItems={"center"}>
              <TokenIcon />
              <Typography variant="h5">All Badges</Typography>
            </Stack>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <Stack spacing={2}>
              <Stack spacing={2}>
                {userProfile?.badgesEarned?.map((badge) => (
                  <Badge key={badge._id} badge={badge} />
                ))}
              </Stack>
            </Stack>
          </DialogContent>
        </Dialog>
      </Stack>
    </div>
  );
};

export default Badges;
