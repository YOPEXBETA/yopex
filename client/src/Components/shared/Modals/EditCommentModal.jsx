import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useEditComment } from "../../../hooks/react-query/useComments";


  
  export const EditCommentModal = ({ open, handleClose,comment }) => {
    
    const {mutate} = useEditComment(comment._id)

    const { register, handleSubmit, control, setValue, reset } = useForm({
      defaultValues: {
        desc : comment.desc,
      },
    });
  
    const onSubmit = async (data) => {
      mutate({ 
      desc : data.desc
      });
      handleClose();
      
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
              Edit Comment
            </h2>
            <div className="mt-2">
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  className="w-full py-2 px-3 rounded border border-gray-300 focus:outline-none focus:border-green-500 mb-2"
                  type="text"
                  placeholder={comment.desc}
                  {...register("desc")}
                  margin="normal"
                  variant="outlined"
                  required
                  fullWidth
                  id="desc"
                  label="desc"
                  multiline
                  rows={4}
                />
                <button
                    className="bg-white px-6 py-2 text-green-500 rounded-md border-2 border-green-500 hover:bg-gray-200"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                <button
                 className=" px-6 py-2 text-white rounded-md border-2 bg-green-500 hover:bg-green-600"
                type="submit"
                >
                    Edit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
  