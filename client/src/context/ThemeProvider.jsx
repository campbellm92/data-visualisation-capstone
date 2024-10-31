// this could contain the logic for setting the theme based on LGA (Noosa, Whitsunday, etc)
// if we decide to go down that path
// if you're not sure what context is check this out https://legacy.reactjs.org/docs/context.html

import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthProvider"; // Import AuthContext

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const { user, isLoggedIn, isAuthChecked } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthChecked) {
      if (isLoggedIn && user && user.lga) {
        const lga = user.lga.toLowerCase().replace(/\s+/g, "");
        console.log("User LGA after processing:", lga);

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
  }, [user, isLoggedIn, isAuthChecked]);

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
