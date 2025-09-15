import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosConfig from "../../configs/axiosConfig";

const festivalIndex = createAsyncThunk(
  "festivalSlice/festivalIndex", // sliceName/purposeName
  async (page) => {
    const url = `${axiosConfig.BASE_URL}/searchFestival2`;
    //store params in {} for server url
    const params = {
      serviceKey: axiosConfig.SERVICE_KEY,
      MobileOS: axiosConfig.MOBILE_OS,
      MobileApp: axiosConfig.MOBILE_App,
      _type: axiosConfig.TYPE,
      arrange: axiosConfig.ARRANGE,
      numOfRows: axiosConfig.NUM_OF_ROWS,
      pageNo: page,
      eventStartDate: "20250401",
    };

    const response = await axios.get(url, { params });
    return response.data.response.body;
  }
);
export { festivalIndex };
