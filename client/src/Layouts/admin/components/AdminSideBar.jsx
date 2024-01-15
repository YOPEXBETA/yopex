import { HiX } from "react-icons/hi";
import routes from "../../../routes/AdminRoutes";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

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
      <div className="mt-7 justify-center flex items-center space-x-1 dark:text-white">
        <div className=" dark:text-white flex flex-col items-center justify-center">
          <img
            src={user.picturePath}
            className=" w-28 h-28 bg-gray-500 rounded-full"
          />
          <div className="flex-grow text-white mt-4">
            <div>
              <p className="text-lg">{user.firstname + " " + user.lastname}</p>
            </div>
          </div>
        </div>
      </div>
      <hr className="w-full border-t-1 border-gray-200 mt-4" />

      <div className="h-px  dark:bg-white/30" />

      <ul className="mb-auto pt-1 overflow-y-scroll h-[30rem] overflow-hidden no-scrollbar">
        {routes.children.map((route, index) => (
          <li key={index} className="hover:bg-green-500">
            <NavLink
              to={route.path}
              className="flex items-center py-4 px-[40px] space-x-3 text-gray-500 font-medium transition-colors duration-150 hover:text-white dark:hover:text-gray-300"
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
