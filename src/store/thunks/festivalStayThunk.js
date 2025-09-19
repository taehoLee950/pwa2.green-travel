import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosStayConfig from "../../configs/axiosStayConfig";

const festivalStayIndex = createAsyncThunk(
  "festivalSlice/festivalStayIndex", // sliceName/purposeName
  // 2개 파라미터 고정 - arg: 외부주입, thunkAPI: redux 관련
  async (arg, thunkAPI) => {
    // state 모으기
    const state = thunkAPI.getState();

    const url = `${axiosStayConfig.BASE_URL}/searchStay2`;
    //store params in {} for server url
    const params = {
      serviceKey: axiosStayConfig.SERVICE_KEY,
      MobileOS: axiosStayConfig.MOBILE_OS,
      MobileApp: axiosStayConfig.MOBILE_App,
      _type: axiosStayConfig.TYPE,
      arrange: axiosStayConfig.ARRANGE,
      numOfRows: axiosStayConfig.NUM_OF_ROWS,
      pageNo: state.festival.page + 1,
    };

    const response = await axios.get(url, { params });
    return response.data.response.body;
  }
);
export { festivalStayIndex };
