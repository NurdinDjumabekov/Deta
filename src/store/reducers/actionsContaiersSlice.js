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
  listOs: [], // список операционных систем

  ///// состояния для модалок VM
  // viewLogsStartVM: false,
  // dataActionVm: {},
};

const url_socket = "https://dd-api.ibm.kg/ws";

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

///// editVmReq - редактирование контейнеров
export const editVmReq = createAsyncThunk(
  "editVmReq",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}node/editContainer`;
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

//// updateStatusVmReq - поучить логи бэкап контейнера
export const updateStatusVmReq = createAsyncThunk(
  "updateStatusVmReq",
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

//// shutdownContainerFN - отключение контейнера (мягкое и жёсткое)
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

//// delGroupContainerReq - удалить группу контейнера
export const delGroupContainerReq = createAsyncThunk(
  "delGroupContainerReq",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}node/delGroupVM`;
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

///// addGroupVmReq - добавить в группу контейнер
export const addGroupVmReq = createAsyncThunk(
  "addGroupVmReq",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}node/updateUserOrGroupPermissions`;
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

//// getListOsReq - поучить cписок оп. систем
export const getListOsReq = createAsyncThunk(
  "getListOsReq",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}node/getOS`;
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

//// delVmReq - удаление контейнера
export const delVmReq = createAsyncThunk(
  "delVmReq",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}node/deleteVM`;
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
    // viewLogsStartVmFN: (state, action) => {
    //   state.viewLogsStartVM = action.payload;
    // },
    // dataActionVmFN: (state, action) => {
    //   state.dataActionVm = action.payload;
    // },
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

    ///////////////////////////////// updateStatusVmReq
    builder.addCase(updateStatusVmReq.fulfilled, (state, action) => {
      state.preloader = false;
    });
    builder.addCase(updateStatusVmReq.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(updateStatusVmReq.pending, (state, action) => {
      state.preloader = true;
    });

    ///////////////////////////////////// delGroupContainerReq
    builder.addCase(delGroupContainerReq.fulfilled, (state, action) => {
      state.preloader = false;
    });
    builder.addCase(delGroupContainerReq.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(delGroupContainerReq.pending, (state, action) => {
      state.preloader = true;
    });

    /////////////////////////////////////// getListOsReq
    builder.addCase(getListOsReq.fulfilled, (state, action) => {
      state.preloader = false;
      state.listOs = action.payload;
    });
    builder.addCase(getListOsReq.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      state.listOs = [];
      myAlert("Не удалось загрузить список операционных систем", "error");
    });
    builder.addCase(getListOsReq.pending, (state, action) => {
      state.preloader = true;
    });

    ///////////////////////////////////////// delVmReq
    builder.addCase(delVmReq.fulfilled, (state, action) => {
      state.preloader = false;
    });
    builder.addCase(delVmReq.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      myAlert("Не удалось удалить", "error");
    });
    builder.addCase(delVmReq.pending, (state, action) => {
      state.preloader = true;
    });
  },
});

export const { activeUserServiceFN, logsActionsVM_FN } =
  actionsContaiersSlice.actions;

export default actionsContaiersSlice.reducer;
