import { useRef, useState, useContext } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import DarkmodeToggler from "../ui/DarkModeToggler";
import Icons from "./DashboardIcons";
import { AuthContext } from "../../context/AuthProvider";
import LoadingSpinner from "../ui/LoadingSpinner";

export default function DashboardNav({ toggleSidebar }) {
  const { handleLogout, loading } = useContext(AuthContext);

  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setDropdownIsOpen(!dropdownIsOpen);

  useClickOutside(dropdownRef, () => setDropdownIsOpen(false), dropdownIsOpen);

  return (
    <header className="w-full bg-base-300 p-4 top-0 z-10 border-b-2 border-base-200">
      <nav className="flex justify-between items-center ">
        <div>
          <button onClick={toggleSidebar}>
            <Icons.Hamburger />
          </button>
        </div>
        <div className="flex items-center space-x-6">
          <DarkmodeToggler />
          <button onClick={toggleDropdown}>
            <Icons.User />
          </button>
          {dropdownIsOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-2 top-14 mt-4 w-32 bg-base-100 shadow-md rounded-md z-10"
            >
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-base-200 cursor-pointer">
                  Profile
                </li>
                <li className="px-4 py-2 hover:bg-base-200 cursor-pointer">
                  Settings
                </li>
                <li
                  className="px-4 py-2 hover:bg-base-200 cursor-pointer"
                  onClick={handleLogout}
                  disabled={loading}
                >
                  {loading ? <LoadingSpinner /> : "Logout"}
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
