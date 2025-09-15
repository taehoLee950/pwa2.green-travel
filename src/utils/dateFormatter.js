export const dateFormatter = {
  /**
   * convert string type date in 'YYYY-MM-DD` format
   * @param {string} strDate
   * @returns {string} YYYY-MM-DD- format
   */
  withHyphenYMD: (strDate) => {
    return `${strDate.slice(0, 4)}-${strDate.slice(4, 6)}-${strDate.slice(6, 8)}`;
  },
};
