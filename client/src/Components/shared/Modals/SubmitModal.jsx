import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { useSubmitToChallenge } from "../../../hooks/react-query/useChallenges";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "../../../config/firebase";
// import { submitChallenge } from "../../../../redux/actions/ChallengeAction";

const maxSize = 5 * 1024 * 1024; // 5 megabytes


const SubmitModal = ({ open, handleClose, setIsSubmitted }) => {
    const [filesSelected, setFilesSelected] = useState([]);
    const [SubmissionTitle, setSubmissionTitle] = useState("");
    const [SubmissionDescription, setSubmissionDescription] = useState("");
    const [filesPaths, setFilesPaths] = useState([]);
  
    const { id } = useParams();
  
    const { user } = useSelector((state) => state.auth);
    const { mutate, isSuccess,isLoading } = useSubmitToChallenge(id);
  
    const handleFileUpload = async (file) => {
      const storageRef = ref(storage);
      const fileRef = ref(storageRef, `files/${user._id}+${id}+${file.name}`);
      const uploadTask = uploadBytesResumable(fileRef, file);
  
      try {
        await uploadTask;
        const url = await getDownloadURL(fileRef);
        setFilesPaths((prev) => [...prev, url]);
        return url;
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
      });
      
      if (isSuccess) {
        setIsSubmitted(true);
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
  
        if (
          (file.type === "application/zip" ||
          file.type === "image/jpeg" ||
          file.type === "image/png" ||
          file.type === "image/gif" ||
          file.type === "video/mp4" ||
          file.type === "video/avi") &&
          file.size <= maxSize
        ) {
          validFiles.push(file);
          setFilesSelected([...filesSelected, file]);
        } else {
          invalidFiles.push(file);
        }
      }
  
      console.log("Valid files:", validFiles);
      console.log("Invalid files:", invalidFiles);
    };

  return (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto ${open ? "" : "hidden"}`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white w-full md:max-w-md mx-auto rounded-lg shadow-lg overflow-hidden z-50">
          <div className="bg-primary p-4 text-black">
            <h5 className="text-lg font-semibold">SUBMIT YOUR WORK</h5>
          </div>

          <div className="p-4 md:p-6 space-y-4">
            <div className="flex flex-row gap-9">
            <form onSubmit={handleSubmit}>
              <label className="block text-gray-600">submission Title</label>
              <input
                type="text"
                name="title"
                onChange={(e)=>setSubmissionTitle(e.target.value)}
                className="block w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                required
              />

              <label className="block text-gray-600">Submission Description</label>
              <textarea
                name="description"
                onChange={(e)=>setSubmissionDescription(e.target.value)}
                className="block w-full border border-gray-300 rounded-md px-3 py-2 mt-1 resize-none"
                rows="6"
                required
              />
            </form>
            <div className=" items-center space-y-2">
              <div className="w-36 h-36 relative">
              <input
                
                accept=".jpg,.jpeg,.png,.gif,.mp4,.avi,.zip,application/*"
                type="file"
                id="fileInput"
                onChange={handleFileSelect}
                multiple
              />
            
              </div>
              
            </div>

             
            </div>
            {filesSelected.length > 0 &&
                      filesSelected.map((file) => {
                        return (
                          <p key={file.name}>
                            {" "}
                            <a
                              href={file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {file.name}
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
                  className="px-4 py-2 bg-primary text-white rounded-md bg-black"
                  onClick={handleSubmit}
                disabled={
                    (!isLoading && (SubmissionTitle === "" || SubmissionDescription === ""))?true:false 
                    }
                >
                  Create a Submission
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

export default SubmitModal;