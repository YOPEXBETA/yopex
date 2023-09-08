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
    const picturePath = await uploadFile(
      data.picture[0],
      setUploadProgress,
      "companyLogo"
    );
    const documentPath = await uploadFile(
      data.document[0],
      setUploadProgressdoc,
      "companyDocument"
    );
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
    <div
      open={open}
      onClose={handleClose}
      className={`fixed inset-0 z-50 ${open ? "backdrop-blur-sm" : "hidden"}`}
    >
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-transparent absolute inset-0 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-xl">
            <form onSubmit={handleSubmit(onSubmit)} spacing={1}>
              <h5 className="text-lg font-bold p-4">Add a Company</h5>

              <div className="px-4">
                <input
                  {...register("name", { required: true })}
                  placeholder="Company Name"
                  className="block w-full p-2 border rounded-md focus:ring-green-300 mb-2"
                />
                <textarea
                  className="w-full h-40 p-2 border bg-[#ffffff] rounded focus:outline-none resize-none text-black"
                  {...register("description", { required: true })}
                  placeholder="Company Description"
                />
                <Divider />

                {uploadedFile && (
                  <div className="mb-4">
                    <p className="mb-1">Upload Progress: {uploadProgress}%</p>
                    <div className="bg-green-300 h-2 rounded">
                      <div
                        className="bg-green-500 h-2 rounded"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                <Controller
                  className="w-full"
                  name="picture"
                  onChange={(value) => setValue("picture", value)}
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <div className="mt-4">
                      <label className="block w-full p-2 hover:bg-green-700 border rounded-md shadow-sm bg-green-200 focus:ring focus:ring-opacity-50 cursor-pointer">
                        <span className="text-green-600">
                          {field.value && field.value.length > 0
                            ? // Display the file names when files are selected
                              `Files selected: ${field.value.length}`
                            : // Display this when no file is chosen
                              "Upload File"}
                        </span>
                        <input
                          type="file"
                          multiple
                          onChange={(e) => field.onChange(e.target.files)}
                          className="hidden"
                        />
                      </label>
                    </div>
                  )}
                />
                <Divider />
                {uploadedFiledoc && (
                  <div className="mb-4">
                    <p className="mb-1">
                      Upload Progress: {uploadProgressdoc}%
                    </p>
                    <div className="bg-green-300 h-2 rounded">
                      <div
                        className="bg-green-500 h-2 rounded"
                        style={{ width: `${uploadProgressdoc}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                <Controller
                  name="document"
                  control={control}
                  rules={{ required: true }}
                  onChange={(value) => setValue("document", value)}
                  render={({ field }) => (
                    <div className="mt-4">
                      <label className="block w-full p-2 hover:bg-green-700 border rounded-md shadow-sm bg-green-200 focus:ring focus:ring-opacity-50 cursor-pointer">
                        <span className="text-green-600">
                          {field.value && field.value.length > 0
                            ? // Display the file names when files are selected
                              `Files selected: ${field.value.length}`
                            : // Display this when no file is chosen
                              "Upload File"}
                        </span>
                        <input
                          type="file"
                          multiple
                          onChange={(e) => field.onChange(e.target.files)}
                          className="hidden"
                        />
                      </label>
                    </div>
                  )}
                />
              </div>

              <div className="flex justify-between px-4 py-4">
                <button
                  className="bg-white hover:bg-green-700 text-green-500 px-4 py-2 rounded border-2 border-green-500"
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className=" bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  Add Company
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
