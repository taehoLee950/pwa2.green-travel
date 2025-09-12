import { configureStore } from "@reduxjs/toolkit";
import festivalReducer from './slices/festivalSlice.js';

export default configureStore({
  reducer: {
    // slice 정의
    festival: festivalReducer,
  }
})