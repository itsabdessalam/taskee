import { createContext, useEffect, useReducer } from "react";
import { useLocalStorage } from "../hooks";

const UserContext = createContext();
const reducer = (state, { type, user }) => {
  switch (type) {
    case "UPDATE_USER":
      return {
        ...state,
        user
      };
    default:
      throw new Error("Invalid action");
  }
};

const UserProvider = ({ children }) => {
  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
};

export { UserProvider, UserContext as default };
