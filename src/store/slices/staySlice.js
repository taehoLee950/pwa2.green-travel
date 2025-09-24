import { createSlice } from "@reduxjs/toolkit";
import { localStorageUtil } from "../../utils/localStorageUtil";
import { stayIndex } from "../thunks/stayThunk.js";

const staySlice = createSlice({
  name: "staySlice",
  initialState: {
    list: localStorageUtil.getStayList() ? localStorageUtil.getStayList() : [], // 숙박 리스트
    currentStay: null, // 현재 선택된 숙박 정보 (상세보기용)
    pageNo: 1,
    totalCount: 0, // 불러온 전체 아이템 수
    scrollEventFlg: true, // 무한 스크롤 제어
    currentAreaCode: null, // 현재 검색된 지역 코드
    isLoading: false, // 로딩 상태
  },
  reducers: {
    setCurrentStay: (state, action) => {
      state.currentStay = action.payload;
    },
    resetStayList: (state) => {
      state.list = [];
      state.pageNo = 1;
      state.totalCount = 0;
      state.scrollEventFlg = true;
      state.currentAreaCode = null;
      localStorageUtil.setStayList(state.list);
    },
    setStayScrollEventFlg: (state, action) => {
      state.scrollEventFlg = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(stayIndex.fulfilled, (state, action) => {
        // API가 정상적으로 응답했지만, item이 비어있거나 없는 경우를 확인
        if (
          action.payload.items?.item &&
          action.payload.items.item.length > 0
        ) {
          // 새로운 페이지 데이터로 목록을 교체
          state.list = action.payload.items.item;
          state.totalCount = action.payload.totalCount;
          state.pageNo = action.payload.pageNo;
          localStorageUtil.setStayList(state.list);
        } else {
          // 검색 결과가 없는 경우
          state.list = [];
          state.totalCount = 0;
          state.pageNo = 1;
        }
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        (action) =>
          action.type.endsWith("/rejected") ||
          action.type.endsWith("/fulfilled"),
        (state) => {
          state.isLoading = false;
        }
      );
  },
});

export const { setCurrentStay, resetStayList, setStayScrollEventFlg } =
  staySlice.actions;
export default staySlice.reducer;
