import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import socketIOClient from "socket.io-client";
import axios from "axios";

import { myAlert } from "../../helpers/MyAlert";
import { clearHaPrioxy } from "../../helpers/clear";
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

const url_socket = "http://217.29.26.222:3633";

///// getHaProxyList - для списка Haproxy
export const getHaProxyList = createAsyncThunk(
  "getHaProxyList",
  async function (props, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}proxy/getHaproxyList`;
    try {
      const response = await axios(url);
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

// ////// для моментального обновления хоста
// export const updatedHosts = () => (dispatch) => {
//   const socket = socketIOClient(url_socket);
//   socket.on("asdas", ({ data }) => {
//     dispatch(setUpdatedHost(data));
//   });
//   return () => {
//     socket.disconnect();
//   };
// };

///// actionsCreateHaProxyFN - /// для удаления,редактирования и добавления Haproxy
export const actionsCreateHaProxyFN = createAsyncThunk(
  "actionsCreateHaProxyFN",
  async function (data, { dispatch, rejectWithValue }) {
    /// typeAction (для удаления(3),редактирования(2) и добавления(1) Haproxy)
    const url = `${REACT_APP_API_URL}proxy/actionsHaproxy`;
    try {
      const response = await axios.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        dispatch(clearModalActionsHaProxy()); /// очищаю state для редактирования
        dispatch(getHaProxyList()); /// get список HaProxy
        return response?.data;
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
  },

  extraReducers: (builder) => {
    /////////////////////////// getHaProxyList
    builder.addCase(getHaProxyList.fulfilled, (state, action) => {
      state.preloaderProxy = false;
      state.listHaProxy = action.payload;
    });
    builder.addCase(getHaProxyList.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderProxy = false;
    });
    builder.addCase(getHaProxyList.pending, (state, action) => {
      state.preloaderProxy = true;
    });
  },
});

export const { setModalActionsHaProxy, clearModalActionsHaProxy } =
  requestHaProxySlice.actions;

export default requestHaProxySlice.reducer;
