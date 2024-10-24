import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // below logic allows access to token for other pages
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  // state for showing logout Toast component
  const [showLogoutToast, setShowLogoutToast] = useState(false);

  // check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      console.log(`Token: ${token}, Logged in`);
    } else {
      console.log("Token not found, not logged in");
    }
    setIsAuthChecked(true);
  }, []);

  // function for handling logout and showing the toast
  const handleLogout = () => {
    setTimeout(() => {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      setShowLogoutToast(true);
      console.log("Token removed");
      console.log("Logged out");
      setTimeout(() => {
        setShowLogoutToast(false); // hide toast after 3 seconds
      }, 3000);
    }, 1500);
  };
  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, handleLogout, showLogoutToast }}
    >
      {isAuthChecked ? children : null}
    </AuthContext.Provider>
  );
}
