import { Link, useLocation } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import {
  HomeIcon,
  BriefcaseIcon,
  Cog6ToothIcon,
  InformationCircleIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar() {
  const { logout } = useLogout();
  const handleLogout = () => logout();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside
      role="navigation"
      aria-label="Sidebar"
      className="
        fixed top-0 left-0 z-50
        group group-hover:w-64 montserrat-font bg-[#260026] text-white flex flex-col justify-between
        h-screen w-20 hover:w-64 transition-all duration-300 ease-in-out overflow-hidden
      "
    >
      {/* Top */}
      <div>
        {/* Logo */}
        <div className="flex items-center gap-3 p-4">
          <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0">
            <span className="text-[#260026] font-bold">V</span>
          </div>

          <div className="overflow-hidden">
            <span
              className="libre-baskerville-regular-italic block text-lg font-semibold whitespace-nowrap
              opacity-0 translate-x-[-8px] group-hover:opacity-100 group-hover:translate-x-0
              transition-all duration-300"
            >
              VAWC DeskHub
            </span>
          </div>
        </div>

        {/* Profile (hidden when collapsed) */}
        <div className="px-4">
          <div
            className="flex items-center gap-3 overflow-hidden
            max-h-0 group-hover:max-h-20 group-hover:py-2 transition-all duration-300"
          >
            <img
              src="https://avatar.iran.liara.run/public/boy"
              alt="profile"
              className="rounded-full w-10 h-10 flex-shrink-0"
            />
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              <p className="text-sm font-medium">Jhon Doe</p>
            </div>
          </div>
        </div>

        {/* Search (only visible when expanded) */}
        <div className="px-4 mt-3">
          <div className="overflow-hidden max-h-0 group-hover:max-h-14 transition-all duration-300">
            <input
              type="text"
              placeholder="Search"
              className="w-full p-2 rounded-md text-black outline-none bg-white"
            />
          </div>
        </div>

        {/* Nav */}
        <nav className="mt-6 px-2 space-y-1">
          <Link to="/" className="form-text">
            <button
              className={`flex items-center w-full gap-3 p-3 rounded-md text-left transition-colors duration-150
              ${
                isActive("/")
                  ? "text-white bg-white/10"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <HomeIcon className="h-6 w-6 flex-shrink-0" />
              <span className="ml-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Home
              </span>
            </button>
          </Link>

          <Link to="/cases" className="form-text">
            <button
              className={`flex items-center w-full gap-3 p-3 rounded-md text-left transition-colors duration-150
              ${
                isActive("/cases")
                  ? "text-white bg-white/10"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <BriefcaseIcon className="h-6 w-6 flex-shrink-0" />
              <span className="ml-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Cases
              </span>
            </button>
          </Link>

          <Link to="/settings" className="form-text">
            <button
              className={`flex items-center w-full gap-3 p-3 rounded-md text-left transition-colors duration-150
              ${
                isActive("/settings")
                  ? "text-white bg-white/10"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Cog6ToothIcon className="h-6 w-6 flex-shrink-0" />
              <span className="ml-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Settings
              </span>
            </button>
          </Link>
        </nav>
      </div>

      {/* Bottom: FAQs + Logout */}
      <div className="px-2 pb-6 space-y-3">
        <Link to="/about" className="form-text">
          <button
            className={`flex items-center w-full gap-3 p-3 rounded-md text-left transition-colors duration-150
            ${
              isActive("/about")
                ? "text-white bg-white/10"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <InformationCircleIcon className="h-6 w-6 flex-shrink-0" />
            <span className="ml-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              FAQs and About
            </span>
          </button>
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center w-full gap-3 p-3 rounded-md text-[#EB5757] hover:bg-white/5 transition-colors duration-150"
        >
          <ArrowLeftOnRectangleIcon className="h-6 w-6 flex-shrink-0" />
          <span className="ml-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
}
