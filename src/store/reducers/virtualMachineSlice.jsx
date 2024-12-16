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

const virtualMachineSlice = createSlice({
  name: "virtualMachineSlice",
  initialState,
  reducers: {
    listStatusVmFN: (state, action) => {
      state.listStatusVm = action.payload;
    },
  },

  extraReducers: (builder) => {
   
  },
});

export const { listStatusVmFN } = virtualMachineSlice.actions;

export default virtualMachineSlice.reducer;
