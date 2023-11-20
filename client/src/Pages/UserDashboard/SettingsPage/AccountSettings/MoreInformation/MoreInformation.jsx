import { useSelector } from "react-redux";
import {
  useDeleteEducation,
  useEducation,
} from "../../../../../hooks/react-query/useEducation";
import { useState } from "react";
import AddEducationModel from "./components/AddEducationModel";
import AddExperienceModel from "./components/AddExperienceModel";
import da from "date-fns/esm/locale/da/index.js";
import { useDeleteExperience, useExperience } from "../../../../../hooks/react-query/useExperience";

const MoreInformation = () => {
  const { user } = useSelector((state) => state.auth);
  const { data:Educations } = useEducation(user?._id);
  const { mutate: Delete } = useDeleteEducation(user?._id);
  const { data:Experience } = useExperience(user?._id);
  const {mutate:DeleteExperience} = useDeleteExperience(user?._id);
  const [EducationModel, setEducationModel] = useState(false);
  const [ExperienceModel, setExperienceModel] = useState(false);
  

  if (!Educations) return null;
  return (
    <div className="mb-24 md:mb-8">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold  dark:text-white uppercase">
            Education Info
          </h2>
          <p className="text-gray-400 mb-4">
            Edit your account's Education information
          </p>
        </div>
      </div>
      <hr className=" dark:border-gray-200 mb-2" />
      <br />
      <button
        onClick={() => {
          setEducationModel(true);
        }}
      >
        add Education
      </button>
      <hr />
      {Educations?.map((item) => {
        return (
          <>
            <div key={item._id} className="flex justify-between">
              <div>
                <h1>{item?.School}</h1>
                <h1>{item?.Degree}</h1>
                <h1>{item?.FieldOfStudy}</h1>
              </div>
              <div>
                <h1>{item?.Description}</h1>
                <div className="flex gap-2">
                  {item?.skills.map((skill) => {
                    return <h1>{skill} </h1>;
                  })}
                </div>
              </div>
              <div>
                <button>Edit</button>
                <br />
                <button
                  onClick={() => {
                    Delete(item._id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
            <hr />
          </>
        );
      })}
      <div className="flex items-start justify-between mt-6">
        <div>
          <h2 className="text-xl font-bold  dark:text-white uppercase">
            Experience Info
          </h2>
          <p className="text-gray-400 mb-4">
            Edit your account's Experince information
          </p>
        </div>
      </div>
      <hr className=" dark:border-gray-200 mb-2" />
      <br />
      <button
        onClick={() => {
          setExperienceModel(true);
        }}
      >
        add Experince
      </button>
      <hr />
      {Experience?.map((item) => {
        return (
          <>
            <div key={item._id} className="flex justify-between">
              <div>
                <h1>{item?.title}</h1>
                <h1>{item?.company}</h1>
                <h1>{item?.type}</h1>
              </div>
              <div>
                <h1>{item?.description}</h1>
                <div className="flex gap-2">
                  {item?.skills.map((skill) => {
                    return <h1>{skill} </h1>;
                  })}
                </div>
              </div>
              <div>
                <button>Edit</button>
                <br />
                <button
                  onClick={() => {
                    DeleteExperience(item._id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
            <hr />
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
