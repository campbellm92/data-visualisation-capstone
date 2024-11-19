import { useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { ButtonSmall } from "../ui/Buttons";
import LoadingSpinner from "../ui/LoadingSpinner";
import AuthModal from "../User/AuthModal";

export default function Navbar() {
  const { isLoggedIn, handleLogout, loading } = useContext(AuthContext);

  useEffect(() => {
    const handleClickOutside = (e) => {
      document.querySelectorAll(".dropdown").forEach((dropdown) => {
        if (!dropdown.contains(e.target)) {
          dropdown.open = false;
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
          <div tabIndex={0} role="button" aria-label="Open menu" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-primary-content"
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Our Services</a>
              <ul className="p-2 z-50">
                <li>
                  <a>Data visualisation dashboard</a>
                </li>
                <li>
                  <a>Grant writing</a>
                </li>
                <li>
                  <a>Forecasting</a>
                </li>
                <li>
                  <a>Event analysis</a>
                </li>
                <li>
                  <a>AI-driven insights</a>
                </li>
                <li>
                  <a>Tourism profiles</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Contact</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl text-primary-content">Localis</a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 z-50">
          <li>
            <details className="dropdown">
              <summary className="text-primary-content">Our Services</summary>
              <ul className="p-2 z-50">
                <li>
                  <a>Data visualisation dashboard</a>
                </li>
                <li>
                  <a>Grant writing</a>
                </li>
                <li>
                  <a>Forecasting</a>
                </li>
                <li>
                  <a>Event analysis</a>
                </li>
                <li>
                  <a>AI-driven insights</a>
                </li>
                <li>
                  <a>Tourism profiles</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a className="text-primary-content">Contact</a>
          </li>
        </ul>
      </div>

      <div className="navbar-end pr-4">
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
          <ButtonSmall onClick={handleLogout} disabled={loading}>
            {loading ? <LoadingSpinner /> : "Logout"}
          </ButtonSmall>
        )}
      </div>

      {/* Render the AuthModal */}
      <AuthModal />
    </div>
  );
}
