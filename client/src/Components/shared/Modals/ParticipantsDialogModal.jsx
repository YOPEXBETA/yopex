import React from "react";
import { Link, useParams } from "react-router-dom";
import { useUserSubmission } from "../../../hooks/react-query/useChallenges";
import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaGithub,
  FaBehance,
  FaDribbble,
} from "react-icons/fa";
import Modal from "../../Modals";
import CloseIcon from "../../icons/CloseIcon";
import DocumentIcon from "../../icons/DocumentIcon";
import LinkIcon from "../../icons/LinkIcon";

const ParticipantsDialogModal = ({
  open,
  handleClose,
  participant,
  togglereview,
  isOwner,
  canedit,
  toggleedit,
}) => {
  const { id: challengeId } = useParams();
  const { data: submissions } = useUserSubmission(challengeId, participant);

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
              Participant Submission
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

          <div className="p-4 md:p-5">
            {submissions ? (
              <div className="w-full">
                <div className="flex justify-between ">
                  <h3 className=" block mb-1  text-lg  font-semibold text-gray-900 dark:text-white">
                    {submissions?.title}
                  </h3>
                  <time className="block mb-1  text-base mt-1 font-normal  text-gray-500 dark:text-gray-400">
                    {new Date(submissions?.createdAt).toLocaleString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                    })}
                  </time>
                </div>
                <p className="block mb-1  text-base font-normal  text-gray-500 dark:text-gray-400">
                  {submissions?.description}
                </p>
                <div className="inline-flex flex-col w-full text-sm font-medium text-gray-900 focus:outline-none 0">
                  <div className="mt-6 space-y-4">
                    <div className="flex flex-col space-y-4">
                      {submissions?.filesPaths?.length > 0 && (
                        <>
                          <div className="grid items-center grid-cols-4 gap-4">
                            {submissions?.filesPaths &&
                              submissions?.filesPaths?.map((file, i) => (
                                <a
                                  key={i}
                                  href={file}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-green-700 grid-cols-1 text-white px-4 py-3 hover:bg-green-900 transition duration-300 rounded-lg inline-block"
                                >
                                  <div className="flex items-center gap-2">
                                    <DocumentIcon />
                                    <p>{`File ${i}`}</p>
                                  </div>
                                </a>
                              ))}
                          </div>
                        </>
                      )}

                      <div className="grid grid-cols-4 items-center gap-4">
                        {submissions?.links?.length > 0 && (
                          <>
                            {submissions?.links?.map((item, i) => {
                              let IconComponent;
                              let iconColor;
                              let bgColorClass;
                              let textColorClass;
                              switch (item?.platform?.toLowerCase()) {
                                case "dribbble":
                                  IconComponent = FaDribbble;
                                  iconColor = "#E1306C";
                                  bgColorClass = "bg-instagram";
                                  textColorClass = "text-instagram-text";
                                  break;
                                case "behance":
                                  IconComponent = FaBehance;
                                  iconColor = "#1877F2";
                                  bgColorClass = "bg-behance";
                                  textColorClass = "text-facebook-text";
                                  break;
                                case "youtube":
                                  IconComponent = FaYoutube;
                                  iconColor = "#FF0000";
                                  bgColorClass = "bg-youtube";
                                  textColorClass = "text-youtube-text";
                                  break;
                                case "github":
                                  IconComponent = FaGithub;
                                  iconColor = "#181717";
                                  bgColorClass = "bg-github";
                                  textColorClass = "text-github-text";
                                  break;

                                default:
                                  IconComponent = null;
                                  iconColor = "#000000";
                                  bgColorClass = "bg-zinc-800"; // Default background color
                                  textColorClass = "text-white"; // Default text color
                              }
                              const linkClassName = `${bgColorClass} ${textColorClass} px-4 py-3 hover:bg-zinc-200 transition duration-300 rounded-lg inline-block`;
                              return (
                                <a
                                  key={i}
                                  href={item?.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={linkClassName}
                                >
                                  <div className="flex items-center gap-2">
                                    {IconComponent && (
                                      <IconComponent
                                        style={{ color: iconColor }}
                                      />
                                    )}
                                    <p>{item?.platform} link</p>
                                  </div>
                                </a>
                              );
                            })}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <h4 className="dark:text-white">No submission yet</h4>
            )}
            <div className="flex items-center mt-4 border-gray-200 rounded-b dark:border-gray-600">
              {canedit && (
                <button
                  type="button"
                  onClick={() => {
                    handleClose();
                    toggleedit();
                  }}
                  className="bg-green-500 px-5 py-3 rounded-lg w-full hover:bg-green-700 text-white"
                >
                  Edit submission
                </button>
              )}
              {isOwner && !participant.review && (
                <button
                  type="button"
                  onClick={() => {
                    handleClose();
                    togglereview();
                  }}
                  className="bg-green-500 px-5 py-3 rounded-lg w-full hover:bg-green-700 text-white"
                >
                  Add review
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ParticipantsDialogModal;
