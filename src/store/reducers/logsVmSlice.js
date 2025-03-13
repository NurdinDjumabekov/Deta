import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import socketIOClient from "socket.io-client";
import { myAlert } from "../../helpers/MyAlert";
import axiosInstance from "../../axiosInstance";
import axios from "axios";
const { REACT_APP_API_URL } = process.env;

const initialState = {
  preloaderLog: false,
  listActionsVm: [],
  viewActiveStack: {},
};

//// getLogVmsReq - get логи действий кгонтейнеров
export const getLogVmsReq = createAsyncThunk(
  "getLogVmsReq",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}node/getAllLogs`;
    try {
      const response = await axiosInstance.post(url, data);
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

//// getEveryLogVmsReq - get каждый лог действий контейнеров
export const getEveryLogVmsReq = createAsyncThunk(
  "getEveryLogVmsReq",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}node/getAllLogs`;
    try {
      const response = await axiosInstance.post(url, data);
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

const logsVmSlice = createSlice({
  name: "logsVmSlice",
  initialState,
  reducers: {
    getLogVmsReqFn: (state, action) => {
      state.getLogVmsReq = action.payload;
    },
    viewActiveStackFn: (state, action) => {
      state.viewActiveStack = action.payload;
    },
  },

  extraReducers: (builder) => {
    ///////////////////////////// getLogVmsReq
    builder.addCase(getLogVmsReq.fulfilled, (state, action) => {
      // state.preloaderLog = false;
      state.listActionsVm = action.payload;
    });
    builder.addCase(getLogVmsReq.rejected, (state, action) => {
      state.error = action.payload;
      state.listActionsVm = [];
      // state.preloaderLog = false;
    });
    builder.addCase(getLogVmsReq.pending, (state, action) => {
      // state.preloaderLog = true;
    });
  },
});

export const { getLogVmsReqFn, viewActiveStackFn } = logsVmSlice.actions;

export default logsVmSlice.reducer;
