import React, { useState } from "react";
import { axios } from "../../../axios";
import { useCreateBadge } from "../../../hooks/react-query/useBadges";

const AddBadgeModal = ({ open, handleClose }) => {
  const url = process.env.REACT_APP_API_ENDPOINT;
  const myData = JSON.parse(localStorage.getItem("user")) ?? {};
  const [badgeName, setBadgeName] = useState("");
  const [badgeDescription, setBadgeDescription] = useState("");
  const [badgeImg, setBadgeImg] = useState(null);
  const [badgeImgUrl, setBadgeImgUrl] = useState(null);
  const [badgeImgName, setBadgeImgName] = useState("");

  const { mutate } = useCreateBadge();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (badgeImg) {
        const url = await handleImageUpload();
        setBadgeImgUrl(url);
        console.log(url);
        mutate({
          badgeName,
          badgeDescription,
          badgeImg: url,
        });
        alert("Image uploaded successfully!");
      } else {
        mutate({
          badgeName,
          badgeDescription,
        });
      }
    } catch (error) {
      console.log(error);
    }
    handleClose();
  };

  const handleBadgeImageChange = ({ target: { files } }) => {
    const [file] = files;
    if (file) {
      setBadgeImg(file);
      setBadgeImgName(file.name);
    }
  };

  const handleImageUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", badgeImg);
      formData.append("type", "badge");
      const data = await axios.post(`${url}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data.data.downloadURL;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto ${open ? "" : "hidden"}`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white w-full md:max-w-md mx-auto rounded-lg shadow-lg overflow-hidden z-50">
          <div className="bg-primary p-4 text-white">
            <h5 className="text-lg font-semibold">Create a Badge</h5>
          </div>

          <div className="p-4 md:p-6 space-y-4">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-36 h-36 relative">
                <img
                  src={
                    badgeImg
                      ? URL.createObjectURL(badgeImg)
                      : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  }
                  alt="Badge Preview"
                  className="rounded-full object-cover w-full h-full"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-full">
                  <label htmlFor="badgeImage" className="cursor-pointer">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </label>
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    id="badgeImage"
                    onChange={handleBadgeImageChange}
                  />
                </div>
              </div>
              <p className="text-primary">{badgeImgName}</p>
            </div>

            <form onSubmit={handleSubmit}>
              <label className="block text-gray-600">Badge Title</label>
              <input
                type="text"
                name="title"
                onChange={(event) => setBadgeName(event.target.value)}
                className="block w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                required
              />

              <label className="block text-gray-600">Badge Description</label>
              <textarea
                name="description"
                onChange={(event) => setBadgeDescription(event.target.value)}
                className="block w-full border border-gray-300 rounded-md px-3 py-2 mt-1 resize-none"
                rows="6"
                required
              />

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
                >
                  Create a Badge
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        className={`fixed inset-0 bg-black opacity-30 ${open ? "" : "hidden"}`}
      />
    </div>
  );
};

export default AddBadgeModal;
