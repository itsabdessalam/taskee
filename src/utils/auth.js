const AUTH_VAR = `${process.env.REACT_APP_BASE_NAME}_auth`;

/**
 * Returns user from localStorage
 *
 * @returns
 */
const getUser = () =>
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
const setUser = user => {
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
  token
}) => {
  return setUser({
    _id,
    lastName,
    firstName,
    email,
    language,
    notificationActivated,
    token
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

export const getUserLogged = () => {
  const user = getUser();
  return user;
};

export const setUserLogged = user => {
  setUser(user);
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
