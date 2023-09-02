import React, { useState } from "react";
import { useSelector } from "react-redux";
import ParticipantsDialogModal from "../../../../../../Components/shared/Modals/ParticipantsDialogModal";
import { Link } from "react-router-dom";

const ParticipantRow = ({ user, index, challenge }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen((prev) => !prev);
  const { user: currentUser } = useSelector((state) => state.auth);
  const isOwner = currentUser.companies.find(
    (company) => company === challenge.company._id
  )
    ? true
    : false;

  function formatDate(dateString) {
    const options = {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  return (
    <tr
      key={user._id}
      className="hover:bg-gray-50 bg-white"
      onClick={isOwner ? toggleOpen : null}
    >
      <td className=" py-4 px-4 font-bold text-md">{index + 1} </td>
      <td className="py-4 px-4">
        <div className="flex items-center">
          <Link to={`/profile/${user._id}`} className="flex items-center gap-4">
            <div className="">
              <img
                alt={`${user?.user?.firstname} ${user?.user?.lastname}`}
                src={user?.user?.picturePath}
                className="w-10 h-10 rounded-full "
              />
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm">{user?.user?.firstname}</span>
              <span className="text-sm">{user?.user?.lastname}</span>
            </div>
          </Link>
        </div>
      </td>
      <td className="text-sm text-left py-4 px-4">
        {" "}
        {formatDate(user?.registrationDate)}
      </td>
      <td className="text-sm text-right py-4 px-4">
        {formatDate(user?.submissionDate)}
      </td>
      {user && (
        <ParticipantsDialogModal
          open={isOpen}
          participant={user}
          handleClose={toggleOpen}
        />
      )}
    </tr>
  );
};

export default ParticipantRow;
