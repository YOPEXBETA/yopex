import { Avatar, Box, Button, Card, Stack, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useUserById } from "../../../../../../hooks/react-query/useUsers";
import AddReviewModal from "./addreviewmodal";
import { useSelector } from "react-redux";
import { useUserReviews } from "../../../../../../hooks/react-query/useReviews";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(4),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  feedbackItem: {
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(2),
  },
  feedbackHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
  feedbackText: {
    marginBottom: theme.spacing(1),
  },
  feedbackRating: {
    marginRight: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const FeedbacksPage = () => {
  const classes = useStyles();
  const { userId } = useParams();
  const { data: userProfile } = useUserById(userId);
  const { data: reviews } = useUserReviews(userId);
  const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <Box>
      {userId !== user._id &&
        user.role === "company" &&
        userProfile.role !== "company" && (
          <Button onClick={toggleOpen}>Add Review</Button>
        )}

      {reviews?.map((review) => (
        <Card
          key={review._id}
          className={classes.feedbackItem}
          elevation={0}
          variant="outlined"
        >
          <Box className={classes.feedbackHeader}>
            <Stack spacing={2}>
              <Stack flexDirection={"row"} alignItems={"center"} columnGap={1}>
                <Avatar src={review.companyId.picturePath} />
                <Typography variant="h5">
                  {review.companyId.companyName}
                </Typography>
              </Stack>
              <Typography
                fontSize={15}
                className={classes.feedbackText}
                style={{
                  color: review.star === 5 ? "green" : "black",
                }}
              >
                {review.description}
              </Typography>
              <Typography variant="h6">
                {new Date(review.createdAt).toLocaleDateString()}
              </Typography>
            </Stack>
            <Rating
              className={classes.feedbackRating}
              value={review.star}
              readOnly
            />
          </Box>
        </Card>
      ))}

      <AddReviewModal open={isOpen} onClose={toggleOpen} />
    </Box>
  );
};

export default FeedbacksPage;
