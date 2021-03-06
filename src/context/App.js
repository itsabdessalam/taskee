import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { UserProvider } from "./User";
import { ThemeProvider } from "./Theme";
import { LocaleProvider } from "./Locale";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [root, setRoot] = useState(null);
  const location = useLocation();
  const { pathname } = location;

  const isFullPage = page => {
    return ["/login", "/register", "/getting-started"].find(p => {
      return p === page;
    });
  };
  const fullPage = isFullPage(pathname);
  const editorMode = pathname.indexOf("/notes/") !== -1;

  useEffect(() => {
    const app = document.getElementById("app");

    if (app) {
      setRoot(app);
    }
  }, []);

  const context = {
    root,
    location,
    fullPage,
    editorMode
  };

  return (
    <AppContext.Provider value={context}>
      <UserProvider>
        <LocaleProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </LocaleProvider>
      </UserProvider>
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext as default };
