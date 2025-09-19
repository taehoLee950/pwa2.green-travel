import {
  KEY_LOCALSTORAGE_FESTIVAL_FLG,
  KEY_LOCALSTORAGE_FESTIVAL_LIST,
  KEY_LOCALSTORAGE_FESTIVAL_PAGE,
  KEY_LOCALSTORAGE_CLEAR_DATE,
  KEY_LOCALSTORAGE_FESTIVAL_STAY_LIST,
} from "../configs/keys.js";

export const localStorageUtil = {
  // 책임 중심, 함수마다 개별적인 처리를 책임지며 담당
  clearLocalStorage: () => {
    localStorage.clear();
  },
  /**
   * 로컬스토리지에 페스티벌 리스트 저장
   * @param {[]} festivalList
   */
  setFestivalList: (data) => {
    localStorage.setItem(KEY_LOCALSTORAGE_FESTIVAL_LIST, JSON.stringify(data));
  },
  setStayList: (data) => {
    localStorage.setItem(
      KEY_LOCALSTORAGE_FESTIVAL_STAY_LIST,
      JSON.stringify(data)
    );
  },
  /**
   * 로컬스토리지 페스티벌 리스트 반환
   * @returns {[]} festivalList
   */
  getFestivalList: () => {
    return JSON.parse(localStorage.getItem(KEY_LOCALSTORAGE_FESTIVAL_LIST));
  },
  getStayList: () => {
    return JSON.parse(
      localStorage.getItem(KEY_LOCALSTORAGE_FESTIVAL_STAY_LIST)
    );
  },
  /**
   * 로컬 스토리지에 페스티벌 페이지 번호 저장
   * @param {number} pageNo
   * @returns
   */
  setFestivalPage: (pageNo) => {
    localStorage.setItem(KEY_LOCALSTORAGE_FESTIVAL_PAGE, pageNo.toString());
  },
  /**
   * 로컬 스토리지에 페스티벌 페이지 번호 반환
   * @param {number} 페이지 번호
   * @returns
   */
  getFestivalPage: () => {
    return parseInt(localStorage.getItem(KEY_LOCALSTORAGE_FESTIVAL_PAGE));
  },
  /**
   * 로컬스토리지에 페스티벌 스크롤 플래그 저장
   * @param {boolean} flg
   */
  setFestivalScrollFlg: (flg) => {
    localStorage.setItem(KEY_LOCALSTORAGE_FESTIVAL_FLG, flg.toString());
  },
  /**
   * 로컬스토리지의 페스티벌 스크롤 플래그 반환
   * @returns {boolean} flg
   */
  getFestivalScrollFlg: () => {
    return JSON.parse(localStorage.getItem(KEY_LOCALSTORAGE_FESTIVAL_FLG));
  },
  /**
   * 로컬스토리지에 로컬스토리지 클리어 날짜 저장
   * @param {string} dateYMD
   */
  setClearDate: (dateYMD) => {
    localStorage.setItem(KEY_LOCALSTORAGE_CLEAR_DATE, dateYMD);
  },
  /**
   * 로컬스토리지의 로컬스토리지 클리어 날짜 반환
   * @returns {string || null}
   */
  getClearDate: () => {
    return localStorage.getItem(KEY_LOCALSTORAGE_CLEAR_DATE);
  },
};
//  역할 중심, 함수에 여러가지 기능이 추가되어 하나의 역할을 수행
//   setLocalStorage: (name, data) => {
//     localStorage.setItem(name, JSON.stringify(data));
//   },
//   getLocalStorage: (name) => {
//     return localStorage.getItem(name);
//   },
