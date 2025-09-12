import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosConfig from "../../configs/axiosConfig";

const festivalIndex = createAsyncThunk(
  'festivalSlice/festivalIndex', // sliceName/purposeName
  async () => {
    const url = `${axiosConfig.baseUrl}/searchFestival2`;
    //store params in {} for server url
    const params = {
        serviceKey: axiosConfig.serviceKey,
        MobileOS: axiosConfig.MobileOS,
        MobileApp: axiosConfig.MobileApp,
        _type: axiosConfig.type,
        arrange: axiosConfig.arrange,
        eventStartDate: '20250401'
      }
    
    const response = await axios.get(url, {params});

    return response.data.response.body;
  }
);
export { festivalIndex };