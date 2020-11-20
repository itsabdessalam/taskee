import { createContext } from "react";

const AppContext = createContext({});

const AppContextProvider = ({children}) => {
  const context = {};

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export { AppContext, AppContextProvider };
