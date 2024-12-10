import {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from "react";
import { AuthContext } from "./AuthProvider";
import { useLocation } from "react-router-dom";
export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const location = useLocation();
  const { user, isLoggedIn, isAuthChecked } = useContext(AuthContext);

  // State for dark mode
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );

  // Memoize the theme computation
  const theme = useMemo(() => {
    if (location.pathname === "/") {
      // Always use "publicTheme" on the landing page
      return "publicTheme";
    }

    if (!isAuthChecked) {
      // While auth is not checked, keep the theme as "publicTheme"
      return "publicTheme";
    }

    if (!isLoggedIn || !user?.lga) {
      // Use "darkTheme" or "publicTheme" based on dark mode when not logged in
      return darkMode ? "darkTheme" : "publicTheme";
    }

    // Apply user's LGA theme
    const lga = user.lga.toLowerCase().replace(/\s+/g, "");
    switch (lga) {
      case "noosa":
        return darkMode ? "noosaDarkTheme" : "noosaTheme";
      case "goldcoast":
        return darkMode ? "goldCoastDarkTheme" : "goldCoastTheme";
      case "whitsunday":
        return darkMode ? "whitsundayDarkTheme" : "whitsundayTheme";
      case "cairns":
        return darkMode ? "cairnsDarkTheme" : "cairnsTheme";
      default:
        return darkMode ? "darkTheme" : "publicTheme";
    }
  }, [
    darkMode,
    user?.lga,
    isLoggedIn,
    isAuthChecked,
    location.pathname, // Include pathname as a dependency
  ]);

  // Update the data-theme attribute when the theme changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Memoize the toggleDarkMode function
  const toggleDarkMode = useCallback(() => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  }, []);

  // Memoize the context value
  const contextValue = useMemo(
    () => ({ theme, darkMode, toggleDarkMode }),
    [theme, darkMode, toggleDarkMode]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
