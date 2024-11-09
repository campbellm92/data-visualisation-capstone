import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

// consider changing imports and provider usage in components (navs)
// hook for using the context:
// export const useAuth = () => {
//   return useContext(AuthContext);
// };

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // below logic allows access to token for other pages
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  // state for showing logout Toast component
  const [showLogoutToast, setShowLogoutToast] = useState(false);
  // state for loading
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(null);

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      const cachedUser = localStorage.getItem("userData");
      if (cachedUser) {
        setUser(JSON.parse(cachedUser));
        setIsLoggedIn(true);
        setIsAuthChecked(true);
        return;
      }

      try {
        const res = await fetch("http://localhost:3000/users/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }
        const data = await res.json();

        const transformedUserData = {
          email: data.user.email,
          firstName: data.user.FirstName,
          lastName: data.user.LastName,
          lga: data.user.LGAName,
        };
        setUser(transformedUserData);
        localStorage.setItem("userData", JSON.stringify(transformedUserData));
        setIsLoggedIn(true);
      } catch (err) {
        console.error("Couldn't fetch user data", err);
        setIsLoggedIn(false);
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
      } finally {
        setIsAuthChecked(true);
      }
    } else {
      setIsAuthChecked(true);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // function for handling logout and showing the toast
  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      setIsLoggedIn(false);
      setUser(null);
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
      value={{
        isLoggedIn,
        setIsLoggedIn,
        handleLogout,
        showLogoutToast,
        loading,
        user,
        isAuthChecked,
        fetchUserData,
      }}
    >
      {isAuthChecked ? children : null}
    </AuthContext.Provider>
  );
}
