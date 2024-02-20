import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import Dropdown from "../dropdown";
import AvatarProfile from "../../assets/images/AvatarProfile.jpg";
import NotificationMenu from "./components/NotificationMenu";
import ProfileMenu from "./components/ProfileMenu";
import LightIcon from "../icons/LightIcon";
import MoonIcon from "../icons/MoonIcon";

const Navbar = (props) => {
  const { onOpenSidenav, brandText } = props;
  const [darkmode, setDarkmode] = useState(false);
  const { user } = useSelector((state) => state.auth);

  return (
    <nav class="sticky py-2 top-0 h-[8vh] z-40 bg-white dark:bg-zinc-800 border-b-[1px] dark:border-zinc-700 w-full">
      <div class="mx-auto  px-2 sm:px-6 lg:px-8">
        <div class="relative flex py-1 h-11 items-center justify-between">
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={onOpenSidenav}
            >
              <span class="absolute -inset-0.5"></span>
              <span class="sr-only">Open main menu</span>

              <svg
                class="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>

              <svg
                class="hidden h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:block">
              <p className="shrink text-2xl capitalize text-zinc-700 dark:text-white">
                <Link
                  to="#"
                  className="font-semibold capitalize hover:text-zinc-700 dark:hover:text-white hidden md:block"
                >
                  {brandText}
                </Link>
              </p>
            </div>
          </div>
          <div class="absolute  inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
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
                  <button
                    type="button"
                    class="relative rounded-full border-gray-200  text-gray-400 dark:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-zinc-800"
                  >
                    <svg
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                      />
                    </svg>
                  </button>
                }
                animation="origin-[65%_0%] md:origin-top-right transition-all duration-300 ease-in-out"
                children={
                  <div>
                    <NotificationMenu />
                  </div>
                }
                classNames={"py-2 top-10 -left-[230px] md:-left-[420px] w-max"}
              />
            </div>

            <div class="relative ml-6 focus:ring-offset-2 focus:ring-offset-zinc-800">
              <Dropdown
                button={
                  <button>
                    {user?.picturePath ? (
                      <img
                        alt="picture"
                        src={user.picturePath}
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
    </nav>
  );
};

export default Navbar;
