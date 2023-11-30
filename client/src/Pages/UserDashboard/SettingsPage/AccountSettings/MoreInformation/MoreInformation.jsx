import { useSelector } from "react-redux";
import {
  useDeleteEducation,
  useEducation,
} from "../../../../../hooks/react-query/useEducation";
import { useState } from "react";
import AddEducationModel from "./components/AddEducationModel";
import AddExperienceModel from "./components/AddExperienceModel";
import {
  useDeleteExperience,
  useExperience,
} from "../../../../../hooks/react-query/useExperience";
import { MdEdit, MdDelete } from "react-icons/md";

const MoreInformation = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: Educations } = useEducation(user?._id);
  const { mutate: Delete } = useDeleteEducation(user?._id);
  const { data: Experience } = useExperience(user?._id);
  const { mutate: DeleteExperience } = useDeleteExperience(user?._id);
  const [EducationModel, setEducationModel] = useState(false);
  const [ExperienceModel, setExperienceModel] = useState(false);

  if (!Educations) return null;
  return (
    <div className="mb-24 md:mb-8">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold  dark:text-white uppercase">
            Experience & Education
          </h2>
          <p className="text-gray-400 mb-4">
            Edit your account's Education information
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg mt-4 mb-2">Add Education</h2>
          <button
            onClick={() => {
              setEducationModel(true);
            }}
            className="rounded-full p-2 bg-white border text-zinc-500 focus:outline-none hover:bg-green-500 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>{" "}
        </div>
        <hr className="border w-full" />
      </div>

      {Educations?.map((item) => {
        return (
          <>
            <div key={item._id} className="flex flex-col justify-between">
              <div className="mb-4 flex justify-between">
                <div>
                  <h1 className="text-lg font-semibold">{item?.Degree}</h1>
                  <h1 className="text-green-500">{item?.School}</h1>
                  <h1>{item?.FieldOfStudy}</h1>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="rounded-full p-2 bg-white border text-zinc-500 focus:outline-none hover:bg-zinc-500 hover:text-white">
                    <MdEdit size={20} />
                  </button>
                  <button
                    onClick={() => {
                      Delete(item._id);
                    }}
                    className="rounded-full p-2 bg-white border text-zinc-500 focus:outline-none hover:bg-red-500 hover:text-white"
                  >
                    <MdDelete size={20} />
                  </button>
                </div>
              </div>

              <div>
                <h1>{item?.Description}</h1>
                <div className="flex flex-wrap gap-2 my-4">
                  {item?.skills?.map((skill, index) => (
                    <span
                      className="px-2 py-1 bg-white border rounded-full"
                      key={index}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <hr className="border-t border-gray-300 my-4" />
          </>
        );
      })}

      <div className="flex flex-col gap-4 mb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg mt-4 mb-2">Add Experience</h2>
          <button
            onClick={() => {
              setExperienceModel(true);
            }}
            className="rounded-full p-2 bg-white border text-zinc-500 focus:outline-none hover:bg-green-500 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>{" "}
        </div>
        <hr className="border w-full" />
      </div>
      {Experience?.map((item) => {
        return (
          <>
            <div className="mb-4 flex justify-between">
              <div>
                <h1 className="text-lg font-semibold">{item?.title}</h1>
                <h1 className="text-green-500">{item?.company}</h1>
                <h1>{item?.type}</h1>
              </div>
              <div className="flex flex-col gap-2">
                <button className="rounded-full p-2 bg-white border text-zinc-500 focus:outline-none hover:bg-zinc-500 hover:text-white">
                  <MdEdit size={20} />
                </button>
                <button
                  onClick={() => DeleteExperience(item._id)}
                  className="rounded-full p-2 bg-white border text-zinc-500 focus:outline-none hover:bg-red-500 hover:text-white"
                >
                  <MdDelete size={20} />
                </button>
              </div>
            </div>

            <div>
              <h1>{item?.description}</h1>
              <div className="flex flex-wrap gap-2 my-4">
                {item?.skills?.map((skill, index) => (
                  <span
                    className="px-2 py-1 bg-white border rounded-full"
                    key={index}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <hr className="border-t border-gray-300 my-4" />
          </>
        );
      })}
      {ExperienceModel && (
        <AddExperienceModel
          open={ExperienceModel}
          handleClose={setExperienceModel}
          userId={user._id}
        />
      )}
      {EducationModel && (
        <AddEducationModel
          open={EducationModel}
          handleClose={setEducationModel}
          userId={user._id}
        />
      )}
    </div>
  );
};

export default MoreInformation;
