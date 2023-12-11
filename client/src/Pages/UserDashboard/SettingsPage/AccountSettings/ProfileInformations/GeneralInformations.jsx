import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { toast } from "react-hot-toast";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import countries from "../../../../../countries.json";
import { useSkills } from "../../../../../hooks/react-query/useSkills";
import { useFileUpload } from "../../../../../hooks/react-query/useUsers";
import { edit, reset } from "../../../../../redux/auth/authSlice";
import AvatarProfile from "../../../../../assets/images/AvatarProfile.jpg";
import { format } from "date-fns";
import SocialMediaLinks from "./components/SocialMediaLinks";

const GeneralInformations = () => {
  const [openPostModal, setOpenPostModal] = useState(false);
  const dispatch = useDispatch();
  const fileUploadMutation = useFileUpload();
  const { user, error, loading, success } = useSelector((state) => state.auth);
  const { data: skills } = useSkills("");
  const formattedSkills = user?.skills?.map((skill) => ({
    label: skill?.name,
    value: skill?._id,
  }));
  console.log(formattedSkills, "formattedSkills");
  console.log(user?.skills, "skills");

  /*const [github, setGithub] = useState(
    user?.socialMediaLinks?.find((link) => link.platform === "github")?.url ||
      ""
  );
  const [linkedin, setLinkedin] = useState(
    user?.socialMediaLinks?.find((link) => link.platform === "linkedin")?.url ||
      ""
  );
  const [behance, setBehance] = useState(
    user?.socialMediaLinks?.find((link) => link.platform === "behance")?.url ||
      ""
  );
  const [dribbble, setDribbble] = useState(
    user?.socialMediaLinks?.find((link) => link.platform === "dribbble")?.url ||
      ""
  );
  const [instagram, setInstagram] = useState(
    user?.socialMediaLinks?.find((link) => link.platform === "instagram")
      ?.url || ""
  );*/

  const [showGithubInput, setShowGithubInput] = useState(false);
  const [showLinkedinInput, setShowLinkedinInput] = useState(false);
  const [showBehanceInput, setShowBehanceInput] = useState(false);
  const [showDribbbleInput, setShowDribbbleInput] = useState(false);
  const [showInstagramInput, setShowInstagramInput] = useState(false);

  useEffect(() => {
    dispatch(reset());
  }, []);

  const formatDate = (date) => {
    return date ? format(new Date(date), "yyyy-MM-dd") : "";
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      firstname: user?.firstname,
      lastname: user?.lastname,
      occupation: user?.occupation,
      birthDate: user?.birthDate ? formatDate(user?.birthDate) : null,
      websiteURL: user?.websiteURL,
      country: user?.country,
      gender: user?.gender,
      phoneNumber: user?.phoneNumber,
      userDescription: user?.userDescription,
      skills: formattedSkills,
    },
  });

  const countryList = countries?.map((country) => country.name.common);

  const onSubmit = async (data) => {
    const { file, skills, ...values } = data;

    if (data.file.length > 0) {
      const formData = new FormData();
      formData.append("file", file[0]);
      const data = await fileUploadMutation.mutateAsync(formData);
      const SkillsId = data.skills.map((skill) => skill.value);

      return dispatch(
        edit({
          ...values,
          picturePath: data.data.downloadURL,
          skills: SkillsId,
          /*socialMediaLinks: [
            { platform: "github", url: github },
            { platform: "linkedin", url: linkedin },
            { platform: "behance", url: behance },
            { platform: "dribbble", url: dribbble },
            { platform: "instagram", url: instagram },
          ],*/
        })
      );
    }
    return dispatch(
      edit({
        ...values,
        skills: skills.map((skill) => skill.value),

        /* socialMediaLinks: [
          { platform: "github", url: github },
          { platform: "linkedin", url: linkedin },
          { platform: "behance", url: behance },
          { platform: "dribbble", url: dribbble },
          { platform: "instagram", url: instagram },
        ],*/
      })
    );
  };

  return (
    <div className="md:mt-0 mt-8">
      {/*<div className="flex items-start justify-between">
        <div>
          <button
            onClick={toggleModal}
            className="hover:bg-white  hover:bg-opacity-10 hover:text-green-500 flex items-center  py-1.5 px-4 rounded space-x-2 cursor-pointer"
          >
            q{" "}
          </button>
        </div>
        <EditSocialLinksModal open={openPostModal} handleClose={toggleModal} />
  </div>*/}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-3"
      >
        <div className="relative mb-4">
          <div className="relative w-24 h-24">
            {user?.picturePath ? (
              <img
                alt="picture"
                src={user?.picturePath}
                className="rounded-full object-cover w-24 h-24 border-2"
              />
            ) : (
              <img
                alt="default"
                src={AvatarProfile}
                className="rounded-full object-cover w-24 h-24 border-2"
              />
            )}
            <label
              htmlFor="fileInput"
              className="absolute bottom-0 right-0 p-2 bg-green-500 rounded-full text-white cursor-pointer"
            >
              <input
                id="fileInput"
                hidden
                accept="image/*"
                type="file"
                {...register("file")}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-2"
              />
              <FaCamera className="w-4 h-4" />
            </label>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="col-span-1">
            <label htmlFor="firstname" className="block  dark:text-gray-300">
              First Name
            </label>
            <input
              id="firstname"
              type="text"
              placeholder="First name"
              className="w-full border border-gray-300 dark:bg-zinc-700 dark:border-zinc-600 dark:text-gray-300 rounded-md px-3 py-2 mt-1 resize-none bg-white"
              {...register("firstname")}
            />
          </div>
          <div className="col-span-1">
            <label htmlFor="lastname" className="block  dark:text-gray-300">
              Last Name
            </label>
            <input
              id="lastname"
              type="text"
              placeholder="Last name"
              className="w-full border dark:bg-zinc-700 dark:border-zinc-600 dark:text-gray-300 border-gray-300 rounded-md px-3 py-2 mt-1 resize-none bg-white"
              {...register("lastname")}
            />
          </div>
        </div>
        <div className="grid grid-cols-1">
          <div className="col-span-1">
            <label className="dark:text-gray-300">Occupation</label>

            <input
              defaultValue={user?.occupation}
              type="text"
              placeholder="EX: Web developer, Art Director, Student"
              className="w-full border dark:bg-zinc-700 dark:border-zinc-600 dark:text-gray-300 border-gray-300 rounded-md px-3 py-2 mt-1 resize-none bg-white"
              {...register("occupation")}
            />
          </div>
        </div>
        <div className="grid grid-cols-1">
          <div className="col-span-1">
            <label className="dark:text-gray-300">Website url</label>
            <input
              type="text"
              placeholder="Website url"
              className="w-full border dark:bg-zinc-700 dark:border-zinc-600 dark:text-gray-300 border-gray-300 rounded-md px-3 py-2 mt-1 resize-none bg-white"
              {...register("websiteURL")}
            />
          </div>
        </div>
        <div className="grid grid-cols-1">
          <div className="col-span-1">
            <label className="dark:text-gray-300">Description</label>

            <textarea
              id="userDescription"
              placeholder="Description"
              rows={6}
              className="w-full border dark:bg-zinc-700 dark:border-zinc-600 dark:text-gray-300 border-gray-300 rounded-md px-3 py-2 mt-1 resize-none bg-white"
              defaultValue={user.userDescription}
              {...register("userDescription")}
            />
          </div>
        </div>
        <div className="grid grid-cols-1">
          <div className="col-span-1">
            <label className="dark:text-gray-300">Email</label>
            <input
              placeholder="Email"
              disabled
              className="w-full border dark:bg-zinc-800 dark:border-zinc-600 dark:text-gray-300 border-gray-300 rounded-md px-3 py-2 mt-1 resize-none bg-gray-200"
              type="email"
              value={user.email}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="col-span-1">
            <label className="dark:text-gray-300">Country</label>
            <select
              id="demo-multiple-name"
              className="w-full border dark:bg-zinc-700 dark:border-zinc-600 dark:text-gray-300 border-gray-300 rounded-md px-3 py-2 mt-1 bg-white"
              defaultValue={
                user.country
                  ? user.country.charAt(0).toUpperCase() + user.country.slice(1)
                  : ""
              }
              {...register("country")}
            >
              <option value="">Choose your country</option>
              {countryList.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-1">
            <label className="dark:text-gray-300">Gender</label>
            <select
              id="gender-select"
              className="w-full border dark:bg-zinc-700 dark:border-zinc-600 dark:text-gray-300 border-gray-300 rounded-md px-3 py-2 mt-1 bg-white"
              defaultValue={user.gender}
              {...register("gender")}
            >
              <option value="">Choose your gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="col-span-1">
            <label shrink={true} className="dark:text-gray-300">
              Date of Birth
            </label>

            <input
              type="date"
              className="w-full border dark:bg-zinc-700 dark:border-zinc-600 dark:text-gray-300 border-gray-300 rounded-md px-3 py-2 mt-1 resize-none bg-white"
              {...register("birthDate")}
            />
          </div>

          <div className="col-span-1">
            <label className="dark:text-gray-300 ">Phone Number</label>

            <input
              id="phone"
              placeholder="+216"
              className="w-full border dark:bg-zinc-700 dark:border-zinc-600 dark:text-gray-300 border-gray-300 rounded-md px-3 py-2 mt-1 resize-none bg-white"
              defaultValue={user.phoneNumber}
              {...register("phoneNumber")}
            />
          </div>
        </div>
        <div className="grid grid-cols-1">
          <div className="col-span-1">
            <label className="dark:text-gray-300 ">Skills</label>

            <Controller
              name="skills"
              control={control}
              render={({ field: { onChange, value } }) => (
                <div className="w-full dark:bg-zinc-700">
                  <Select
                    isMulti
                    className="my-react-select-container"
                    classNamePrefix="my-react-select"
                    id="tags-outlined"
                    options={
                      skills
                        ? skills?.map((skill) => ({
                            label: skill.name,
                            value: skill._id,
                          }))
                        : []
                    }
                    onChange={(selectedOptions) => onChange(selectedOptions)}
                    value={value}
                    placeholder="Select Skills"
                  />
                </div>
              )}
            />
          </div>
        </div>
        <hr />
        <div className="py-4">
          <div className="space-y-6">
            <p className="dark:text-white uppercase font-bold">
              social media links
            </p>
            {/*
            <SocialMediaLinks
              label="Github"
              showInput={showGithubInput}
              inputValue={github}
              setInputValue={setGithub}
              toggleInput={() => setShowGithubInput(!showGithubInput)}
            />

            <SocialMediaLinks
              label="Linkedin"
              showInput={showLinkedinInput}
              inputValue={linkedin}
              setInputValue={setLinkedin}
              toggleInput={() => setShowLinkedinInput(!showLinkedinInput)}
            />

            <SocialMediaLinks
              label="Behance"
              showInput={showBehanceInput}
              inputValue={behance}
              setInputValue={setBehance}
              toggleInput={() => setShowBehanceInput(!showBehanceInput)}
            />

            <SocialMediaLinks
              label="Dribbble"
              showInput={showDribbbleInput}
              inputValue={dribbble}
              setInputValue={setDribbble}
              toggleInput={() => setShowDribbbleInput(!showDribbbleInput)}
            />

            <SocialMediaLinks
              label="Instagram"
              showInput={showInstagramInput}
              inputValue={instagram}
              setInputValue={setInstagram}
              toggleInput={() => setShowInstagramInput(!showInstagramInput)}
            />
            */}
          </div>
        </div>

        <div className="grid grid-cols-1">
          <div className="col-span-1">
            <button
              className={`${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 dark:hover:bg-green-600 hover:bg-green-600"
              } px-4 py-2 rounded-lg text-white w-40`}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting" : "Save"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default GeneralInformations;
