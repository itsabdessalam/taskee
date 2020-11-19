/**
 * Returns a readable time from milliseconds
 *
 * @param {number} ms
 * @returns {string}
 */
export const getReadableDuration = (ms) => {
  const [time] = new Date(ms).toISOString().slice(11, -1).split(".");

  return time
    .split(":")
    .filter((t, index) => {
      if (index === 0) {
        return t !== "00";
      }
      return t;
    })
    .join(":");
};
