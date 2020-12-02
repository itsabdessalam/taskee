import locales from "../config/locales";
/**
 * Returns current navigator language
 *
 * @return string
 */
const getLanguage = () => {
  const locale = navigator.language || navigator.userLanguage;
  const language = locale.split(/[-_]/)[0];
  return Object.keys(locales).includes(language) ? language : locales.en.locale;
};

export default getLanguage;
