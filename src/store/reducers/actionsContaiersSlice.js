import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import socketIOClient from "socket.io-client";
import { myAlert } from "../../helpers/MyAlert";
import axiosInstance from "../../axiosInstance";
import axios from "axios";
const { REACT_APP_API_URL } = process.env;

const initialState = {
  preloaderContainer: false,
  dataForBackUp: [], //// выборка хранилищ для бэкапа
  activeUserService: { type: 0, guid: "" }, /// активный user или сервис (2 - сервис? 3 - user)
  logsActionsVM: [], /// логи всех действий в VM
  viewLogs: false,
};

const url_socket = "https://dd-api.ibm.kg";

///// getDataForBackUp - для получения данных для бэкапа
export const getDataForBackUp = createAsyncThunk(
  "getDataForBackUp",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}node/getBackUpData`;
    try {
      const response = await axiosInstance.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        return response?.data?.storage;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//// backUpContainerFN - бэкап контейнера
export const backUpContainerFN = createAsyncThunk(
  "backUpContainerFN",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}node/createBackUp`;
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

//// getStatusVMReq - поучить статус бэкап, отключения и включения контейнера
export const getStatusVMReq = createAsyncThunk(
  "getStatusVMReq",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}node/getStatusActionVM`;
    try {
      const response = await axiosInstance.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        dispatch(getLogBackUpReq(data));
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//// getLogBackUpReq - поучить логи бэкап контейнера
export const getLogBackUpReq = createAsyncThunk(
  "getLogBackUpReq",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}node/getLogActionVM`;
    try {
      const response = await axiosInstance.post(url, data);
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

//// updateStatusActionVM_Req - поучить логи бэкап контейнера
export const updateStatusActionVM_Req = createAsyncThunk(
  "updateStatusActionVM_Req",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}node/updateStatusActionVM`;
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

//// shutdownContainerFN - отключение контейнера
export const shutdownContainerFN = createAsyncThunk(
  "shutdownContainerFN",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}node/shutdown`;
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

//// startContainerFN - включение контейнера
export const startContainerFN = createAsyncThunk(
  "startContainerFN",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}node/start`;
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

//// reloadContainerFN - перезагрузка контейнера
export const reloadContainerFN = createAsyncThunk(
  "reloadContainerFN",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}node/reboot`;
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

const actionsContaiersSlice = createSlice({
  name: "actionsContaiersSlice",
  initialState,
  reducers: {
    activeUserServiceFN: (state, action) => {
      state.activeUserService = action.payload;
    },
    logsActionsVM_FN: (state, action) => {
      state.logsActionsVM = action.payload;
    },
    viewLogsFN: (state, action) => {
      state.viewLogs = action.payload;
    },
  },

  extraReducers: (builder) => {
    ///////////////////////////// getDataForBackUp
    builder.addCase(getDataForBackUp.fulfilled, (state, action) => {
      state.preloader = false;
      state.dataForBackUp = action.payload?.map((i) => {
        return { label: i?.storage_name, value: i?.guid };
      });
    });
    builder.addCase(getDataForBackUp.rejected, (state, action) => {
      state.error = action.payload;
      state.dataForBackUp = [];
      state.preloader = false;
    });
    builder.addCase(getDataForBackUp.pending, (state, action) => {
      state.preloader = true;
    });

    ///////////////////////////////// backUpContainerFN
    builder.addCase(backUpContainerFN.fulfilled, (state, action) => {
      state.preloader = false;
    });
    builder.addCase(backUpContainerFN.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(backUpContainerFN.pending, (state, action) => {
      state.preloader = true;
    });

    /////////////////////////////////// getLogBackUpReq
    builder.addCase(getLogBackUpReq.fulfilled, (state, action) => {
      // state.preloader = false;
      state.logsActionsVM = action.payload;
    });
    builder.addCase(getLogBackUpReq.rejected, (state, action) => {
      state.error = action.payload;
      state.logsActionsVM = [];
      // state.preloader = false;
    });
    builder.addCase(getLogBackUpReq.pending, (state, action) => {
      // state.preloader = true;
    });

    ///////////////////////////////// updateStatusActionVM_Req
    builder.addCase(updateStatusActionVM_Req.fulfilled, (state, action) => {
      state.preloader = false;
    });
    builder.addCase(updateStatusActionVM_Req.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(updateStatusActionVM_Req.pending, (state, action) => {
      state.preloader = true;
    });
  },
});

export const { activeUserServiceFN, logsActionsVM_FN, viewLogsFN } =
  actionsContaiersSlice.actions;

export default actionsContaiersSlice.reducer;
