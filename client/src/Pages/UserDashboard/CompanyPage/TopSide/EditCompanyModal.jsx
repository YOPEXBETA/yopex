import {
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
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateJob } from "../../../../hooks/react-query/useJobs";
import { useUserById } from "../../../../hooks/react-query/useUsers";
import { useSelector } from "react-redux";
import { Controller } from "react-hook-form";
import { MuiFileInput } from "mui-file-input";
import { useEditCompany } from "../../../../hooks/react-query/useCompany";
import uploadFile from "../../../../utils/uploadFile";

export const EditCompanyModal = ({ open, handleClose,company }) => {

  const { mutate } = useEditCompany(company._id);
  console.log(company)
  
  const [uploadProgress, setUploadProgress] = useState(0);
  const { user } = useSelector((state) => state.auth);
  const { register, handleSubmit, control, setValue, reset, watch } = useForm({
    defaultValues: {
      companyName: company.companyName,
      companyDescription: company.companyDescription,
      files: [],
    },
  });
  const uploadedFile = watch("files");
   
  const onSubmit = async (data) => {
    if (data.files.length > 0) {
      const companyLogo = [];
      for (let file of data.files) {
        companyLogo.push(await uploadFile(file, setUploadProgress));
      }
      return mutate({ 
        companyDescription: data.companyDescription,
        companyName: data.companyName,
        companyLogo,
      });
    }

    console.log(data);

    mutate({ 
      companyDescription: data.companyDescription,
    companyName: data.companyName,
    companyLogo: data.companyLogo,
    
    });
    setUploadProgress(0);
    handleClose();
    reset();
  };

  

  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto  ${
        open ? "block" : "hidden"
      }`}
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 ">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-96 sm:p-6 lg:w-[40rem]">
          <div>
            <h2 className="text-lg leading-6 text-gray-900 mb-4 font-bold">
              Edit "{company.companyName}" now
            </h2>
            <div className="mt-2">
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  className="w-full py-2 px-3 rounded border border-gray-300 focus:outline-none focus:border-green-500 mb-2"
                  type="text"
                  placeholder={company.companyName}
                  {...register("companyName")}
                margin="normal"
                variant="outlined"
                required
                fullWidth
                id="companyName"
                label="companyName"
                multiline
                rows={4}
                />
                <textarea
                  className="w-full h-40 p-2 border bg-white rounded focus:outline-none resize-none mb-2"
                  {...register("companyDescription")}
                  placeholder={company.companyDescription}
                  id="companyDescription"
                  label="companyDescription"
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
                <div className="flex justify-between">
                  <button
                    className="bg-white px-6 py-2 text-green-500 rounded-md border-2 border-green-500"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                  <Button variant="contained" type="submit">
                  Edit your company
                </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};