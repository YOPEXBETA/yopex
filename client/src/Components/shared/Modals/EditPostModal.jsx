import {
  Autocomplete,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  InputLabel,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { MuiFileInput } from "mui-file-input";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useEditPost } from "../../../hooks/react-query/usePosts";
import { useCategories } from "../../../hooks/react-query/useCategories";
import { axios } from "../../../axios";

export const EditPostModal = ({ open, handleClose, post }) => {
  const url = process.env.REACT_APP_API_ENDPOINT;
  const { category } = useSelector((state) => state.global);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { mutate } = useEditPost(post._id, post.userId, category);

  const { data: categories } = useCategories();

  const { register, handleSubmit, control, setValue, reset, watch } = useForm({
    defaultValues: {
      description: post.description,
      categories: [],
      files: [],
    },
  });

  const uploadedFile = watch("files");

  const onSubmit = async (data) => {
    if (data.files.length > 0) {
      const postPicturePath = [];
      for (let file of data.files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", "posts");
        const datalogo = await axios.post(`${url}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percentage = Math.floor((loaded * 100) / total);
            setUploadProgress(percentage);
          },
        });
        postPicturePath.push(datalogo.data.downloadURL);
      }
      return mutate({ description: data.description, postPicturePath });
    }

    mutate({ description: data.description, categories: data.categories });
    setUploadProgress(0);
    handleClose();
    reset();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <Stack spacing={1}>
        <DialogTitle variant="h5">Edit Post</DialogTitle>
        <Divider />
        <DialogContent>
          <Stack spacing={2}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                {...register("description")}
                margin="normal"
                variant="outlined"
                required
                fullWidth
                id="description"
                label="Description"
                multiline
                rows={4}
              />

              <Controller
                name="categories"
                control={control}
                render={() => (
                  <Autocomplete
                    multiple
                    limitTags={2}
                    id="multiple-limit-tags"
                    options={categories ? categories : []}
                    onChange={(e, values) => setValue("categories", values)}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="categories"
                        placeholder="categories"
                      />
                    )}
                  />
                )}
              />

              {uploadedFile && (
                <Stack mb={1}>
                  <Typography>Upload Progress: {uploadProgress}%</Typography>
                  <LinearProgress
                    variant="determinate"
                    value={uploadProgress}
                  />
                </Stack>
              )}

              <Controller
                name="files"
                control={control}
                render={({ field }) => (
                  <MuiFileInput
                    fullWidth
                    multiple
                    value={field.value}
                    onChange={(value) => setValue("files", value)}
                  />
                )}
              />

              <Stack
                direction={"row"}
                sx={{
                  justifyContent: "space-between",
                  padding: "10px 0px",
                  px: 0,
                }}
              >
                <Button variant="outlined" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="outlined" type="submit">
                  Edit Post
                </Button>
              </Stack>
            </form>
          </Stack>
        </DialogContent>
      </Stack>
    </Dialog>
  );
};
