import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ParticipantsDialogModal from "../../../../../../Components/shared/Modals/ParticipantsDialogModal";
import ReviewModel from "../../../../../../Components/shared/Modals/ReviewModel";
import EditSubmitModal from "../../../../../../Components/shared/Modals/EditSubmit";
import AvatarProfile from "../../../../../../assets/images/AvatarProfile.jpg";

const ParticipantRow = ({ user, index, challenge,isOwner }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [reviewisOpen, setreviewIsOpen] = useState(false);
  const [editisOpen, seteditIsOpen] = useState(false);
  const toggleedit = () => seteditIsOpen((prev) => !prev);
  const togglereview = () => setreviewIsOpen((prev) => !prev);
  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  const { user: currentUser } = useSelector((state) => state.auth);

  function formatDate(dateString) {
    const options = {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  const canedit = user.user._id === currentUser._id;

  return (
    <tr
      key={user._id}
      className="hover:bg-gray-50 bg-white dark:bg-zinc-800 overflow-auto"
      onClick={isOwner || user.user._id === currentUser._id ? toggleOpen : null}
    >
      <td className=" py-4 px-4 font-bold text-md dark:text-white">
        {index + 1}{" "}
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center">
          <Link
            to={`/profile/${user?.user._id}`}
            className="flex items-center gap-4"
          >
            <div className="">
              {user?.user?.picturePath ? (
                <img
                  alt="picture"
                  src={user?.user?.picturePath}
                  className="hidden md:block w-10 h-10 rounded-full border object-cover"
                />
              ) : (
                <img
                  alt="default"
                  src={AvatarProfile}
                  className="rounded-full object-cover w-10 h-10 border border-gray-200"
                />
              )}
            </div>

            <div className="flex items-center gap-1 dark:text-white">
              <span className="text-sm">{user?.user?.firstname}</span>
              <span className="text-sm">{user?.user?.lastname}</span>
            </div>
          </Link>
        </div>
      </td>
      <td className="text-sm text-left py-4 px-4 dark:text-white">
        {" "}
        {formatDate(user?.registrationDate)}
      </td>
      <td className="text-sm text-right py-4 px-4 dark:text-white">
        <div>{formatDate(user?.submissionDate)}</div>
      </td>
      {user && (
        <>
          <ParticipantsDialogModal
            open={isOpen}
            participant={user}
            handleClose={toggleOpen}
            togglereview={togglereview}
            isOwner={isOwner}
            canedit={canedit}
            toggleedit={toggleedit}
          />
          <ReviewModel
            open={reviewisOpen}
            participant={user}
            handleClose={togglereview}
            companyId={challenge?.company?._id ? challenge?.company?._id : challenge?.owner?._id}
          />
          <EditSubmitModal
            open={editisOpen}
            handleClose={toggleedit}
            participant={user}
          />
        </>
      )}
    </tr>
  );
};

export default ParticipantRow;
