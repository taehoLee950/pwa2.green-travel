export const dateCalculator = {
  /**
   * 현재시각 기준 timestamp만큼 과거의 날짜를 계산하여 Date객체 반환
   * @param {number} timestamp
   * @returns {Date} 계산된 과거 시간 반환
   */
  getPastDate: (timestamp) => {
    const now = new Date();
    return new Date(now - timestamp);
  },
};

export default dateCalculator;
