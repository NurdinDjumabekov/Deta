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

///// start - /// для добавления сетей
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
    // ///////////////////////// addNetworkReq
    // builder.addCase(addNetworkReq.fulfilled, (state, action) => {
    //   state.preloadeкNetwork = false;
    //   if (action.payload == 1) {
    //     myAlert("Сеть добавлена");
    //   } else if (action.payload == 2) {
    //     myAlert("Сеть c таким IP адресом уже существует!", "error");
    //   }
    // });
    // builder.addCase(addNetworkReq.rejected, (state, action) => {
    //   state.error = action.payload;
    //   state.preloadeкNetwork = false;
    //   myAlert("Упс, что-то пошло не так!", "error");
    // });
    // builder.addCase(addNetworkReq.pending, (state, action) => {
    //   state.preloadeкNetwork = true;
    // });
  },
});

export const { listStatusVmFN } = virtualMachineSlice.actions;

export default virtualMachineSlice.reducer;
