import { useEditChallenge } from "../../../hooks/react-query/useChallenges";
import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useCategories } from "../../../hooks/react-query/useCategories";
import { useSkills } from "../../../hooks/react-query/useSkills";

export const EditChallengeModal = ({ open, handleClose, challenge }) => {
  const { mutate } = useEditChallenge(challenge._id);
  const { data: Skills } = useSkills();
  const itSkills = Skills?.map((skill) => skill.name);
  const { data: categorys } = useCategories();
  const itCategory = categorys?.map((category) => category.name);

  const [formData, setFormData] = useState({ ...challenge });

  const handleCategoryChange = (_, value) => {
    setFormData({
      ...formData,
      category: value,
    });
  };

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;

    // Update the corresponding field in formData based on fieldName
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: value,
    }));
  };

  const handleSkillsChange = (_, value) => {
    setFormData({
      ...formData,
      RecommendedSkills: value,
    });
  };

  const handleEdit = () => {
    mutate({
      title: formData.title,
      description: formData.description,
      price: formData.price,
      nbruser: formData.nbruser,
      category: formData.category,
      RecommendedSkills: formData.RecommendedSkills,
    });
    handleClose();
  };

  return (
    <div
      open={open}
      className={`fixed inset-0 z-50 ${open ? "backdrop-blur-sm" : "hidden"} `}
    >
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-xl md:w-[40rem] p-4 h-[40rem] border  w-screen overflow-y-auto max-h-full">
          <div>
            <button
              className="text-gray-400 absolute bg-zinc-900 rounded-full right-4 top-4  hover:bg-gray-200 hover:text-gray-900 text-xs md:text-sm w-7 h-7 md:w-8 md:h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={handleClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
            <h2 className="text-lg leading-6 text-gray-900 mb-4 font-bold">
              Edit "{challenge.title}"
            </h2>
            <div className="mt-2">
              <label>Challenge Name</label>
              <input
                className="w-full py-2 px-3 rounded border border-gray-300 focus:outline-none focus:border-green-500 mb-2"
                type="text"
                placeholder="Challenge name"
                name="title"
                value={formData.title}
                onChange={(e) => handleInputChange(e, "title")}
                required
              />

              <label>Challenge Description</label>
              <textarea
                className="w-full h-40 p-2 border bg-white rounded focus:outline-none resize-none mb-2"
                name="description"
                value="Challenge description"
                onChange={(e) => handleInputChange(e, "description")}
              />

              <label>Challenge Prize</label>
              <input
                className="w-full py-2 px-3 rounded border border-gray-300 focus:outline-none focus:border-green-500 mb-2"
                type="text"
                placeholder="Challenge Prize"
                name="price"
                value={formData.price}
                onChange={(e) => handleInputChange(e, "price")}
                required
              />

              <label>Max Challenger</label>
              <input
                className="w-full py-2 px-3 rounded border border-gray-300 focus:outline-none focus:border-green-500 mb-2"
                type="text"
                placeholder="Max Challenger"
                name="nbruser"
                value={formData.nbruser}
                onChange={(e) => handleInputChange(e, "nbruser")}
              />
              {itCategory && (
                <>
                  <label>Categories</label>
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={itCategory}
                    getOptionLabel={(option) => option}
                    value={formData.category}
                    onChange={(_, value) => handleCategoryChange(_, value)}
                    filterOptions={(options, state) =>
                      options.filter((option) =>
                        option
                          .toLowerCase()
                          .includes(state.inputValue.toLowerCase())
                      )
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        placeholder="Update Categories"
                      />
                    )}
                  />
                </>
              )}
              {itSkills && (
                <>
                  <label>Recommended Skills</label>
                  <Autocomplete
                    className="mt-2"
                    multiple
                    id="tags-outlined"
                    options={itSkills}
                    getOptionLabel={(option) => option}
                    value={formData.RecommendedSkills}
                    onChange={(_, value) => handleSkillsChange(_, value)}
                    filterOptions={(options, state) =>
                      options.filter((option) =>
                        option
                          .toLowerCase()
                          .includes(state.inputValue.toLowerCase())
                      )
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        placeholder="Update Recommended Skills"
                      />
                    )}
                  />
                </>
              )}
              <div className="mt-4">
                <button
                  id="btn1"
                  className="px-6 py-2 text-white rounded-md w-full border-2 bg-green-500 hover:bg-green-600"
                  onClick={handleEdit}
                >
                  Edit your Challenge
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
