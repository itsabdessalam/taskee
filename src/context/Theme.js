import { createContext, useEffect, useReducer } from "react";
import {
  ThemeProvider as StyledComponentsThemeProvider,
  createGlobalStyle
} from "styled-components";
import useLocalStorage from "../hooks/useLocalStorage";
import THEME from "../config/theme";
import "../assets/fonts/main.css";

const ThemeContext = createContext();
const reducer = (state, { type, theme }) => {
  switch (type) {
    case "UPDATE_THEME":
      return { ...state, activeTheme: theme };
    default:
      throw new Error("Invalid action");
  }
};

const ThemeProvider = ({ children, theme = "light" }) => {
  const [savedTheme, saveTheme] = useLocalStorage(
    `${process.env.REACT_APP_BASE_NAME}_theme`,
    JSON.stringify({
      activeTheme: theme
    })
  );
  const [state, dispatch] = useReducer(reducer, JSON.parse(savedTheme));
  const updateTheme = theme => dispatch({ type: "UPDATE_THEME", theme });
  const activeTheme = THEME[state.activeTheme];
  const GlobalStyle = createGlobalStyle`
    *, ::after, ::before {
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }

    html,
    body {
      width: 100%;
      height: 100%;
      margin: 0 auto;
    }

    body {
      margin: 0;
      font-family: 'Circular', 'Helvetica', 'Arial', sans-serif;
      background-color: ${activeTheme.colors.background};
      color: ${activeTheme.colors.text};  
    }

    a, button {
      cursor: pointer;
      > svg {
        pointer-events: none;
      }
    }
  `;
  useEffect(() => {
    saveTheme(JSON.stringify(state));
  }, [state, saveTheme]);

  return (
    <ThemeContext.Provider
      value={{
        ...state,
        updateTheme
      }}
    >
      <StyledComponentsThemeProvider theme={activeTheme}>
        <GlobalStyle />
        {children}
      </StyledComponentsThemeProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext as default };
