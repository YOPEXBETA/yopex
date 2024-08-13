import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Dropdown from "../dropdown";
import AvatarProfile from "../../assets/images/AvatarProfile.jpg";
import NotificationMenu from "./components/NotificationMenu";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import LightIcon from "../icons/LightIcon";
import MoonIcon from "../icons/MoonIcon";
import NotificationBellIcon from "../icons/NotificationBellIcon";
import {
  useSeeNotification,
  useUserNotifications,
} from "../../hooks/react-query/useUsers";
import { io } from "socket.io-client";
import InvitationModal from "../Modals/InvitationModal";
import {
  useAcceptInvitation,
  useOrganizationById,
  useInvitationById,
  useRefuseInvitation
} from "../../hooks/react-query/useCompany";
import {useNavigate} from "react-router-dom";
import TeamInvitationModal from "../Modals/TeamInvitationModal";
import {
  useAcceptTeamInvitation,
  useRefuseTeamInvitation,
  useTeamInvitationById
} from "../../hooks/react-query/useTeamChallenge";


const Navbar = (props) => {
  const { onOpenSidenav, brandText } = props;
  const [darkmode, setDarkmode] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { data: notification } = useUserNotifications(user?._id);
  const [notifications, setNotifications] = useState([]);
  const [socket, setSocket] = useState(null);
  const { mutate } = useSeeNotification(user?._id);
  const [nbrNotifications, setNbrNotifications] = useState(0);
  const [invitationData, setInvitationData] = useState(null);
  const [isInvitationModalOpen, setInvitationModalOpen] = useState(false);
  const [isTeamInvitationModalOpen, setTeamInvitationModalOpen] = useState(false);

  const url = process.env.REACT_APP_API_ENDPOINT;
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Track menu open status

  const { data: invitation } = useInvitationById(invitationData?.invitation);
  const { data: teamInvitation } = useTeamInvitationById(invitationData?.teamInvitation);

  const { data: organization } = useOrganizationById(invitation?.organization);

  const { mutate: acceptInvitation, isLoading: acceptLoading } = useAcceptInvitation();
  const { mutate: refuseInvitation } = useRefuseInvitation();

  const { mutate: acceptTeamInvitation, isLoading: acceptTeamLoading } = useAcceptTeamInvitation();
  const { mutate: refuseTeamInvitation } = useRefuseTeamInvitation();

  useEffect(() => {
    const newSocket = io(`${url}`);
    setSocket(newSocket);
    newSocket.emit("joinRoom", { roomid: user?._id });
    return () => newSocket.close();
  }, [user]);

  useEffect(() => {
    if (!notification) return;
    setNotifications(notification.notification);
    setNbrNotifications(notification.nbr);
  }, [notification]);

  useEffect(() => {
    if (!socket) return;
    socket.on("notification", (notification) => {
      setNotifications((prev) => [notification, ...prev]);
      setNbrNotifications((prev) => prev + 1);
    });
    return () => socket.off("notification");
  }, [socket]);

  const handleInvitationClick = async (notification) => {
    try {
      setInvitationData(notification);
      setInvitationModalOpen(true);
    } catch (error) {
      console.error("Error fetching invitation:", error);
    }
  };

  const handleCloseModal = () => {
    setInvitationModalOpen(false);
    setInvitationData(null);
  };

  const handleAcceptInvitation = async () => {
    if (!invitationData) return;

    try {
      await acceptInvitation(invitationData?.invitation);
      handleCloseModal();
      setTimeout(() => {
        navigate(`/organization/${invitation?.organization}`);
      }, 500);
    } catch (error) {
      console.error("Error accepting invitation:", error);
    }
  };

  const handleRefuseInvitation = async () => {
    if (!invitationData) return;

    try {
      await refuseInvitation(invitationData?.invitation);
      handleCloseModal();
    } catch (error) {
      console.error("Error refusing invitation:", error);
    }
  };


  const handleTeamInvitationClick = async (notification) => {
    try {
      setInvitationData(notification);
      setTeamInvitationModalOpen(true);
    } catch (error) {
      console.error("Error fetching team invitation:", error);
    }
  };
  const handleCloseTeamModal = () => {
    setTeamInvitationModalOpen(false);
    setInvitationData(null);
  };
  const handleAcceptTeamInvitation = async () => {
    if (!invitationData) return;

    try {
      await acceptTeamInvitation(invitationData?.teamInvitation);
      handleCloseTeamModal();
      setTimeout(() => {
        navigate(`/challenges/challengeDetails/${teamInvitation?.challenge?._id}`);
      }, 500);
    } catch (error) {
      console.error("Error accepting team invitation:", error);
    }
  };

  const handleRefuseTeamInvitation = async () => {
    if (!invitationData) return;

    try {
      await refuseTeamInvitation(invitationData?.teamInvitation);
      handleCloseTeamModal();
    } catch (error) {
      console.error("Error refusing team invitation:", error);
    }
  };
  const handleBellClick = () => {
    setIsMenuOpen((prev) => !prev);
  };
  return (
      <nav className="sticky py-[0.6rem] top-0 z-40 w-full bg-white dark:bg-zinc-800 border-b-[1px] border-gray-100 dark:border-zinc-700">
        <div className="mx-auto  px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-11 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                  type="button"
                  className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                  onClick={onOpenSidenav}
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>

                <svg
                    className="block h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>

                <svg
                    className="hidden h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="hidden sm:block">
                <p className="shrink text-2xl capitalize  dark:text-white">
                  <Link
                      to="#"
                      className="font-semibold capitalize hover:text-gray-700 dark:hover:text-white hidden md:block"
                  >
                    {brandText}
                  </Link>
                </p>
              </div>
            </div>
            <div className="absolute  inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="flex items-center gap-3">
                <div
                    className="cursor-pointer text-gray-600 rounded-full "
                    onClick={() => {
                      if (darkmode) {
                        document.body.classList.remove("dark");
                        setDarkmode(false);
                      } else {
                        document.body.classList.add("dark");
                        setDarkmode(true);
                      }
                    }}
                >
                  {darkmode ? (
                      <LightIcon />
                  ) : (
                      <MoonIcon className="text-gray-600 dark:text-white" />
                  )}
                </div>
                <Dropdown
                    button={
                      <NotificationBellIcon
                          notificationNumber={notification?.countNotSeenNotifications}
                          onClick={handleBellClick}
                      />
                    }
                    animation="origin-[65%_0%] md:origin-top-right transition-all duration-300 ease-in-out"
                    children={
                      <div>
                        <NotificationMenu
                            notifications={notification}
                            user={user}
                            mutate={mutate}
                            onInvitationClick={handleInvitationClick}
                            onTeamInvitationClick={handleTeamInvitationClick}
                            isOpen={isMenuOpen}
                        />
                      </div>
                    }
                    classNames={"py-2 top-10 -left-[230px] md:-left-[420px] w-max"}
                />
              </div>

              <div className="relative ml-6 focus:ring-offset-2 focus:ring-offset-zinc-800">
                <Dropdown
                    button={
                      <button>
                        {user?.picturePath ? (
                            <img
                                alt="picture"
                                src={user?.picturePath}
                                className="rounded-full  object-cover w-9 h-9 border-gray-200 border "
                            />
                        ) : (
                            <img
                                alt="default"
                                src={AvatarProfile}
                                className="rounded-full object-cover w-9 h-9 border-gray-200 border"
                            />
                        )}
                      </button>
                    }
                    children={
                      <div>
                        <ProfileMenu />
                      </div>
                    }
                    classNames={"py-2 top-10 -left-[180px] w-max"}
                />
              </div>
            </div>
          </div>
        </div>
        <InvitationModal
            organization={organization}
            isOpen={isInvitationModalOpen}
            onClose={handleCloseModal}
            onAccept={handleAcceptInvitation}
            onRefuse={handleRefuseInvitation}
        />
        <TeamInvitationModal
            team={teamInvitation?.team}
            challenge={teamInvitation?.challenge}
            isOpen={isTeamInvitationModalOpen}
            onClose={handleCloseTeamModal}
            onAccept={handleAcceptTeamInvitation}
            onRefuse={handleRefuseTeamInvitation}
        />
      </nav>
  );
};

export default Navbar;
