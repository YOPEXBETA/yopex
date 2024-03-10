import React, { useState } from "react";
import { FiAlignJustify } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AvatarProfile from "../../../assets/images/AvatarProfile.jpg";
import MoonIcon from "../../../Components/icons/MoonIcon";
import LightIcon from "../../../Components/icons/LightIcon";
import Dropdown from "../../../Components/dropdown";
import ProfileMenu from "../../../Components/ProfileMenu/ProfileMenu";

const AdminNavbar = (props) => {
  const [darkmode, setDarkmode] = useState(false);

  const { onOpenSidenav, brandText } = props;
  const { user } = useSelector((state) => state.auth);

  return (
    <nav className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl p-2 backdrop-blur-xl ">
      <div className="ml-[6px]">
        <div className="h-6 w-[224px] pt-1">
          <a
            className="text-sm font-normal text-zinc-700 hover:underline dark:text-white dark:hover:text-white"
            href=" "
          >
            Pages
            <span className="mx-1 text-sm text-zinc-700 hover:text-zinc-700 dark:text-white">
              {" "}
              /{" "}
            </span>
          </a>
          <Link
            className="text-sm font-normal capitalize text-zinc-700 hover:underline dark:text-white dark:hover:text-white"
            to="#"
          >
            {brandText}
          </Link>
        </div>
        <p className="shrink text-[33px] capitalize text-zinc-700 dark:text-white">
          <Link
            to="#"
            className="font-bold capitalize hover:text-zinc-700 dark:hover:text-white"
          >
            {brandText}
          </Link>
        </p>
      </div>

      <div className="relative mt-[3px] flex h-[61px] w-[355px] flex-grow items-center justify-around gap-2  md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[365px] xl:gap-2">
        <div className="flex h-full items-center rounded-full xl:w-[225px]"></div>
        <span
          className="flex cursor-pointer text-xl text-gray-600 dark:text-white xl:hidden"
          onClick={onOpenSidenav}
        >
          <FiAlignJustify className="h-5 w-5" />
        </span>

        <div
          className="cursor-pointer text-gray-600"
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
            <LightIcon className="h-4 w-4 text-gray-600 dark:text-white" />
          ) : (
            <MoonIcon className="h-4 w-4 text-gray-600 dark:text-white" />
          )}
        </div>

        <div>
          <div className="relative focus:ring-offset-2 focus:ring-offset-zinc-800">
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
    </nav>
  );
};

export default AdminNavbar;
