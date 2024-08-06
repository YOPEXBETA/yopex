import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AvatarProfile from "../../../../assets/images/AvatarProfile.jpg";
import LightIcon from "../../../../Components/icons/LightIcon";
import MoonIcon from "../../../../Components/icons/MoonIcon";
import { io } from "socket.io-client";
import {useNavigate} from "react-router-dom";
import {
    useGetOrganizationNotifications,
    useSeeOrganizationNotifications
} from "../../../../hooks/react-query/useCompany";
import OrganizationNotificationMenu from "./organizationNotificationMenu";
import Dropdown from "../../../../Components/dropdown";
import ProfileMenu from "../../../../Components/ProfileMenu/ProfileMenu";
import NotificationBellIcon from "../../../../Components/icons/NotificationBellIcon";
import OrganizationProfileMenu from "./organizationMenu";


const OrganizationNavbar = (props) => {
    const currentOrganization = useSelector((state) => state.organization.currentOrganization);
    const { onOpenSidenav, brandText } = props;
    const [darkmode, setDarkmode] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const { data: notification } = useGetOrganizationNotifications(currentOrganization?._id);
    const [notifications, setNotifications] = useState([]);
    const [socket, setSocket] = useState(null);
    const { mutate } = useSeeOrganizationNotifications();
    const [nbrNotifications, setNbrNotifications] = useState(0);
    const url = process.env.REACT_APP_API_ENDPOINT;
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Track menu open status


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

    const handleBellClick = () => {
        setIsMenuOpen((prevs) => !prevs);
    };

    return (
        <nav className="sticky py-[0.6rem] top-0 z-40 w-full bg-white dark:bg-zinc-800 border-b-[1px] border-gray-100 dark:border-zinc-700">
            <div className="mx-auto  px-2 sm:px-6 lg:px-8">
                <div className="relative flex py-1 h-11 items-center justify-between">
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
                                        <OrganizationNotificationMenu
                                            notifications={notification}
                                            organization={currentOrganization}
                                            mutate={mutate}
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
                                        {currentOrganization?.organizationLogo ? (
                                            <img
                                                alt="picture"
                                                src={currentOrganization?.organizationLogo}
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
                                        <OrganizationProfileMenu />
                                    </div>
                                }
                                classNames={"py-2 top-10 -left-[180px] w-max"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default OrganizationNavbar;
