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
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import Badge from "./Badge";

const useStyles = makeStyles((theme) => ({
  badges: {
    width: 30,
    height: 30,
    border: `1px solid ${theme.palette.secondary.light}`,
  },
  badgesModal: {
    width: 60,
    height: 60,
  },
}));

const Badges = ({ userProfile }) => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const toggleModal = () => setOpenModal((prev) => !prev);

  // const { userId } = useParams();
  // const { data: badges } = useUserBadges(userId);
  // console.log(userProfile?.badgesEarned);

  return (
    <div>
      <Stack direction="row" spacing={2} alignItems={"flex-end"}>
        {userProfile?.badgesEarned?.map((badge) => (
          <Avatar
            key={badge._id}
            className={classes.badges}
            src={badge.badgeImg}
          />
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
