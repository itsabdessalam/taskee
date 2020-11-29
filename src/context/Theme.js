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

  // TODO: move to a separate component
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
      font-family: 'Circular', 'Helvetica', 'Arial', sans-serif;
      > svg {
        pointer-events: none;
      }
    }

    input, textarea {
      font-family: 'Circular', 'Helvetica', 'Arial', sans-serif;
    }

    h1,h2,h3,h4,h5,h6 {
      font-weight: 500;
    }

    ::selection {
      background-color: ${activeTheme.colors.primary};
      color: #ffffff;
    }

    .ce-block__content,.ce-toolbar__content {
      max-width: 100%;
    }
    .ce-toolbar__plus {
      left: -24px;
    }
    .ce-toolbar__actions {
      right: -18px;
    }

    .page__actions {
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

   .has-collapsed-navigation {
      main {
        @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
          margin-left: 54px;
        }
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
