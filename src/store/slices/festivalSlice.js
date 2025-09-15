import { createSlice } from "@reduxjs/toolkit";
import { festivalIndex } from "../thunks/festivalThunk.js";

// name it same as the file name.
const festivalSlice = createSlice({
  name: "festivalSlice",
  initialState: {
    // state will receive obj data type (공공데이터),
    // so init to []
    list: [],
    page: 1, // current page No.
    scrollEventFlg: true, //스크롤 이벤트 디바운싱 제어 플래그
  },
  reducers: {
    setScrollEventFlg: (state, action) => {
      state.scrollEventFlg = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //festivalIndex: wait for thunk to be fulfilled
      //state: refers to the state defined in slice
      .addCase(festivalIndex.fulfilled, (state, action) => {
        // if (state.list !== null) {
        //   // add page
        //   state.list = [...state.list, ...action.payload.items.item];
        //   state.page = action.payload.items.item;
        // } else {
        //   // init page process
        //   state.list = action.payload.items.item;
        // }
        if (action.payload.items?.item) {
          state.list = [...state.list, ...action.payload.items.item];
          state.page = action.payload.pageNo;
          state.scrollEventFlg = true;
        } else {
          state.scrollEventFlg = false;
        }
      })

      .addMatcher(
        // action contains data type of payload
        (action) => action.type.endsWith("/pending"),
        (state) => {
          console.log("처리중입니다.");
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          console.log("에러에러", action.error);
        }
      );
  },
});

export const { setScrollEventFlg } = festivalSlice.actions; //sending out actions

export default festivalSlice.reducer; // ready to be imported in 'store'
