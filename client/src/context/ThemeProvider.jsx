// this could contain the logic for setting the theme based on LGA (Noosa, Whitsunday, etc)
// if we decide to go down that path
// if you're not sure what context is check this out https://legacy.reactjs.org/docs/context.html

import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { useLocation } from "react-router-dom";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const { user, isLoggedIn, isAuthChecked } = useContext(AuthContext);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setTheme("publicTheme");
    } else if (isAuthChecked) {
      if (isLoggedIn && user && user.lga) {
        const lga = user.lga.toLowerCase().replace(/\s+/g, "");

        switch (lga) {
          case "noosa":
            setTheme("noosaTheme");
            break;
          case "goldcoast":
            setTheme("goldCoastTheme");
            break;
          case "whitsunday":
            setTheme("whitsundayTheme");
            break;
          case "cairns":
            setTheme("cairnsTheme");
            break;
          default:
            setTheme("publicTheme");
            break;
        }
      } else {
        setTheme("publicTheme");
      }
    }
  }, [user, isLoggedIn, isAuthChecked, location.pathname]);

  useEffect(() => {
    const currentTheme = darkMode ? "darkTheme" : theme;
    document.documentElement.setAttribute("data-theme", currentTheme);
  }, [theme, darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ theme, darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
