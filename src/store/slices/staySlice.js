import { createSlice } from "@reduxjs/toolkit";
import { localStorageUtil } from "../../utils/localStorageUtil";
import { stayIndex } from "../thunks/stayThunk.js";

const staySlice = createSlice({
  name: "staySlice",
  initialState: {
    list: localStorageUtil.getStayList() ? localStorageUtil.getStayList() : [], // 숙박 리스트
    currentStay: null, // 현재 선택된 숙박 정보 (상세보기용)
  },
  reducers: {
    setCurrentStay: (state, action) => {
      state.currentStay = action.payload;
    },
    resetStayList: (state) => {
      state.list = [];
      localStorageUtil.setStayList(state.list);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(stayIndex.fulfilled, (state, action) => {
        if (action.payload.items?.item) {
          // state 저장
          state.list = action.payload.items.item;
          // localstroge 저장
          localStorageUtil.setStayList(state.list);
        }
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          console.log("STAY API 처리중입니다.");
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          console.error("STAY API 에러가 발생했습니다:", action.error);
        }
      );
  },
});

export const { setCurrentStay, resetStayList } = staySlice.actions;
export default staySlice.reducer;
