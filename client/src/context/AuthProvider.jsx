import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // state for showing logout Toast component
  const [showLogoutToast, setShowLogoutToast] = useState(false);

  // check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      console.log(`Token: ${token}, Logged in`);
      console.log("Token not found, not logged in");
    }
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
      {children}
    </AuthContext.Provider>
  );
}
