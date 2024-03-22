import React, { useState } from "react";
import Card from ".";
import StarReviewIcon from "../icons/StarReviewIcon";
import AvatarProfile from "../../assets/images/AvatarProfile.jpg";
import { useCreateConversation } from "../../hooks/react-query/useConversations";
import { useNavigate } from "react-router-dom";

const DiscoverUserCard = ({ option, extra, user }) => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const { mutate: contact } = useCreateConversation(user._id);

  return (
    <div>
      <Card
        extra={`p-4 ${extra}`}
        key={option._id}
        onClick={() => {
          if (option.firstname && option.lastname) {
            navigate(`/profile/${option._id}`);
            setOpen(false);
          } else {
            navigate(`/company/${option._id}`);
            setOpen(false);
          }
        }}
      >
        <div className="flex flex-col">
          <div className="flex-none sm:flex">
            <div className=" relative h-32 w-32   sm:mb-0 mb-3">
              <img
                src={
                  option?.picturePath || option?.companyLogo || AvatarProfile
                }
                alt={
                  option.firstname
                    ? `${option.firstname} ${option.lastname}`
                    : option.companyName
                }
                className="w-32 h-32 object-cover rounded-2xl border"
              />
            </div>
            <div className="flex-auto sm:ml-5 justify-evenly">
              <div className="flex items-center justify-between sm:mt-2">
                <div className="flex items-center">
                  <div className="flex flex-col">
                    <div className="w-full flex-none text-lg dark:text-gray-200 font-bold leading-none">
                      {option.firstname
                        ? `${option.firstname} ${option.lastname}`
                        : option.companyName}{" "}
                    </div>
                    <div className="flex-auto text-gray-400 my-1">
                      <span className="mr-3 ">
                        {option.occupation || "unknown"}
                      </span>
                      <span className="mr-3 border-r border-gray-600  max-h-0"></span>
                      <span>{option.country || "unknown"}</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="flex flex-row items-center">
                <div className="flex">
                  <StarReviewIcon />
                  <StarReviewIcon />
                  <StarReviewIcon />
                  <StarReviewIcon />
                  <StarReviewIcon />
                </div>
                      </div>*/}
              <div className="flex pt-2  text-sm text-gray-500">
                <div className="flex-1 inline-flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                  </svg>
                  <p className="">{option?.followers?.length || 0} Followers</p>
                </div>
                <div className="flex-1 inline-flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <p className="">
                    {option?.followings?.length || 0} Followings
                  </p>
                </div>
                {/*<button
                  onClick={() =>
                    contact({
                      senderId: user._id,
                      receiverId: option._id,
                    })
                  }
                  className="flex-no-shrink bg-gradient-to-r from-green-400 via-green-500 to-green-600  px-5 ml-4 py-2 shadow-sm hover:shadow-lgborder-2 border-green-300 hover:border-green-500 text-white rounded-lg transition ease-in duration-300"
                >
                  Contact me
                </button>*/}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DiscoverUserCard;
