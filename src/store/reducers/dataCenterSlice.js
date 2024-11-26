import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../axiosInstance";
const { REACT_APP_API_URL } = process.env;

const initialState = {
  preloaderDC: false,
  listDataCenter: [], /// список дата центров
};

///// getDataCenterReq - get всех дата центров
export const getDataCenterReq = createAsyncThunk(
  "getDataCenterReq",
  async function (props, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}data/getDataCenters`;
    try {
      const response = await axiosInstance(url);
      if (response.status >= 200 && response.status < 300) {
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const dataCenterSlice = createSlice({
  name: "dataCenterSlice",
  initialState,
  reducers: {
    changeTokenA: (state, action) => {
      state.tokenA = action.payload;
    },
  },

  extraReducers: (builder) => {
    /////////////////////////// getDataCenterReq
    builder.addCase(getDataCenterReq.fulfilled, (state, action) => {
      state.preloaderDC = false;
      state.listDataCenter = action.payload;
    });
    builder.addCase(getDataCenterReq.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderDC = false;
    });
    builder.addCase(getDataCenterReq.pending, (state, action) => {
      state.preloaderDC = true;
    });
  },
});

export const { changeTokenA } = dataCenterSlice.actions;

export default dataCenterSlice.reducer;
