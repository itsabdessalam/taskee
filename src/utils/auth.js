const AUTH_VAR = `${process.env.REACT_APP_BASE_NAME}_auth`;

/**
 * Returns user from localStorage
 *
 * @returns
 */
export const getUser = () =>
  // eslint-disable-next-line no-extra-boolean-cast
  !!window.localStorage[AUTH_VAR]
    ? JSON.parse(window.localStorage[AUTH_VAR])
    : {};

/**
 * Sets user in localStorage
 *
 * @param {*} user
 * @returns
 */
export const setUser = user => {
  return (window.localStorage[AUTH_VAR] = JSON.stringify(user));
};

/**
 * Sets user with provided credentials
 *
 * @param {*} { lastName, firstName, email, password, language, token }
 * @returns
 */
export const handleLogin = ({
  _id,
  lastName,
  firstName,
  email,
  password,
  language,
  notificationActivated,
  token,
  theme = "light"
}) => {
  return setUser({
    _id,
    lastName,
    firstName,
    email,
    language,
    notificationActivated,
    token,
    theme
  });
};

/**
 * Checks if user is logged in
 *
 * @returns
 */
export const isLoggedIn = () => {
  const user = getUser();
  return !!user.token;
};

/**
 * Logs the user out
 *
 * @param {*} callback
 * @returns
 */
export const logout = callback => {
  setUser({});
  callback();
};
