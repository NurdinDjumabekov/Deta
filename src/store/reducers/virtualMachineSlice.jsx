import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import socketIOClient from "socket.io-client";
import axios from "axios";

import axiosInstance from "../../axiosInstance";
import { myAlert } from "../../helpers/MyAlert";
const { REACT_APP_API_URL } = process.env;
///// virtualMachineSlice

const initialState = {
  preloadeкNetwork: false,
  listStatusVm: [], //// список загрузочный текстов для отключения, вкл и перезагрузки ВМ
  listHistoryAction: [], /// список историй действий в контейнерах
};

const url_socket = "https://dd-api.ibm.kg";

//// перезагрузить ВМ
export const restartVmSC = () => (dispatch) => {
  const socket = socketIOClient(url_socket);
  socket.on("staticPingStatus", (data) => {
    // dispatch(listStaticsIpFN(data?.data));
  });
  return () => socket.disconnect();
};
//// включить ВМ
export const startVmSC = () => (dispatch) => {
  const socket = socketIOClient(url_socket);
  socket.on("staticPingStatus", (data) => {
    // dispatch(listStaticsIpFN(data?.data));
  });
  return () => socket.disconnect();
};
//// отключить ВМ
export const endVmSC = () => (dispatch) => {
  const socket = socketIOClient(url_socket);
  socket.on("staticPingStatus", (data) => {
    // dispatch(listStaticsIpFN(data?.data));
  });
  return () => socket.disconnect();
};

///// getHistoryActionsReq - get список историй действий
export const getHistoryActionsReq = createAsyncThunk(
  "getHistoryActionsReq",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}host/getHostContainerList`;
    try {
      const response = await axiosInstance.post(url, data);
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

const virtualMachineSlice = createSlice({
  name: "virtualMachineSlice",
  initialState,
  reducers: {
    listStatusVmFN: (state, action) => {
      state.listStatusVm = action.payload;
    },
  },

  extraReducers: (builder) => {
    ///////////////////////////// getHistoryActionsReq
    builder.addCase(getHistoryActionsReq.fulfilled, (state, action) => {
      state.preloaderTodos = false;
      state.listHistoryAction = action.payload;
    });
    builder.addCase(getHistoryActionsReq.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderTodos = false;
      state.listHistoryAction = [];
    });
    builder.addCase(getHistoryActionsReq.pending, (state, action) => {
      state.preloaderTodos = true;
    });
  },
});

export const { listStatusVmFN } = virtualMachineSlice.actions;

export default virtualMachineSlice.reducer;
