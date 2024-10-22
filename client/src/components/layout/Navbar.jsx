import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { ButtonSmall } from "../ui/Buttons";
import LoadingSpinner from "../ui/LoadingSpinner";
import AuthModal from "../User/AuthModal";

export default function Navbar() {
  const { isLoggedIn, handleLogout } = useContext(AuthContext);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // make sure spinner isn't going when logged in
  useEffect(() => {
    if (isLoggedIn) {
      setIsLoggingOut(false);
    }
  }, [isLoggedIn]);

  const handleLogoutClick = () => {
    setIsLoggingOut(true);
    handleLogout(() => setIsLoggingOut(false));
  };

  // handle outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      document.querySelectorAll(".dropdown").forEach((dropdown) => {
        if (!dropdown.contains(e.target)) {
          dropdown.open = false; // Close the dropdown if clicked outside
        }
      });
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside); // Clean up event listener
    };
  }, []);

  return (
    <div className="navbar bg-base-300">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl text-primary-content">Localis</a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a className="text-primary-content">Item 1</a>
          </li>
          <li>
            <details className="dropdown">
              <summary className="text-primary-content">Parent</summary>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a className="text-primary-content">Item 3</a>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        {/* If user is not logged in, show login button, else show logout button */}
        {!isLoggedIn ? (
          <ButtonSmall
            onClick={() => {
              document.getElementById("auth_modal").showModal();
            }}
          >
            Login
          </ButtonSmall>
        ) : (
          <ButtonSmall onClick={handleLogoutClick} disabled={isLoggingOut}>
            {isLoggingOut ? <LoadingSpinner /> : "Logout"}
          </ButtonSmall>
        )}
      </div>

      {/* Render the AuthModal */}
      <AuthModal />
    </div>
  );
}
