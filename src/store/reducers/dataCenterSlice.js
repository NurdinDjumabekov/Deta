import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../axiosInstance";
import { myAlert } from "../../helpers/MyAlert";
const { REACT_APP_API_URL } = process.env;

const initialState = {
  preloaderDC: false,
  listDataCenter: [], /// список дата центров
  listComands: [], /// список команд каждого ДЦ
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

///// getComandsReq - get список команд каждого ДЦ
export const getComandsReq = createAsyncThunk(
  "getComandsReq",
  async function (props, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}shedule/getSheduleList`;
    try {
      const response = await axiosInstance(url);
      if (response.status >= 200 && response.status < 300) {
        return response?.data?.result;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

///// editComandsReq - редактирование списка команд каждого ДЦ
export const editComandsReq = createAsyncThunk(
  "editComandsReq",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}shedule/createUpdateShedule`;
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

///// performComandsReq - выполнение команд каждого ДЦ
export const performComandsReq = createAsyncThunk(
  "performComandsReq",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}shedule/actionSheduleTask`;
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
      state.listDataCenter = [];
    });
    builder.addCase(getDataCenterReq.pending, (state, action) => {
      state.preloaderDC = true;
    });

    /////////////////////////// getComandsReq
    builder.addCase(getComandsReq.fulfilled, (state, action) => {
      state.preloaderDC = false;
      state.listComands = action.payload;
    });
    builder.addCase(getComandsReq.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderDC = false;
      state.listComands = [];
    });
    builder.addCase(getComandsReq.pending, (state, action) => {
      state.preloaderDC = true;
    });

    //////////////////////////// performComandsReq
    builder.addCase(performComandsReq.fulfilled, (state, action) => {
      state.preloaderDC = false;
    });
    builder.addCase(performComandsReq.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderDC = false;
      myAlert("Не удалось выполнить команду", "error");
    });
    builder.addCase(performComandsReq.pending, (state, action) => {
      state.preloaderDC = true;
    });
  },
});

export const { changeTokenA } = dataCenterSlice.actions;

export default dataCenterSlice.reducer;
