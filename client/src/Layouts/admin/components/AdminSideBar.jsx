import { HiX } from "react-icons/hi";
import routes from "../../../routes/AdminRoutes";
import { NavLink } from "react-router-dom";
import yopexLogo from "../../../images/LogoYopex.png";

const AdminSidebar = ({ open, onClose }) => {
  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-black pb-10 shadow-2xl w-72 shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? "translate-x-0" : "-translate-x-96"
      }`}
    >
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden text-white text-lg"
        onClick={onClose}
      >
        <HiX />
      </span>
      <div className="mt-9 flex items-center space-x-1 dark:text-white">
        <div className=" space-x-1  dark:text-white mx-[50px] flex items-end gap-2 mb-5">
          <img src={yopexLogo} className=" w-11 h-11" />

          <span className="mt-5 text-white text-3xl font-semibold uppercase">
            YOPEX
          </span>
        </div>
      </div>
      <hr className="w-full border-t-1 border-gray-500" />

      <div className=" mt-[58px] h-px  dark:bg-white/30" />

      <ul className="mb-auto pt-1">
        {routes.children.map((route, index) => (
          <li key={index} className="hover:bg-green-500">
            <NavLink
              to={route.path}
              className="flex items-center  py-4 px-[40px] space-x-3 text-gray-500 font-medium transition-colors duration-150 hover:text-white dark:hover:text-gray-300"
            >
              <span className="text-lg">{route.icon}</span>
              <span className="text-lg">{route.path}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminSidebar;
