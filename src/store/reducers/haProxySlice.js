import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import socketIOClient from "socket.io-client";
import axios from "axios";

import { clearHaPrioxy } from "../../helpers/clear";
import axiosInstance from "../../axiosInstance";
const { REACT_APP_API_URL } = process.env;

const initialState = {
  preloaderProxy: false,

  listHaProxy: [],

  modalActionsHaProxy: {
    guid: "",
    name: "",
    status: false, //// off, on
    comment: "",
    type: 0, //// протокол
    ip_addres: "",
    checkType: false, //// нижний checkbox
    typeAction: 0, //// 1 - создание, 2 - редактирование, 3 удаление
  }, //// для редактирование и удаления HaProxy
};

///// getHaProxyList - для списка Haproxy
export const getHaProxyList = createAsyncThunk(
  "getHaProxyList",
  async function (props, { dispatch, rejectWithValue }) {
    const { value } = props;
    const searchParams = !!value ? `?search=${value}` : "";
    const url = `${REACT_APP_API_URL}proxy/getHaproxyList${searchParams}`;
    try {
      const response = await axiosInstance(url);
      if (response.status >= 200 && response.status < 300) {
        return {
          list: response?.data?.list,
          counts: {
            all: response?.data?.all || 0,
            active: response?.data?.active || 0,
            de_active: response?.data?.de_active || 0,
          },
        };
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

///// crudHaProxyReq - /// для всех действий Haproxy
export const crudHaProxyReq = createAsyncThunk(
  "crudHaProxyReq",
  async function (data, { dispatch, rejectWithValue }) {
    /// typeAction (блокировка(3),перенапраление(4), удаления(3),редактирования(2), добавления(1) Haproxy)
    const url = `${REACT_APP_API_URL}proxy/actionsHaproxy`;
    try {
      const response = await axiosInstance.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        dispatch(clearModalActionsHaProxy()); /// очищаю state для редактирования
        return response?.data.result;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

///// saveHaProxyReq -
export const saveHaProxyReq = createAsyncThunk(
  "saveHaProxyReq",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}proxy/save_haproxy_config`;
    try {
      const response = await axiosInstance.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        return response?.data.result;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const requestHaProxySlice = createSlice({
  name: "requestHaProxySlice",
  initialState,
  reducers: {
    ////// modalActionsHaProxy
    setModalActionsHaProxy: (state, action) => {
      state.modalActionsHaProxy = action.payload;
    },
    clearModalActionsHaProxy: (state, action) => {
      state.modalActionsHaProxy = clearHaPrioxy;
    },
    clearListHaProxy: (state, action) => {
      state.listHaProxy = clearHaPrioxy;
    },
  },

  extraReducers: (builder) => {
    /////////////////////////// getHaProxyList
    builder.addCase(getHaProxyList.fulfilled, (state, action) => {
      state.preloaderProxy = false;
      const newList = [];
      const arr = action.payload?.list?.slice(0, 250);
      for (let i = 0; i < arr.length; i += 6) {
        newList.push({
          one: arr[i],
          two: arr[i + 1],
          three: arr[i + 2],
          four: arr[i + 3],
          five: arr[i + 4],
          six: arr[i + 5],
        });
      }

      state.listHaProxy = newList;
    });
    builder.addCase(getHaProxyList.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderProxy = false;
    });
    builder.addCase(getHaProxyList.pending, (state, action) => {
      state.preloaderProxy = true;
    });

    ///////////////////////// crudHaProxyReq
    builder.addCase(crudHaProxyReq.fulfilled, (state, action) => {
      state.preloaderProxy = false;
    });
    builder.addCase(crudHaProxyReq.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderProxy = false;
    });
    builder.addCase(crudHaProxyReq.pending, (state, action) => {
      state.preloaderProxy = true;
    });
  },
});

export const {
  setModalActionsHaProxy,
  clearModalActionsHaProxy,
  clearListHaProxy,
} = requestHaProxySlice.actions;

export default requestHaProxySlice.reducer;
