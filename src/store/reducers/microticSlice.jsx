import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import socketIOClient from "socket.io-client";
import axios from "axios";

import axiosInstance from "../../axiosInstance";
import { myAlert } from "../../helpers/MyAlert";
const { REACT_APP_API_URL } = process.env;
///// microticSlice

const initialState = {
  preloaderMicrotic: false,
  listMicrotics: { routers: [], switchs: [] }, /// списки микротиков
};

///// getMicroticsReq - get list микротиков
export const getMicroticsReq = createAsyncThunk(
  "getMicroticsReq",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}mikrotik/getRouterSwitshList`;
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

///// crudMicroticsReq - add микротиков
export const crudMicroticsReq = createAsyncThunk(
  "crudMicroticsReq",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}mikrotik/${data?.link}`;
    try {
      const response = await axiosInstance.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        return response?.data?.res;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const microticSlice = createSlice({
  name: "microticSlice",
  initialState,
  reducers: {
    listStatusVmFN: (state, action) => {
      state.listStatusVm = action.payload;
    },
  },

  extraReducers: (builder) => {
    ///////////////////////// getMicroticsReq
    builder.addCase(getMicroticsReq.fulfilled, (state, action) => {
      state.preloaderMicrotic = false;
      state.listMicrotics = action.payload;
    });
    builder.addCase(getMicroticsReq.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderMicrotic = false;
      myAlert("Упс, что-то пошло не так!", "error");
    });
    builder.addCase(getMicroticsReq.pending, (state, action) => {
      state.preloaderMicrotic = true;
    });
  },
});

export const { listStatusVmFN } = microticSlice.actions;

export default microticSlice.reducer;
