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
                              token
                            }) => {
  return setUser({
    _id,
    lastName,
    firstName,
    email,
    language,
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
