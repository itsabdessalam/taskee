/**
 * Converts an asynchronous function to return only data and error
 *
 * @param {*} promise
 * @param {*} errorExt
 * @return {*}
 */
const until = (promise, errorExt) => {
  return promise
    .then((data) => {
      return [null, data];
    })
    .catch((error) => {
      if (errorExt) {
        Object.assign(error, errorExt);
      }
      return [error, undefined];
    });
};

export default until;
