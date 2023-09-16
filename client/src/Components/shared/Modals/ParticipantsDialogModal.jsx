import React from "react";
import { Link, useParams } from "react-router-dom";

import { useUserSubmission } from "../../../hooks/react-query/useChallenges";

const ParticipantsDialogModal = ({
  open,
  handleClose,
  participant,
  togglereview,
  isOwner,
  canedit,
  toggleedit
}) => {
  const { id: challengeId } = useParams();
  const { data: submissions } = useUserSubmission(challengeId, participant);
  
  return (
    <div
      id="defaultModal"
      className={`absolute top-0 left-0 right-0 z-50 ${
        open ? "" : "hidden"
      } w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
    >
      <div className="relative m-auto mt-[10%] min-h-screen max-w-3xl z-50">
        <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-700">
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              PARTICIPANT SUBMISSION
            </h3>
            <button
              type="button"
              onClick={handleClose}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="defaultModal"
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>

          <div className="p-6 space-y-6">
            {submissions ? (
              <>
                <h4>
                  User:{" "}
                  <Link to={`/profile/${participant.user._id}`}>
                    {participant.user.firstname +
                      " " +
                      participant.user.lastname}
                  </Link>
                </h4>
                <h4>Title : {submissions.title}</h4>
                <h4>Description :</h4>
                <p className=" text-gray-500 dark:text-gray-400">
                  {submissions.description}
                </p>

                {submissions.filesPaths &&
                  submissions.filesPaths.length > 0 && (
                    <>
                      <h4>Files Attached :</h4>

                      {submissions.filesPaths.map((file, i) => (
                        <a
                          key={i}
                          href={file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 dark:text-gray-400"
                        >
                          File{" " + i}
                        </a>
                      ))}
                    </>
                  )}
                {submissions.links && submissions.links.length > 0 && (
                  <>
                    <h4>Links Attached :</h4>
                    {submissions.links.map((item, i) => (
                      <a
                        key={i}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 dark:text-gray-400"
                      >
                        {item.platform + " link"}
                      </a>
                    ))}
                  </>
                )}
                <div className="flex items-center pt-3 border-t border-gray-200 rounded-b dark:border-gray-600">
                {canedit && (<button
                      type="button"
                      onClick={() => {
                        handleClose();
                        toggleedit();
                      }}
                      className="text-white bg-green-400 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                    >
                      edit
                  </button>
                )}
                {isOwner && (
                  
                    <button
                      type="button"
                      onClick={() => {
                        handleClose();
                        togglereview();
                      }}
                      className="text-white bg-green-400 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                    >
                      review
                    </button>
                  
                )}
                </div>
              </>
            ) : (
              <h4>No submission yet</h4>
            )}
          </div>
        </div>
      </div>
      <div
        className={`fixed inset-0 bg-black opacity-30 ${open ? "" : "hidden"}`}
      />
    </div>
  );
};

export default ParticipantsDialogModal;
