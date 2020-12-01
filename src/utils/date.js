import { format, formatDistance, parseISO } from "date-fns";
import { fr, enUS as en } from "date-fns/locale";
import locales from "../config/locales";

const localizedFormats = { fr, en };

/**
 * Returns a formatted date with a given locale
 *
 * @param {string} date
 * @param {string} locale
 * @returns {string}
 */

export const localizedDate = (date, locale) => {
  return format(parseISO(date), locales[locale].dateFormat, {
    locale: localizedFormats[locale]
  });
};

/**
 * Returns a formatted duration with a given locale
 *
 * @param {string} date
 * @param {string} locale
 * @returns {string}
 */
export const localizedDuration = (date, locale) => {
  return formatDistance(new Date(), new Date(date), {
    includeSeconds: true,
    locale: localizedFormats[locale]
  });
};
