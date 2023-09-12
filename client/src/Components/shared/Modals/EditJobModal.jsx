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
  import { MuiFileInput } from "mui-file-input";
  import React, { useState } from "react";
  import { Controller, useForm } from "react-hook-form";
  import { useSelector } from "react-redux";
  import { useEditPost } from "../../../hooks/react-query/usePosts";
  import uploadFile from "../../../utils/uploadFile";
  
  export const EditJobModal = ({ open, handleClose,job }) => {
    const { category } = useSelector((state) => state.global);
        const { mutate } = useEditPost(job._id, job.company, category);
  
    const { register, handleSubmit, control, setValue, reset } = useForm({
      defaultValues: {
        title: job.title,
        description: job.description,
      },
    });
  
   
  
    const onSubmit = async (data) => {
      mutate({ description: data.description });
      handleClose();
      reset();
    };
  
    return (
      <div
      className={`fixed inset-0 z-50 flex items-center justify-center  ${
      open ? "backdrop-blur-sm" : "hidden"
      }`}
    >
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4 p-5">Edit {job.title}</h2>
        <hr className="mb-4 gap-4" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("title")}
            className="w-full p-2 border rounded-md resize-none"
            placeholder="title"
          ></input>
          <textarea
            {...register("description")}
            className="w-full p-2 border rounded-md resize-none"
            placeholder="description"
            rows={4}
          ></textarea>
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 border rounded-md bg-gray-300 hover:bg-gray-400 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border rounded-md bg-green-500 text-white hover:bg-green-600 focus:outline-none"
            >
              Edit Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
  