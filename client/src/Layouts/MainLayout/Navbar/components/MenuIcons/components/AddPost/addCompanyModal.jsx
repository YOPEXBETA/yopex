import React, { useState } from "react";
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
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import uploadFile from "../../../../../../../utils/uploadFile";
import { useCreateCompany } from "../../../../../../../hooks/react-query/useCompany";

export const AddCompanyModal = ({ open, handleClose }) => {
  const { register, handleSubmit, control, setValue, reset, watch } = useForm({
    defaultValues: {
      name: "",
      description: "",
      picture: [],
    },
  });
  const { mutate } = useCreateCompany();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadProgressdoc, setUploadProgressdoc] = useState(0);
  const uploadedFile = watch("picture");
  const uploadedFiledoc = watch("document");

  const onSubmit = async (data) => {
    const picturePath = await uploadFile(data.picture[0], setUploadProgress,"companyLogo");
    const documentPath = await uploadFile(data.document[0], setUploadProgressdoc,"companyDocument");
    mutate({
        companyName: data.name,
        companyDescription: data.description,
        companyLogo: picturePath,
        companyDocument: documentPath,
      });

    reset();
    setUploadProgressdoc(0);
    setUploadProgress(0);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={1}>
        <DialogTitle variant="h5">Add a Company</DialogTitle>

        <Divider />

        <DialogContent sx={{ pb: 0 }}>
          <TextField
            {...register("name", { required: true })}
            label="Company Name"
            fullWidth
            margin="normal"
          />
          <textarea
            className="w-full h-40 p-2 border bg-[#ffffff] rounded focus:outline-none resize-none text-black"
            {...register("description", { required: true })}
            placeholder="Company Description"
          />
          <Divider />
          
          {uploadedFile && (
            <Stack>
              <Typography>Upload Progress: {uploadProgress}%</Typography>
              <LinearProgress variant="determinate" value={uploadProgress} />
            </Stack>
          )}
          <Controller
          className="w-full"
                name="picture"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <MuiFileInput
                    multiple
                    value={field.value}
                    onChange={(value) => setValue("picture", value)}
                  />
                )}
              /> 
            <Divider />
            {uploadedFiledoc && (
            <Stack>
              <Typography>Upload Progress: {uploadProgressdoc}%</Typography>
              <LinearProgress variant="determinate" value={uploadProgressdoc} />
            </Stack>
          )}
          <Controller
                name="document"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <MuiFileInput
                    multiple
                    value={field.value}
                    onChange={(value) => setValue("document", value)}
                  />
                )}
              /> 

       
        </DialogContent>

        <Stack
          direction={"row"}
          sx={{
            justifyContent: "space-between",
            px: 0,
            padding: "20px 19px",
          }}
        >
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <button type="submit"   className=" bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded">
            Add Company
          </button>
        </Stack>
      </Stack>
    </Dialog>
  );
};
