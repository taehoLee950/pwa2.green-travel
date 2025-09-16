import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosConfig from "../../configs/axiosConfig";
import { dateCalculator } from "../../utils/dateCalculator.js";
import { dateFormatter } from "../../utils/dateFormatter.js";
const festivalIndex = createAsyncThunk(
  "festivalSlice/festivalIndex", // sliceName/purposeName
  // 2개 파라미터 고정 - arg: 외부주입, thunkAPI: redux 관련
  async (arg, thunkAPI) => {
    // state 접근 방법
    const state = thunkAPI.getState();
    // pastDate: 축제 시작 날짜 정의용 함수 갖고오기
    const pastDateYMD = dateFormatter.formatDateToYMD(
      dateCalculator.getPastDate(1000 * 60 * 60 * 24 * 30)
    );
    const url = `${axiosConfig.BASE_URL}/searchFestival2`;
    //store params in {} for server url
    const params = {
      serviceKey: axiosConfig.SERVICE_KEY,
      MobileOS: axiosConfig.MOBILE_OS,
      MobileApp: axiosConfig.MOBILE_App,
      _type: axiosConfig.TYPE,
      arrange: axiosConfig.ARRANGE,
      numOfRows: axiosConfig.NUM_OF_ROWS,
      pageNo: state.festival.page + 1,
      eventStartDate: pastDateYMD,
    };

    const response = await axios.get(url, { params });
    return response.data.response.body;
  }
);
export { festivalIndex };
