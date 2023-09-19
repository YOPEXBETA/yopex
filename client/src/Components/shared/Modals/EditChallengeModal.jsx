import { useEditChallenge } from "../../../hooks/react-query/useChallenges";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";
import { useCategories } from "../../../hooks/react-query/useCategories";
import { useSkills } from "../../../hooks/react-query/useSkills";

export const EditChallengeModal = ({ open, handleClose,challenge }) => {

  const { mutate } = useEditChallenge(challenge._id);

  const { data:Skills } = useSkills();
  const itSkills = Skills?.map((skill) => skill.name); 
   const {data:categorys} = useCategories();
  const itCategory = categorys?.map((category) => category.name);

  const { register, handleSubmit, control, setValue, reset } = useForm({
    defaultValues: {
      title: challenge.title,
      description: challenge.description,
      price: challenge.price,
      nbruser : challenge.nbruser,
      category:challenge.category,
      RecommendedSkills:challenge.RecommendedSkills,
    },

  });
  const onSubmit = async (data) => {

    mutate({ 
      title: data.title, 
      description: data.description ,
      price: data.price ,
      category:data.category,
      RecommendedSkills:data.RecommendedSkills,
    });
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
            Edit "{challenge.title}"
          </h2>
          <div className="mt-2">
            <form
            id="form1"
            onSubmit={handleSubmit(onSubmit)}>
              <input
                className="w-full py-2 px-3 rounded border border-gray-300 focus:outline-none focus:border-green-500 mb-2"
                type="text"
                placeholder={challenge.title}
                {...register("title")}
                margin="normal"
                variant="outlined"
                required
                fullWidth
                id="title"
                label="title"
                multiline
                rows={4}
              />
              <textarea
                className="w-full h-40 p-2 border bg-white rounded focus:outline-none resize-none mb-2"
                {...register("description")}
                placeholder={challenge.description}
                id="companyDescription"
                label="companyDescription"
              />
                <input
                className="w-full py-2 px-3 rounded border border-gray-300 focus:outline-none focus:border-green-500 mb-2"
                type="text"
                placeholder={challenge.price}
                {...register("price")}
                margin="normal"
                variant="outlined"
                required
                fullWidth
                id="salary"
                label="salary"
                multiline
                rows={4}
              />
                <input
                className="w-full py-2 px-3 rounded border border-gray-300 focus:outline-none focus:border-green-500 mb-2"
                type="text"
                placeholder={challenge.nbruser}
                {...register("nbruser")}
                margin="normal"
                variant="outlined"
                required
                fullWidth
                multiline
                rows={4}
              />
               <Controller
                  control={control}
                  name="category"
                  defaultValue={"Any"}
                  render={({ field }) => itCategory && (
                    <Autocomplete
                      multiple
                      id="tags-outlined"
                      options={itCategory}
                      getOptionLabel={(option) => option}
                      value={field.value}
                      onBlur={field.onBlur}
                      onChange={(e, value) =>
                        setValue("category", value)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          placeholder="Update Categories"
                        />
                      )}
                    />
                  )}
                />
                 <Controller
                 className="mt-2"
                  control={control}
                  name="RecommendedSkills"
                  defaultValue={"Any"}
                  render={({ field }) => itSkills && (
                    <Autocomplete
                      multiple
                      id="tags-outlined"
                      options={itSkills}
                      getOptionLabel={(option) => option}
                      value={field.value}
                      onBlur={field.onBlur}
                      onChange={(e, value) =>
                        setValue("RecommendedSkills", value)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          placeholder="Update Recommanded Skills"
                        />
                      )}
                    />
                  )}
                />
              <div className="flex justify-between mt-4">
                <button
                  className="bg-white px-6 py-2 text-green-500 rounded-md border-2 border-green-500 hover:bg-gray-200"
                  onClick={handleClose}
                  type="button"
                >
                  Cancel
                </button>
                <button
                id="btn1"
                  className=" px-6 py-2 text-white rounded-md border-2 bg-green-500 hover:bg-green-600"
                 type="submit"
                >
                  Edit your Challenge
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};
