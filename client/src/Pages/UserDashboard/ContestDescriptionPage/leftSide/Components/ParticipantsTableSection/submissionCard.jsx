import Card from "../../../../../../Components/Cards";
import Avatar from "../../../../../../assets/images/AvatarProfile.jpg";
import { useState } from "react";
import ParticipantsDialogModal from "../../../../../../Components/shared/Modals/ParticipantsDialogModal";
import ReviewModel from "../../../../../../Components/shared/Modals/ReviewModel";
import EditSubmitModal from "../../../../../../Components/shared/Modals/EditSubmit";
import { useSelector } from "react-redux";
import { CgAttachment } from "react-icons/cg";
import { IoLinkSharp } from "react-icons/io5";

const SubmissionCard = ({ extra, item, isOwner, user, challenge }) => {
  const { user: currentUser } = useSelector((state) => state.auth);

  const [isOpen, setIsOpen] = useState(false);
  const [reviewisOpen, setreviewIsOpen] = useState(false);
  const [editisOpen, seteditIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  const toggleedit = () => seteditIsOpen((prev) => !prev);
  const togglereview = () => setreviewIsOpen((prev) => !prev);
  const canedit =
    user?._id === currentUser._id &&
    challenge?.start &&
    new Date() < new Date(challenge.deadline);

  return (
    <div
      onClick={() => {
        setIsOpen((prev) => !prev);
      }}
    >
      <Card extra={`lg:pr-11 overflow-hidden lg:h-40   ${extra}`}>
        <div className={`flex-col gap-6 md:flex-row flex`}>
          <div className="w-full xl:w-[30%]">
            <img
              className={`h-full xl:h-30 md:h-40 w-screen md:rounded-l-lg object-cover lg:block`}
              src={item?.userId.picturePath ? item?.userId.picturePath : Avatar}
              alt="picture"
            />
          </div>
          <div className="flex w-full flex-col justify-between xl:w-[70%] lg:px-0 px-4">
            <div className="py-4   items-center">
              <h5 className="text-md font-semibold dark:text-white">
                {item?.userId.firstname} {item?.userId.lastname}
              </h5>
              <p className=" font-semibold text-xl text-green-500 ">{item?.title}</p>
            </div>

            

            <div className="flex flex-wrap justify-between pb-8">
              <div className="flex items-center justify-start gap-2">
                <div>
                  <CgAttachment size={20} className="dark:text-white" />
                </div>
                <div className="flex gap-1">
                  <p className="font-bold dark:text-white">
                    {item.filesPaths.length}
                  </p>
                  <p className="dark:text-white">Attachment</p>
                </div>
              </div>
              <div className="flex items-center justify-start gap-2">
                <div>
                  <IoLinkSharp size={20} className="dark:text-white" />
                </div>
                <div className="flex gap-1">
                  <p className="font-bold dark:text-white">
                    {item.links.length}
                  </p>
                  <p className="dark:text-white">Links</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
      {
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
            companyId={
              challenge?.company?._id
                ? challenge?.company?._id
                : challenge?.owner?._id
            }
          />
          <EditSubmitModal
            open={editisOpen}
            handleClose={toggleedit}
            participant={user}
          />
        </>
      }
    </div>
  );
};

export default SubmissionCard;
