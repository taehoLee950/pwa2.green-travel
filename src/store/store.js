import { configureStore } from "@reduxjs/toolkit";
import festivalReducer from "./slices/festivalSlice.js";
import festivalShowReducer from "./slices/festivalShowSlice.js";

export default configureStore({
  reducer: {
    // slice 정의
    festival: festivalReducer,
    festivalShow: festivalShowReducer,
  },
});
