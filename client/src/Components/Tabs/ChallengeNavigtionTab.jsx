import React, { useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import Card from "../Cards";
import toast from "react-hot-toast";

const ChallengeNavigationTab = ({ value, changeValue, isRegistered,challenge,isOwner }) => {
       
  const getDeadlineDifference = (deadline) => {
    const now = moment();
    const diff = moment(deadline).diff(now);

    if (diff < 0) return "0 Days 0 Hours 0 Minutes";
  };
  const handleProgress = (card) => {
    if (getDeadlineDifference(card?.deadline) === "0 Days 0 Hours 0 Minutes")
      return true;
    return false;
  };

  const [currentUrl, setCurrentUrl] = useState(window.location.href);

  const copyUrlToClipboard = () => {
    const textArea = document.createElement('textarea');
    textArea.value = currentUrl;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="w-full">
      <Card>
        <div className="p-2 overflow-hidden sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4">
          <button
            className={`flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300   ${
              value === 0
                ? "bg-green-500 text-white dark:text-gray-200 border-green-500"
                : "text-gray-500 border-gray-300 dark:text-gray-300 "
            }`}
            onClick={() => changeValue(0)}
          >
            Description
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300   ${
              value === 1
                ? "bg-green-500 text-white dark:text-gray-200 border-green-500"
                : "text-gray-500 border-gray-300 dark:text-gray-300 "
            }`}
            onClick={() => changeValue(1)}
          >
            Participants
          </button>
          {isRegistered || isOwner ? (
            <button
              className={`flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300   ${
                value === 3
                  ? "bg-green-500 text-white dark:text-gray-200 border-green-500"
                  : "text-gray-500 border-gray-300 dark:text-gray-300 "
              }`}
              onClick={() => changeValue(3)}
            >
              Chat
            </button>
          ) : null}
          {(
            <button
              className={`flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300   ${
                value === 5
                  ? "bg-green-500 text-white dark:text-gray-200 border-green-500"
                  : "text-gray-500 border-gray-300 dark:text-gray-300 "
              }`}
              onClick={() => changeValue(5)}
            >
              Submission
            </button>
          ) }

          {isOwner && handleProgress(challenge) && !challenge?.winner && (
            <button
              className={`flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300   ${
                value === 2
                  ? "bg-green-500 text-white dark:text-gray-200 border-green-500"
                  : "text-gray-500 border-gray-300 dark:text-gray-300 "
              }`}
              onClick={() => changeValue(2)}
            >
              Choose Winner
            </button>
          )}
          {isOwner  && (
            <button
              className={`flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300   ${
                value === 4
                  ? "bg-green-500 text-white dark:text-gray-200 border-green-500"
                  : "text-gray-500 border-gray-300 dark:text-gray-300 "
              }`}
              onClick={() => changeValue(4)}
            >
              Removed
            </button>
          )}
          {/*<button
              className={`flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300   ${  
              "bg-green-500 text-white dark:text-gray-200 border-green-500 ml-2"
              }`}
              onClick={copyUrlToClipboard}
            >
              Copy URL
            </button>*/}
        </div>
      </Card>
    </div>
  );
};

export default ChallengeNavigationTab;
