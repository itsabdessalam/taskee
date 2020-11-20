import { createContext, useEffect, useReducer } from "react";
import { IntlProvider } from "react-intl";

import locales from "../config/locales";
import useLocalStorage from "../hooks/useLocalStorage";
import * as translations from "../translations";

const LocaleContext = createContext();

function reducer(state, { type, locale }) {
  switch (type) {
    case "UPDATE_LOCALE":
      return { ...state, activeLocale: locale };
    default:
      throw new Error("Invalid action");
  }
}

const defaultLocale = locales.find((locale) => locale.default);

function LocaleProvider({ children, locale = defaultLocale.locale }) {
  const [savedLocale, saveLocale] = useLocalStorage(
    `${process.env.REACT_APP_BASE_NAME}_locales`,
    JSON.stringify({
      activeLocale: locale
    })
  );
  const [state, dispatch] = useReducer(reducer, JSON.parse(savedLocale));
  const updateLocale = (locale) => dispatch({ type: "UPDATE_LOCALE", locale });

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
}

export { LocaleProvider, LocaleContext as default };
