import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Box,
  Rating,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
// import { addReview } from "../../../../../../redux/actions/ReviewAction";
import { useParams } from "react-router-dom";
import { useAddReviews } from "../../../hooks/react-query/useReviews";

const useStyles = makeStyles((theme) => ({
  rating: {
    marginBottom: theme.spacing(2),
  },
}));

const AddReviewModal = ({ open, onClose }) => {
  const { register, handleSubmit, control, setValue, reset } = useForm({
    defaultValues: {
      star: 0,
    },
  });
  const classes = useStyles();
  // const dispatch = useDispatch();
  // const myData = JSON.parse(localStorage.getItem("user"));
  const { user } = useSelector((state) => state.auth);
  const { userId } = useParams();
  const { mutate } = useAddReviews(userId);

  // const [review, setReview] = useState({
  //   description: "",
  //   star: 0,
  // });

  // const handleInputChange = (event) => {
  //   const value = event.target.value;
  //   setReview({ ...review, description: value });
  // };

  // const handleRatingChange = (event, value) => {
  //   setReview((prevReview) => ({
  //     ...prevReview,
  //     star: value,
  //   }));
  // };

  const onSubmit = (data) => {
    mutate({ ...data, companyId: user._id, userId: userId });
    reset();
    onClose();
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log(review);
  // dispatch(addReview({ ...review, companyId: user._id, userId: userId }));
  //   setReview({
  //     description: "",
  //     star: 0,
  //   });
  //   onClose();
  // };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      as="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <DialogTitle>Add Review</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please leave a review for this company.
        </DialogContentText>
        <Box className={classes.rating}>
          <Controller
            control={control}
            name="star"
            render={({ field }) => (
              <Rating
                {...field}
                onChange={(e, value) => setValue("star", value)}
              />
            )}
          />
        </Box>
        <TextField
          fullWidth
          autoFocus
          margin="dense"
          label="Description"
          type="text"
          {...register("description", { required: true })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddReviewModal;
