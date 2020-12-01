import { createContext, useEffect, useReducer } from "react";
import { IntlProvider } from "react-intl";
import { useLocalStorage } from "../hooks";
import * as translations from "../translations";
import locales from "../config/locales";

const LocaleContext = createContext();
const reducer = (state, { type, locale }) => {
  switch (type) {
    case "UPDATE_LOCALE":
      return {
        ...state,
        activeLocale: locale
      };
    default:
      throw new Error("Invalid action");
  }
};

const LocaleProvider = ({ children, locale = "en" }) => {
  const [savedLocale, saveLocale] = useLocalStorage(
    `${process.env.REACT_APP_BASE_NAME}_locales`,
    JSON.stringify({
      activeLocale: locale
    })
  );
  const [state, dispatch] = useReducer(reducer, JSON.parse(savedLocale));
  const updateLocale = locale =>
    dispatch({
      type: "UPDATE_LOCALE",
      locale
    });

  useEffect(() => {
    saveLocale(JSON.stringify(state));
  }, [state, saveLocale]);

  return (
    <LocaleContext.Provider
      value={{
        ...state,
        updateLocale
      }}
    >
      <IntlProvider
        locale={state.activeLocale}
        messages={translations[state.activeLocale]}
      >
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
};

export { LocaleProvider, LocaleContext as default };
