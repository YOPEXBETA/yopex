import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { formatDistance } from "date-fns";
import React, { useState } from "react";
import {
  useAddComment,
  useCommentsByPosts,
} from "../../../hooks/react-query/useComments";
import { useForm } from "react-hook-form";

const CommentButton = ({ post, category }) => {
  const { data: comments } = useCommentsByPosts(post._id);
  const { register, handleSubmit, reset } = useForm();
  const { mutate, isLoading } = useAddComment(post._id, category, post.userId);

  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => setIsOpen(true);
  const handleDialogClose = () => setIsOpen(false);

  const onSubmit = async (data) => {
    // event.preventDefault();
    mutate({
      postId: post._id,
      ...data,
    });
    reset();
  };

  return (
    <>
      <Stack flexDirection="row" alignItems="center">
        <IconButton aria-label="comment" onClick={handleButtonClick}>
          <AddCommentOutlinedIcon />
        </IconButton>
      </Stack>

      <Dialog open={isOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
        <DialogContent sx={{ display: "flex" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} as="form" onSubmit={handleSubmit(onSubmit)}>
              <Stack flexDirection="row" columnGap={2}>
                <TextField
                  id="comment-textfield"
                  label="Enter your comment"
                  fullWidth
                  variant="outlined"
                  // value={desc}
                  // onChange={(event) => setDesc(event.currentTarget.value)}
                  {...register("desc")}
                />
                <Button
                  type="submit"
                  variant="outlined"
                  // onClick={handleSubmit}
                  disabled={isLoading}
                >
                  Comment
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Divider />
              {comments && comments.length > 0 ? (
                <List>
                  {comments.map((comment) => (
                    <ListItem alignItems="center" key={comment._id}>
                      <ListItemAvatar>
                        <Avatar src={comment.userId.picturePath} />
                      </ListItemAvatar>
                      <ListItemText
                        secondary={
                          <React.Fragment>
                            <Stack flexDirection={"column"}>
                              <Typography
                                sx={{
                                  display: "inline",
                                  textTransform: "capitalize",
                                }}
                                component="span"
                                variant="body2"
                              >
                                {`${comment.userId.firstname} ${comment.userId.lastname}`}{" "}
                                |{" "}
                                {formatDistance(
                                  new Date(comment.createdAt),
                                  new Date(),
                                  {
                                    addSuffix: true,
                                  }
                                )}
                              </Typography>
                              <Typography
                                sx={{ display: "inline" }}
                                component="span"
                                variant="body1"
                                color="text.primary"
                              >
                                {comment.desc}
                              </Typography>

                              <Typography
                                sx={{ display: "inline" }}
                                component="span"
                                variant="caption"
                              ></Typography>
                            </Stack>
                          </React.Fragment>
                        }
                      />
                      <Divider />
                    </ListItem>
                  ))}
                  <Divider />
                </List>
              ) : (
                <Typography variant="body1">No comments yet.</Typography>
              )}
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CommentButton;
