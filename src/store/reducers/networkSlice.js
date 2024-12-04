import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import socketIOClient from "socket.io-client";
import axios from "axios";

import axiosInstance from "../../axiosInstance";
import { myAlert } from "../../helpers/MyAlert";
const { REACT_APP_API_URL } = process.env;
///// networkSlice

const initialState = {
  preloadeкNetwork: false,
  listStaticsIp: [], /// список статических ip адресов
};

const url_socket = "https://dd-api.ibm.kg";

///// addNetworkReq - /// для добавления сетей
export const addNetworkReq = createAsyncThunk(
  "addNetworkReq",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}api/network/createIp`;
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

///// getStaticsIpAddresReq - /// get стаутичесик ip адреса
export const getStaticsIpAddresReq = createAsyncThunk(
  "getStaticsIpAddresReq",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}api/network/getStaticsList`;
    try {
      const response = await axiosInstance(url);
      if (response.status >= 200 && response.status < 300) {
        return response?.data?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

///// actionGroupIPreq - /// для crud групп статичекский ip адресов
export const actionGroupIPreq = createAsyncThunk(
  "actionGroupIPreq",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}api/network/createStatic`;
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

///// actionSubGroupIPreq - /// для crud подгрупп статичекский ip адресов
export const actionSubGroupIPreq = createAsyncThunk(
  "actionSubGroupIPreq",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}api/network/createStaticSubGroup`;
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

///// actionStaticsIPreq - /// для crud подгрупп статичекский ip адресов
export const actionStaticsIPreq = createAsyncThunk(
  "actionStaticsIPreq",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}api/network/createStaticIp`;
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

export const updatedStaticsIpSocket = () => (dispatch) => {
  const socket = socketIOClient(url_socket);
  socket.on("staticPingStatus", (data) => {
    console.log(data?.data);
    dispatch(listStaticsIpFN(data?.data));
  });

  // Функция для отключения сокета
  return () => {
    socket.disconnect();
  };
};

const networkSlice = createSlice({
  name: "networkSlice",
  initialState,
  reducers: {
    listStaticsIpFN: (state, action) => {
      state.listStaticsIp = action.payload;
    },
  },

  extraReducers: (builder) => {
    ///////////////////////// addNetworkReq
    builder.addCase(addNetworkReq.fulfilled, (state, action) => {
      state.preloadeкNetwork = false;
      if (action.payload == 1) {
        myAlert("Сеть добавлена");
      } else if (action.payload == 2) {
        myAlert("Сеть c таким IP адресом уже существует!", "error");
      }
    });
    builder.addCase(addNetworkReq.rejected, (state, action) => {
      state.error = action.payload;
      state.preloadeкNetwork = false;
      myAlert("Упс, что-то пошло не так!", "error");
    });
    builder.addCase(addNetworkReq.pending, (state, action) => {
      state.preloadeкNetwork = true;
    });

    ///////////////////////////// getStaticsIpAddresReq
    builder.addCase(getStaticsIpAddresReq.fulfilled, (state, action) => {
      state.preloader = false;
      state.listStaticsIp = action.payload;
    });
    builder.addCase(getStaticsIpAddresReq.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getStaticsIpAddresReq.pending, (state, action) => {
      state.preloader = true;
    });

    ///////////////////////////// actionGroupIPreq
    builder.addCase(actionGroupIPreq.fulfilled, (state, action) => {
      state.preloader = false;
      if (action.payload == 1) {
        myAlert("Данные сохранены");
      } else if (action.payload == 2) {
        myAlert("Такая группа уже существует");
      } else {
        myAlert("Упс, что-то пошло не так, попробуйте перезагрузить страницу!");
      }
    });
    builder.addCase(actionGroupIPreq.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(actionGroupIPreq.pending, (state, action) => {
      state.preloader = true;
    });

    ///////////////////////////// actionSubGroupIPreq
    builder.addCase(actionSubGroupIPreq.fulfilled, (state, action) => {
      state.preloader = false;
      if (action.payload == 1) {
        myAlert("Данные сохранены");
      } else if (action.payload == 2) {
        myAlert("Такая подгруппа уже существует");
      } else {
        myAlert("Упс, что-то пошло не так, попробуйте перезагрузить страницу!");
      }
    });
    builder.addCase(actionSubGroupIPreq.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(actionSubGroupIPreq.pending, (state, action) => {
      state.preloader = true;
    });
  },
});

export const { listStaticsIpFN } = networkSlice.actions;

export default networkSlice.reducer;
