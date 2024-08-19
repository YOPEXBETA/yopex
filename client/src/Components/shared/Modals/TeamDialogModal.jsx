import React from "react";
import {Link, useParams} from "react-router-dom";
import {useUserSubmission} from "../../../hooks/react-query/useChallenges";
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

const TeamDialogModal = ({
                             open,
                             handleClose,
                             togglereview,
                             isOwner,
                             canedit,
                             toggleedit,
                             submission,
                             team
                         }) => {

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
                <div
                    className="max-h-full w-full max-w-[39rem] overflow-y-auto sm:rounded-2xl bg-white dark:bg-zinc-800">
                    <div className="flex justify-between px-4 pt-4">
                        <h4 className="text-2xl font-bold mb-4 text-black dark:text-white">
                            Team "{submission?.teamId?.name}" Submission
                        </h4>
                        <button
                            onClick={handleClose}
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-xs md:text-sm w-7 h-7 md:w-8 md:h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="defaultModal"
                        >
                            <CloseIcon width={4} height={4}/>
                        </button>
                    </div>
                    <hr/>

                    <div className="p-4 md:p-5">
                        {submission ? (
                            <div className="w-full">
                                <div className="flex justify-between ">
                                    <h3 className=" block mb-1 text-lg font-semibold dark:text-white">
                                        {submission?.title}
                                    </h3>
                                    <time
                                        className="block mb-1  text-base mt-1 font-normal  text-gray-500 dark:text-gray-400">
                                        {new Date(submission?.createdAt).toLocaleString("en-US", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                            hour: "numeric",
                                            minute: "numeric",
                                        })}
                                    </time>
                                </div>
                                <p className="block mb-1  text-base font-normal dark:text-white">
                                    {submission?.description}
                                </p>
                                <div
                                    className="inline-flex flex-col w-full text-sm font-medium dark:text-white focus:outline-none 0">
                                    <div className="mt-6 space-y-2">
                                        <h3 className=" block mb-1 text-lg font-semibold dark:text-white">
                                            Files
                                        </h3>
                                        <div className="flex flex-col space-y-4">
                                            {submission?.filesPaths?.length > 0 && (
                                                <>
                                                    <div className="grid items-center md:grid-cols-3 grid-cols-1 gap-2">
                                                        {submission?.filesPaths &&
                                                            submission?.filesPaths?.map((file, i) => (
                                                                <a
                                                                    key={i}
                                                                    href={file}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="mb-5 rounded-md bg-[#F5F7FB] py-4 px-8 hover:bg-green-500 hover:text-white"
                                                                >
                                                                    <div className="flex items-center justify-between">
                                    <span className="truncate  text-base font-medium ">
                                      {`File ${i}`}{" "}
                                    </span>
                                                                        <button className="text-[#07074D]">
                                                                            <svg
                                                                                width="10"
                                                                                height="10"
                                                                                viewBox="0 0 10 10"
                                                                                fill="none"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                            ></svg>
                                                                        </button>
                                                                    </div>
                                                                </a>
                                                            ))}
                                                    </div>
                                                </>
                                            )}
                                            <hr/>
                                            <h3 className=" block mb-1 text-lg font-semibold dark:text-white">
                                                Links
                                            </h3>
                                            <div className="grid items-center md:grid-cols-3 grid-cols-1 gap-2">
                                                {submission?.links?.length > 0 && (
                                                    <>
                                                        {submission?.links?.map((item, i) => {
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
                                                                                style={{color: iconColor}}
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
                            {isOwner && !team?.review && (
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

export default TeamDialogModal;
