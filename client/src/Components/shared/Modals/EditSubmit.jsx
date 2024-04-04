import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import {
  useEditSubmission,
  useSubmitToChallenge,
  useUserSubmission,
} from "../../../hooks/react-query/useChallenges";
import { axios } from "../../../axios";
import LoadingSpinner from "../../LoadingSpinner";
import CloseIcon from "../../icons/CloseIcon";
import Modal from "../../Modals";
import { MdDelete } from "react-icons/md";

const maxSize = 5 * 1024 * 1024; // 5 megabytes

const EditSubmitModal = ({ open, handleClose, participant }) => {
  const url = process.env.REACT_APP_API_ENDPOINT;
  const [filesSelected, setFilesSelected] = useState([]);
  const [SubmissionTitle, setSubmissionTitle] = useState("");
  const [SubmissionDescription, setSubmissionDescription] = useState("");
  const [filesPaths, setFilesPaths] = useState([]);
  const [platform, setPlatform] = useState("");
  const [link, setLink] = useState("");
  const [links, setLinks] = useState([]);
  const { id } = useParams();
  const { data: submissions } = useUserSubmission(id, participant);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (submissions) {
      setSubmissionTitle(submissions.title);
      setSubmissionDescription(submissions.description);
      setFilesPaths(submissions.filesPaths);
      setLinks(submissions.links);
      setFilesSelected(submissions.filesPaths);
      setPlatform(submissions.links.platform);
    }
  }, [submissions]);

  const handleAddLink = () => {
    setLinks([...links, { platform, link }]);
    setPlatform("");
    setLink("");
  };

  const { user } = useSelector((state) => state.auth);
  const { mutate } = useEditSubmission(id, participant);

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

  // const dispatch = useDispatch();

  const handleSubmit = async () => {
    mutate({
      challengeId: id,
      userId: user._id,
      title: SubmissionTitle,
      description: SubmissionDescription,
      filesPaths: filesPaths,
      links: links,
    });

    handleClose();
  };

  const validFiles = [];
  const invalidFiles = [];

  const handleFileSelect = async (event) => {
    const files = event.target.files;
    handleFiles(files);
    setIsUploading(true);
    for (const file of validFiles) {
      const url = await handleFileUpload(file);

      setFilesSelected([...filesSelected, url]);
      setIsUploading(false);
    }
  };

  const handleFiles = (files) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.size <= maxSize) {
        validFiles.push(file);
      } else {
        invalidFiles.push(file);
      }
    }
  };
  const handelClickDeleteFile = (filex) => {
    const newFiles = filesSelected.filter((file, i) => file !== filex);
    setFilesSelected(newFiles);
    const newFilesPaths = filesPaths.filter((file, i) => file !== filex);
    setFilesPaths(newFilesPaths);
  };

  return (
    <Modal
      open={open}
      className={`fixed inset-0 z-50 ${open ? "" : "hidden"} `}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10"
      >
        <div className="max-h-full w-full max-w-[39rem] overflow-y-auto sm:rounded-2xl bg-white dark:bg-zinc-800">
          <div className="flex justify-between px-4 pt-4">
            <h4 className="text-2xl font-bold mb-4 text-black dark:text-white">
              Edit your submission
            </h4>
            <button
              onClick={handleClose}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-xs md:text-sm w-7 h-7 md:w-8 md:h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="defaultModal"
            >
              <CloseIcon width={4} height={4} />
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
                  value={SubmissionTitle}
                  onChange={(e) => setSubmissionTitle(e.target.value)}
                  className=" w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-green-500 text-[#000000] bg-gray-100 dark:bg-zinc-700 dark:text-white mb-4"
                  required
                />

                <label className="block dark:text-white mb-2">
                  Submission Description
                </label>
                <textarea
                  name="description"
                  type="text"
                  placeholder="Submission Description"
                  value={SubmissionDescription}
                  onChange={(e) => setSubmissionDescription(e.target.value)}
                  className=" w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-green-500 text-[#000000] bg-gray-100 dark:bg-zinc-700 dark:text-white"
                  required
                  rows={6}
                />
              </form>
            </div>
            <div className="items-center space-y-2 ">
              <div>
                <input
                  className="dark:text-white"
                  accept=".jpg,.jpeg,.png,.gif,.mp4,.zip,application/*"
                  type="file"
                  id="fileInput"
                  onChange={handleFileSelect}
                  multiple
                />
                {isUploading && <LoadingSpinner />}
              </div>
            </div>
            <div>
              <label className="block dark:text-white">Add Link</label>
              <div className="flex gap-2">
                <select
                  type="text"
                  name="platform"
                  placeholder="platform"
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-[20%] border border-gray-300 dark:text-white dark:bg-zinc-700 rounded-md px-3 py-2 mt-1"
                >
                  <option value="">Select</option>
                  <option value="Youtube">Youtube</option>
                  <option value="github">Github</option>
                  <option value="behance">behance</option>
                  <option value="dribbble">dribbble</option>
                  <option value="others">others</option>
                </select>
                <input
                  type="text"
                  name="link"
                  placeholder="link"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="w-[70%] border border-gray-300 dark:bg-zinc-700 dark:text-white rounded-md px-3 py-2 mt-1"
                />
                <button
                  onClick={handleAddLink}
                  className="bg-black text-white rounded-lg w-[10%] flex items-center justify-center hover:bg-green-500 hover:scale-105"
                >
                  <FaPlus />
                </button>
              </div>
            </div>
            <p className="dark:text-white">
              {links.length > 0 &&
                links.map((link) => {
                  return (
                    <p key={link.link}>
                      <>
                        {link.platform} :{" "}
                        <a className=" hover:underline" href={link.link}>
                          {link.link}
                        </a>
                      </>
                    </p>
                  );
                })}
            </p>
            <p className="dark:text-white">
              {filesSelected.length > 0 &&
                filesSelected.map((file, index) => {
                  return (
                    <p key={index}>
                      {" "}
                      <a href={file} target="_blank" rel="noopener noreferrer">
                        {"file " + index}
                      </a>
                      <MdDelete
                        className="inline-block"
                        onClick={() => {
                          handelClickDeleteFile(file);
                        }}
                      />
                    </p>
                  );
                })}
            </p>
            <div className="flex justify-between space-x-2 mt-4">
              <button
                type="submit"
                className="bg-green-500 px-5 py-3 rounded-lg w-full hover:bg-green-700 text-white"
                onClick={handleSubmit}
              >
                Edit Submission
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditSubmitModal;
