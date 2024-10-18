import { useEffect } from "react";
import { ButtonSmall } from "../ui/Buttons";
import AuthModal from "../User/AuthModal";

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  // Function to handle logout
  // This function will remove the token from the local storage and set isLoggedIn to false
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    console.log("Token removed");
    console.log("Logged out")
  };

  // This useEffect will handle the outside click event for closing the dropdowns
  // If you add more dropdowns, make sure to add the class "dropdown" to the parent element
  // Reference: https://stackoverflow.com/questions/76786642/daisyui-click-outside-to-close-details-summary-dropdown
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
          <ButtonSmall onClick={handleLogout}>Logout</ButtonSmall>
        )}
      </div>

      {/* Render the AuthModal */}
      <AuthModal setIsLoggedIn={setIsLoggedIn} />
    </div>
  );
}
