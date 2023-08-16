import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    Stack,
    DialogContentText,
  } from "@mui/material";
  import React, { useState } from "react";
  import { Controller, useForm } from "react-hook-form";
  import { useSelector } from "react-redux";
  import { useUserById } from "../../../hooks/react-query/useUsers";
import { useApplyJob } from "../../../hooks/react-query/useJobs";
import { formatDistance } from "date-fns";
  
 const JobOfferModal = ({ open, handleClose,job }) => {
    // Global states |  @redux/toolkit
    const { user } = useSelector((state) => state.auth);
    const applyJobMutation = useApplyJob(job, user._id);
    // Data fetching | react-query

    // React-hook-form
    const onclick =() =>{
      applyJobMutation.mutate();
      handleClose();
    }

  
    return (
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle variant="h5">{job.title}</DialogTitle>
        <Divider />
        <DialogContent sx={{ pb: 0 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <div>
              <DialogContentText >
                By {job.company.companyName}
              </DialogContentText>
              <DialogContentText >
                {job.company.companyDescription}
              </DialogContentText>
            </div>

            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <img
                  src={job.company.companyLogo}
                  alt="Icon"
                  className="w-16 h-16 rounded-lg object-cover"
                />
              </div>
          </Stack>
          <Divider className="my-4"/>
          <DialogContentText >
            {job.description}
          </DialogContentText>
          <Divider className="my-4"/>
          <p className="text-md  text-left font-normal text-green-500">
                {formatDistance(new Date(job.createdAt), new Date(), {
                  addSuffix: true,
                })}
          </p>
          
        </DialogContent>

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
              onClick={onclick}
            >
              Apply
            </button>
        </Stack>
        
      </Dialog>
    );
  };
  
  export default JobOfferModal;