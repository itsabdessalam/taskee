import { useContext } from "react";
import LocaleContext from "../context/Locale";
import locales from "../config/locales";

const LocaleSelector = () => {
  const { activeLocale, updateLocale } = useContext(LocaleContext);

  return (
    <>
      <select
        value={activeLocale}
        onChange={({ target: { value } }) => updateLocale(value)}
      >
        {locales.map(({ label, locale }, index) => (
          <option key={index} value={locale}>
            {label}
          </option>
        ))}
      </select>
    </>
  );
};

export default LocaleSelector;
