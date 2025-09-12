import { createSlice } from "@reduxjs/toolkit";
import { festivalIndex } from "../thunks/festivalThunk.js";

// name it same as the file name.
const festivalSlice = createSlice({
  name: 'festivalSlice',
  initialState: {
    // state will receive obj data type (공공데이터), 
    // so init to null
    list: null, 
  },
  reducers: {
    setList(state, action) {
      // replace list with new in-coming data (공공데이터)
      state.list = action.payload
    }
  },
  extraReducers: builder => {
    builder
     //festivalIndex: wait for thunk to be fulfilled
     //state: refers to the state defined in slice
      .addCase(festivalIndex.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addMatcher(
        // action contains data type of payload
        action => action.type.endsWith('/pending'),
        state => {
          console.log('처리중입니다.')
        }
      )
      .addMatcher(
        action => action.type.endsWith('/rejected'),
        state => {
          console.log('에러에러')
        }
      )
  }
});

export const {
  setList // 
} = festivalSlice.actions //sending out actions

export default festivalSlice.reducer; // ready to be imported in 'store'