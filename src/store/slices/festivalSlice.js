import { createSlice } from "@reduxjs/toolkit";
import { festivalIndex } from "../thunks/festivalThunk.js";
import { festivalStayIndex } from "../thunks/festivalStayThunk.js";
import { localStorageUtil } from "../../utils/localStorageUtil.js";
const festivalSlice = createSlice({
  name: "festivalSlice",
  initialState: {
    // list: null, // 페스티벌 리스트
    list: localStorageUtil.getFestivalList()
      ? localStorageUtil.getFestivalList()
      : [], // 페스티벌 리스트
    page: localStorageUtil.getFestivalPage()
      ? localStorageUtil.getFestivalPage()
      : 0, // 현재 페이지 번호
    scrollEventFlg: localStorageUtil.getFestivalScrollFlg()
      ? localStorageUtil.getFestivalScrollFlg()
      : true, // 스크롤 이벤트 디바운싱 제어 플래그
    stayList: localStorageUtil.getStayList()
      ? localStorageUtil.getStayList()
      : [], // 숙박 리스트
  },
  reducers: {
    setScrollEventFlg: (state, action) => {
      state.scrollEventFlg = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(festivalIndex.fulfilled, (state, action) => {
        if (action.payload.items?.item) {
          // state 저장
          state.list = [...state.list, ...action.payload.items.item];
          state.page = action.payload.pageNo;
          // localstroge 저장
          localStorageUtil.setFestivalList(state.list);
          localStorageUtil.setFestivalPage(state.page);
          localStorageUtil.setFestivalScrollFlg(state.scrollEventFlg);
          state.scrollEventFlg = true;
        } else {
          state.scrollEventFlg = false;
        }
      })
      // 숙박정보 처리용 .addCase
      .addCase(festivalStayIndex.fulfilled, (state, action) => {
        if (action.payload.items?.item) {
          // state 저장
          state.stayList = [...state.stayList, ...action.payload.items.item];
          state.page = action.payload.pageNo;
          // localstroge 저장
          localStorageUtil.setStayList(state.stayList);
        }
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          console.log("처리중입니다.");
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          console.error("에러에러.", action.error);
        }
      );
  },
});
export const { setScrollEventFlg } = festivalSlice.actions;
export default festivalSlice.reducer;
