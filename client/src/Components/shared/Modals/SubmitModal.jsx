import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useSubmitToChallenge } from "../../../hooks/react-query/useChallenges";
import LoadingSpinner from "../../LoadingSpinner";
import { axios } from "../../../axios";
import toast from "react-hot-toast";
import Modal from "../../Modals/index";
import CloseIcon from "../../icons/CloseIcon";
import Select from "react-select";
import TermsAndConditionsModal from "./TermsAndConditionsModal";
import {useSubmitToTeamChallenge} from "../../../hooks/react-query/useTeamChallenge";

const maxSize = 5 * 1024 * 1024;

const SubmitModal = ({ open, handleClose, setIsSubmitted, challenge, type, team }) => {
  const url = process.env.REACT_APP_API_ENDPOINT;
  const [filesSelected, setFilesSelected] = useState([]);
  const [SubmissionTitle, setSubmissionTitle] = useState("");
  const [SubmissionDescription, setSubmissionDescription] = useState("");
  const [filesPaths, setFilesPaths] = useState([]);
  const [platform, setPlatform] = useState("");
  const [link, setLink] = useState("");
  const [links, setLinks] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);

  const handleAddLink = () => {
    setLinks([...links, { platform, link }]);
    setPlatform("");
    setLink("");
  };
console.log('team', team)

  const { user } = useSelector((state) => state.auth);
  const { mutate: submitToChallenge, isLoading: isChallengeLoading } = useSubmitToChallenge(challenge._id);
  const { mutate: submitToTeamChallenge, isLoading: isTeamLoading } = useSubmitToTeamChallenge(challenge._id);

  const [validFiles, setValidFiles] = useState([]);

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "submission");
    const data = await axios.post(`${url}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    try {
      setFilesPaths((prev) => [...prev, data.data.downloadURL]);

      return data.data.downloadURL;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!SubmissionTitle.trim()) {
      toast.error("Submission title is required.");
      return;
    }

    if (!SubmissionDescription.trim()) {
      toast.error("Submission description is required.");
      return;
    }

    setIsUploading(true);
    const uploadedFilesPaths = [];
    for (let i = 0; i < validFiles.length; i++) {
      const file = validFiles[i];
      const fileUrl = await handleFileUpload(file);
      uploadedFilesPaths.push(fileUrl);
    }

    if (uploadedFilesPaths.length === 0) {
      toast.error("At least one file is required.");
      setIsUploading(false);
      return;
    }
    if (!agreeToTerms) {
      setTermsError(true);
      return;
    }
    console.log(uploadedFilesPaths);

    setIsUploading(false);
    if (type === "challenge") {
      submitToChallenge({
        challengeId: challenge._id,
        userId: user._id,
        title: SubmissionTitle,
        description: SubmissionDescription,
        filesPaths: uploadedFilesPaths,
        links: links,
      });
    } else if (type === "teamChallenge") {
      submitToTeamChallenge({
        teamChallengeId: challenge._id,
        teamId: team?.team?._id,
        title: SubmissionTitle,
        description: SubmissionDescription,
        filesPaths: uploadedFilesPaths,
        links: links,
      });
    }

    handleClose();
  };

  const handleFileSelect = (event) => {
    const files = event.target.files;
    setValidFiles([]);
    handleFiles(files);
  };
  const handleFiles = (files) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.size <= maxSize) {
        setValidFiles((prev) => [...prev, file]);
      } else {
        setValidFiles([]);
        toast.error("each File size should be less than 5MB");
      }
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className={`fixed inset-0 z-50 ${open ? "" : "hidden"} `}
    >
      <div className={`fixed inset-0 z-50 ${open ? "" : "hidden"} `}>
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10">
          <div className="max-h-full w-full max-w-[39rem] overflow-y-auto sm:rounded-2xl bg-white dark:bg-zinc-800">
            <div className="flex justify-between px-4 pt-4">
              <h4 className="text-2xl font-bold mb-4 text-black dark:text-white">
                Create a submission
              </h4>
              <button
                onClick={handleClose}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-xs md:text-sm w-7 h-7 md:w-8 md:h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="defaultModal"
              >
                <CloseIcon />
              </button>
            </div>
            <hr />
            <div className="p-4 md:p-6 space-y-4">
              <div>
                <form onSubmit={handleSubmit}>
                  <label className="block dark:text-white mb-2">
                    submission Title
                  </label>
                  <input
                      type="text"
                      name="title"
                      placeholder="submission Title"
                      onChange={(e) => setSubmissionTitle(e.target.value)}
                      className=" w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-green-500 dark:bg-zinc-700 bg-gray-100 mb-4 dark:text-white"
                      required
                  />

                  <label className="block dark:text-white mb-2">
                    Submission Description
                  </label>
                  <textarea
                      name="description"
                      type="text"
                      placeholder="Submission Description"
                      onChange={(e) => setSubmissionDescription(e.target.value)}
                      className=" w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-green-500 dark:bg-zinc-700 bg-gray-100 dark:text-white"
                      required
                      rows={6}
                  />
                </form>
              </div>
              <div className=" items-center space-y-2 ">
                <div>
                  <input
                      accept=".jpg,.jpeg,.png,.gif,.avi,.zip,application/*"
                      type="file"
                      id="fileInput"
                      name="file"
                      onChange={handleFileSelect}
                      multiple
                      className="dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block dark:text-white mb-2">Add Link</label>
                <div className="flex gap-2">
                  <select
                      type="text"
                      name="platform"
                      placeholder="platform"
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value)}
                      className="w-[20%] border border-gray-300 dark:text-white dark:bg-zinc-700 rounded-md px-3 py-2 mt-1"
                  >
                    <option value="">Select...</option>
                    <option value="Youtube">Youtube</option>
                    <option value="github">Github</option>
                    <option value="behance">behance</option>
                    <option value="Dribbale">dribbale</option>
                    <option value="others">others</option>
                  </select>
                  <input
                      type="text"
                      name="link"
                      placeholder="link"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      className="w-[70%] border border-gray-300 rounded-md px-3 py-2 mt-1 dark:bg-zinc-700 dark:text-white"
                  />
                  <button
                      onClick={handleAddLink}
                      className="bg-black text-white rounded-lg w-[10%] flex items-center justify-center hover:bg-green-500 hover:scale-105"
                  >
                    <FaPlus/>
                  </button>
                </div>
              </div>
              <div>
                {links.length > 0 &&
                    links.map((link) => {
                      return (
                          <p key={link.link} className="dark:text-white">
                            {link.platform} : {link.link}
                          </p>
                      );
                    })}
              </div>
              <div className="mt-4">
                <div className="flex items-center">
                  <input
                      type="checkbox"
                      id="termsCheckbox"
                      className="mr-2"
                      checked={agreeToTerms}
                      onChange={(e) => {
                        setAgreeToTerms(e.target.checked);
                        setTermsError(false);
                      }}
                  />
                  <label
                      htmlFor="termsCheckbox"
                      className="dark:text-white"
                  >
                    I agree to the{" "}
                    <span
                        className="text-blue-500 hover:underline cursor-pointer"
                        onClick={() => setTermsModalOpen(true)}
                    >
                      Terms and Conditions
                    </span>
                  </label>
                </div>
                {termsError && (
                    <p className="text-red-500 text-sm mt-2">
                      You must agree to the <span
                        className="text-blue-500 hover:underline cursor-pointer"
                        onClick={() => setTermsModalOpen(true)}
                    >Terms and Conditions</span> before submitting.
                    </p>
                )}
              </div>
              <div className="flex justify-end mt-4">
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    disabled={isChallengeLoading || isTeamLoading || isUploading}
                >
                  {isChallengeLoading || isTeamLoading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TermsAndConditionsModal
          open={termsModalOpen}
          handleClose={() => setTermsModalOpen(false)}
      />
    </Modal>
  );
};

export default SubmitModal;
