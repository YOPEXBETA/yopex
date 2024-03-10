import { HiX } from "react-icons/hi";
import routes from "../../../routes/AdminRoutes";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import AvatarProfile from "../../../assets/images/AvatarProfile.jpg";
import AdminSideBarLinks from "./AdminSideBarLinks";

const AdminSidebar = ({ open, onClose }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-black pb-10 shadow-2xl w-72 shadow-white/5 transition-all dark:!bg-zinc-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 overflow-hidden ${
        open ? "translate-x-0" : "-translate-x-96"
      }`}
    >
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden text-white text-lg"
        onClick={onClose}
      >
        <HiX />
      </span>
      <div className="mt-[40px] mx-16 flex items-center">
        <div className="mt-1 ml-1  font-poppins text-[26px] font-bold uppercase text-white dark:text-white">
          YOPEX <span className="font-medium">HUB</span>
        </div>
      </div>
      <hr className="w-full border-t-1 border-gray-400 my-10" />

      <ul className="mb-auto pt-1 flex flex-col justify-center">
        <AdminSideBarLinks routes={routes} />
      </ul>
    </div>
  );
};

export default AdminSidebar;
