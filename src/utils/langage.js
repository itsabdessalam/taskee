/**
 * Get navigator langage and format then
 *
 * @return string
 */
const getLanguage = () => {
  return navigator.language.slice(0, 2);
};

export default getLanguage;
