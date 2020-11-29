import { createContext, useEffect, useState } from "react";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [root, setRoot] = useState(null);

  useEffect(() => {
    const app = document.querySelector("#app");

    if (app) {
      setRoot(app);
    }
  }, []);

  const context = {
    root
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export { AppContextProvider, AppContext as default };
