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
  toggleedit,
}) => {
  const { id: challengeId } = useParams();
  const { data: submissions } = useUserSubmission(challengeId, participant);
  console.log("ùù",participant);
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        open ? "backdrop-blur-sm" : "hidden"
      }`}
    >
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-96">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Participant Submission
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="timeline-modal"
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
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <div className="p-4 md:p-5">
          {submissions ? (
            <ol className="relative border-s border-gray-200 dark:border-gray-600 ms-3.5 mb-4 md:mb-5">
              <li className="mb-10 ms-8">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-3.5 ring-8 ring-white dark:ring-gray-700 dark:bg-gray-600">
                  <svg
                    className="w-2.5 h-2.5 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill="currentColor"
                      d="M6 1a1 1 0 0 0-2 0h2ZM4 4a1 1 0 0 0 2 0H4Zm7-3a1 1 0 1 0-2 0h2ZM9 4a1 1 0 1 0 2 0H9Zm7-3a1 1 0 1 0-2 0h2Zm-2 3a1 1 0 1 0 2 0h-2ZM1 6a1 1 0 0 0 0 2V6Zm18 2a1 1 0 1 0 0-2v2ZM5 11v-1H4v1h1Zm0 .01H4v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM10 11v-1H9v1h1Zm0 .01H9v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM10 15v-1H9v1h1Zm0 .01H9v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM15 15v-1h-1v1h1Zm0 .01h-1v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM15 11v-1h-1v1h1Zm0 .01h-1v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM5 15v-1H4v1h1Zm0 .01H4v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM2 4h16V2H2v2Zm16 0h2a2 2 0 0 0-2-2v2Zm0 0v14h2V4h-2Zm0 14v2a2 2 0 0 0 2-2h-2Zm0 0H2v2h16v-2ZM2 18H0a2 2 0 0 0 2 2v-2Zm0 0V4H0v14h2ZM2 4V2a2 2 0 0 0-2 2h2Zm2-3v3h2V1H4Zm5 0v3h2V1H9Zm5 0v3h2V1h-2ZM1 8h18V6H1v2Zm3 3v.01h2V11H4Zm1 1.01h.01v-2H5v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H5v2h.01v-2ZM9 11v.01h2V11H9Zm1 1.01h.01v-2H10v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H10v2h.01v-2ZM9 15v.01h2V15H9Zm1 1.01h.01v-2H10v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H10v2h.01v-2ZM14 15v.01h2V15h-2Zm1 1.01h.01v-2H15v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H15v2h.01v-2ZM14 11v.01h2V11h-2Zm1 1.01h.01v-2H15v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H15v2h.01v-2ZM4 15v.01h2V15H4Zm1 1.01h.01v-2H5v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H5v2h.01v-2Z"
                    />
                  </svg>
                </span>
                <h3 className="flex items-start mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                  {submissions?.title}
                </h3>
                <time className="block mb-3 text-sm font-normal leading-none text-gray-500 dark:text-gray-400">
                  {new Date(submissions?.createdAt).toLocaleString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                  })}
                </time>
                <div className="inline-flex flex-col w-full text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-600">
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
                </div>
              </li>
            </ol>
          ) : (
            <h4>No submission yet</h4>
          )}
          <div className="flex items-center pt-3 border-t border-gray-200 rounded-b dark:border-gray-600">
            {canedit && (
              <button
                type="button"
                onClick={() => {
                  handleClose();
                  toggleedit();
                }}
                className="text-white bg-green-400 hover:bg-green-600 focus:ring-4 w-full focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                edit
              </button>
            )}
            {isOwner && !participant.review && (
              <button
                type="button"
                onClick={() => {
                  handleClose();
                  togglereview();
                }}
                className="text-white inline-flex w-full justify-center bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Add review
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipantsDialogModal;
