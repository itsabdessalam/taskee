/**
 * Converts an asynchronous function to return only data and error
 *
 * @param {*} promise
 * @return {*}
 */
const until = promise => {
  return promise
    .then(data => {
      return [data, null];
    })
    .catch(error => {
      return [null, error];
    });
};

export default until;
