import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import {
  useEditSubmission,
  useSubmitToChallenge,
  useUserSubmission,
} from "../../../hooks/react-query/useChallenges";
import {axios} from "../../../axios";

const maxSize = 5 * 1024 * 1024; // 5 megabytes

const EditSubmitModal = ({ open, handleClose, participant }) => {
  const [filesSelected, setFilesSelected] = useState([]);
  const [SubmissionTitle, setSubmissionTitle] = useState("");
  const [SubmissionDescription, setSubmissionDescription] = useState("");
  const [filesPaths, setFilesPaths] = useState([]);
  const [platform, setPlatform] = useState("");
  const [link, setLink] = useState("");
  const [links, setLinks] = useState([]);
  const { id } = useParams();
  const { data: submissions } = useUserSubmission(id, participant);

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
  const { mutate, isSuccess, isLoading } = useEditSubmission(id, participant);

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", data.picture[0]);
      formData.append("type", "submission");
      const data = await axios.post("http://localhost:8000/upload", formData, {
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

    if (isSuccess) {
      handleClose();
    }
  };

  const validFiles = [];
  const invalidFiles = [];

  const handleFileSelect = async (event) => {
    const files = event.target.files;
    handleFiles(files);
    for (const file of validFiles) {
      file.url = await handleFileUpload(file);
      setFilesSelected([...filesSelected, file]);
    }
  };

  const handleFiles = (files) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.size <= maxSize) {
        validFiles.push(file);
        setFilesSelected([...filesSelected, file]);
      } else {
        invalidFiles.push(file);
      }
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto ${open ? "" : "hidden"}`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white w-full md:max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden z-50">
          <div className="bg-primary p-4 text-black">
            <h5 className="text-lg font-semibold">EDIT YOUR WORK</h5>
          </div>

          <div className="p-4 md:p-6 space-y-4">
            <div>
              <form onSubmit={handleSubmit}>
                <label className="block text-gray-600 mb-2">
                  submission Title
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="submission Title"
                  value={SubmissionTitle}
                  onChange={(e) => setSubmissionTitle(e.target.value)}
                  className=" w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-green-500 text-[#000000] bg-gray-100 mb-2"
                  required
                />

                <label className="block text-gray-600 mb-2">
                  Submission Description
                </label>
                <textarea
                  name="description"
                  type="text"
                  placeholder="Submission Description"
                  value={SubmissionDescription}
                  onChange={(e) => setSubmissionDescription(e.target.value)}
                  className=" w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-green-500 text-[#000000] bg-gray-100"
                  required
                  rows={6}
                />
              </form>
            </div>
            <div className=" items-center space-y-2 ">
              <div>
                <input
                  accept=".jpg,.jpeg,.png,.gif,.mp4,.avi,.zip,application/*"
                  type="file"
                  id="fileInput"
                  onChange={handleFileSelect}
                  multiple
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-600">Add Link</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="platform"
                  placeholder="platform"
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-[20%] border border-gray-300 rounded-md px-3 py-2 mt-1"
                />
                <input
                  type="text"
                  name="link"
                  placeholder="link"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="w-[70%] border border-gray-300 rounded-md px-3 py-2 mt-1"
                />
                <button
                  onClick={handleAddLink}
                  className="bg-black text-white rounded-full w-[10%] flex items-center justify-center hover:bg-green-500 hover:scale-105"
                >
                  <FaPlus />
                </button>
              </div>
            </div>
            {links.length > 0 &&
              links.map((link) => {
                return (
                  <p key={link.link}>
                    {" "}
                    {link.platform} : {link.link}
                  </p>
                );
              })}
            {filesSelected.length > 0 &&
              filesSelected.map((file, index) => {
                return (
                  <p key={index}>
                    {" "}
                    <a href={file} target="_blank" rel="noopener noreferrer">
                      {"file " + index}
                    </a>
                  </p>
                );
              })}
            <div className="flex justify-between space-x-2 mt-4">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 border border-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2  text-white rounded-md bg-black"
                onClick={handleSubmit}
              >
                Edit Submission
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`fixed inset-0 bg-black opacity-30 ${open ? "" : "hidden"}`}
      />
    </div>
  );
};

export default EditSubmitModal;
