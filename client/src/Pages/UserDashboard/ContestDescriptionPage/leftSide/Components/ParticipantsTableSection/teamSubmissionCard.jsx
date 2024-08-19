import { useState } from "react";
import Card from "../../../../../../Components/Cards";
import Avatar from "../../../../../../assets/images/AvatarProfile.jpg";
import ParticipantsDialogModal from "../../../../../../Components/shared/Modals/ParticipantsDialogModal";
import ReviewModel from "../../../../../../Components/shared/Modals/ReviewModel";
import EditSubmitModal from "../../../../../../Components/shared/Modals/EditSubmit";
import { useSelector } from "react-redux";
import { CgAttachment } from "react-icons/cg";
import { IoLinkSharp } from "react-icons/io5";
import TeamDialogModal from "../../../../../../Components/shared/Modals/TeamDialogModal";

const TeamSubmissionCard = ({ extra, item, isOwner, team, challenge }) => {
    const { user: user } = useSelector((state) => state.auth);

    const [isOpen, setIsOpen] = useState(false);
    const [reviewisOpen, setreviewIsOpen] = useState(false);
    const [editisOpen, seteditIsOpen] = useState(false);
    const toggleOpen = () => {
        setIsOpen((prev) => !prev);
    };
    const toggleedit = () => seteditIsOpen((prev) => !prev);
    const togglereview = () => setreviewIsOpen((prev) => !prev);
    const canedit =
        user?._id === team?.team?.teamLeader &&
        challenge?.start &&
        new Date() < new Date(challenge.deadline);
    return (
        <div
            onClick={() => {
                setIsOpen((prev) => !prev);
            }}
        >
            <Card extra={`lg:pr-11 overflow-hidden p-4 lg:h-40   ${extra}`}>
                <div className="w-full">
                    <div className="flex flex-col justify-between ">
                        <div className="mb-8">
                            <div className="dark:text-white font-bold text-xl mb-2">
                                {item?.title}
                            </div>
                            <div className="flex flex-wrap gap-8">
                                <div className="flex items-center justify-start gap-2">
                                    <div>
                                        <CgAttachment size={20} className="dark:text-white" />
                                    </div>
                                    <div className="flex gap-1">
                                        <p className="font-bold dark:text-white">
                                            {item?.filesPaths?.length}
                                        </p>
                                        <p className="dark:text-white">Files</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-start gap-2">
                                    <div>
                                        <IoLinkSharp size={20} className="dark:text-white" />
                                    </div>
                                    <div className="flex gap-1">
                                        <p className="font-bold dark:text-white">
                                            {item?.links?.length}
                                        </p>
                                        <p className="dark:text-white">Links</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            {item?.teamId?.teamPicture ? (
                                <img
                                    alt="picture"
                                    src={item?.teamId?.teamPicture}
                                    className="w-10 h-10 rounded-full mr-4 object-cover"
                                />
                            ) : (
                                <img
                                    alt="default"
                                    src={Avatar}
                                    className="w-10 h-10 rounded-full mr-4 object-cover border"
                                />
                            )}
                            <div className="text-sm">
                                <p className=" leading-none dark:text-white">
                                    {item?.teamId?.name}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
            {
                <>
                    <TeamDialogModal
                        open={isOpen}
                        team={team}
                        handleClose={toggleOpen}
                        togglereview={togglereview}
                        isOwner={isOwner}
                        canedit={canedit}
                        toggleedit={toggleedit}
                        submission={item}
                    />
                    <ReviewModel
                        open={reviewisOpen}
                        participant={user}
                        type="teamChallenge"
                        team={item.teamId}
                        handleClose={togglereview}
                        companyId={
                            challenge?.organization?._id
                                ? challenge?.organization?._id
                                : challenge?.owner?._id
                        }
                    />
                    <EditSubmitModal
                        open={editisOpen}
                        handleClose={toggleedit}
                        participant={user}
                        submission={item}
                        type="teamChallenge"
                        team={team}
                        challenge={challenge}
                    />
                </>
            }
        </div>
    );
};

export default TeamSubmissionCard;
