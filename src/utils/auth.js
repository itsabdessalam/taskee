const AUTH_VAR = `${process.env.REACT_APP_BASE_NAME}_auth`;

/**
 * Returns user from localStorage
 * 
 * @returns 
 */
const getUser = () =>
  !!window.localStorage[AUTH_VAR]
    ? JSON.parse(window.localStorage[AUTH_VAR])
    : {};

/**
 * Sets user in localStorage
 *
 * @param {*} user
 * @returns
 */
const setUser = (user) => {
  return (window.localStorage[AUTH_VAR] = JSON.stringify(user));
};

/**
 * Sets user with provided credentials
 *
 * @param {*} { username, password, token }
 * @returns
 */
export const handleLogin = ({ email, password, token }) => {
  return setUser({
    email,
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

/**
 * Logs the user out
 *
 * @param {*} callback
 * @returns
 */
export const logout = (callback) => {
  setUser({});
  callback();
};
