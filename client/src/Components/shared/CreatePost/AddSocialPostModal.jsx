import {
  Autocomplete,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useCategories } from "../../../hooks/react-query/useCategories";
import { useCreatePost } from "../../../hooks/react-query/usePosts";
import uploadFile from "../../../utils/uploadFile";

export const AddSocialPostModal = ({ open, handleClose }) => {
  // Global states |  @redux/toolkit
  const { category } = useSelector((state) => state.global);
  const { user } = useSelector((state) => state.auth);

  // Data fetching | react-query
  const { data: categories } = useCategories();
  const { mutate } = useCreatePost(category);

  // Form handling | react-hook-form
  const { register, handleSubmit, watch, control, setValue, reset } = useForm({
    defaultValues: {
      description: "",
      categories: [],
      files: [],
    },
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const uploadedFile = watch("files");

  const onSubmit = async (data) => {
    const postPicturePath = [];
    for (let file of data.files) {
      postPicturePath.push(await uploadFile(file, setUploadProgress));
    }

    mutate({
      userId: user._id,
      description: data.description,
      categories: data.categories,
      postPicturePath: postPicturePath,
    });

    reset();
    setUploadProgress(0);
    handleClose();
  };

  return (
    <div
      open={open}
      onClose={handleClose}
      className={`fixed inset-0 z-50 ${open ? "backdrop-blur-sm" : "hidden"}`}
    >
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-transparent absolute inset-0 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-xl">
            <Stack
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              spacing={1}
            >
              <DialogTitle variant="h5">Create a Post</DialogTitle>

              <Divider />

              <div className="px-4">
                <Stack spacing={1}>
                  <textarea
                    className="w-full h-40 p-2 border bg-white rounded focus:outline-none resize-none"
                    {...register("description", { required: true })}
                    placeholder="What's on your mind?"
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
                    <Stack>
                      <Typography>
                        Upload Progress: {uploadProgress}%
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={uploadProgress}
                      />
                    </Stack>
                  )}

                  <Controller
                    name="files"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <MuiFileInput
                        multiple
                        value={field.value}
                        onChange={(value) => setValue("files", value)}
                      />
                    )}
                  />
                </Stack>
              </div>

              <Stack
                direction={"row"}
                sx={{
                  justifyContent: "space-between",
                  px: 0,
                  padding: "20px 20px",
                }}
              >
                <Button variant="outlined" onClick={handleClose}>
                  Cancel
                </Button>
                <button
                  className=" bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded"
                  type="submit"
                >
                  Upload
                </button>
              </Stack>
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
};
