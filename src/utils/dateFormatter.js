export const dateFormatter = {
  /**
   * convert string type date in 'YYYY-MM-DD` format
   * @param {string} strDate
   * @returns {string} YYYY-MM-DD- format
   */
  withHyphenYMD: (strDate) => {
    return `${strDate.slice(0, 4)}-${strDate.slice(4, 6)}-${strDate.slice(6, 8)}`;
  },
  /**
   * Date 객체를 `YYYYMMDD` 포맷으로 반환
   * @param {Date} date
   * @returns {string} `YYYYMMDD` 포멧
   */
  formatDateToYMD: (date) => {
    return `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, 0)}${date.getDate().toString().padStart(2, 0)}`;
  },
};

// TODO: TEST코드 지우기
const now = new Date("2025-01-01");
console.log(dateFormatter.formatDateToYMD(now));
