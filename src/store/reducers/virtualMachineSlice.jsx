import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import socketIOClient from "socket.io-client";
import axios from "axios";

import axiosInstance from "../../axiosInstance";
import { myAlert } from "../../helpers/MyAlert";
const { REACT_APP_API_URL } = process.env;
///// virtualMachineSlice

const initialState = {
  preloaderVM: false,
  listStatusVm: [], //// список загрузочный текстов для отключения, вкл и перезагрузки ВМ
  listHistoryAction: [], /// список историй действий в контейнерах
  listTypeBackUpContainers: { container: [], vm: [], hosts: [] }, /// список типов бэкапов контейнера
  listBackUpContainers: [], /// список бэкапов контейнера
  viewListResultBackUp: { log: [], status: false },
  listCloneLogs: [],
  listCallStack: [],
  /// список логирования результатов бэкапа контейнера
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
    const url = `${REACT_APP_API_URL}history/getCreateHistory`;
    try {
      const response = await axiosInstance(url);
      if (response.status >= 200 && response.status < 300) {
        return response?.data?.history;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

///// getTypesBackUpReq - get список типов storage для селекта бэкапа
export const getTypesBackUpReq = createAsyncThunk(
  "getTypesBackUpReq",
  async function (guid_host, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}host/getBackUpList?guid_node=${guid_host}`;
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

///// getListBackUpReq - get список типов storage для селекта бэкапа
export const getListBackUpReq = createAsyncThunk(
  "getListBackUpReq",
  async function (props, { dispatch, rejectWithValue }) {
    const { guid_storage, guid_node } = props;
    const url = `${REACT_APP_API_URL}host/getBackUpdataByStorage?guid_storage=${guid_storage}&guid_node=${guid_node}`;
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

///// createBackUpContainerReq - создание бэкапа
export const createBackUpContainerReq = createAsyncThunk(
  "createBackUpContainerReq",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}host/createNewVMOnBackUp`;
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

export const getCloneLogs = createAsyncThunk(
  "getCloneLogs",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}node/getCloneLogs`;
    try {
      const response = await axiosInstance.get(url, data);
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

/////
export const createContainerClone = createAsyncThunk(
  "createContainerClone",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}node/cloneContainer`;
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

export const createMigrationContainer = createAsyncThunk(
  "createMigrationContainer",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}node/migrateContainer`;
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

export const createHostMigration = createAsyncThunk(
  "createHostMigration",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}voln/migrateAll`;
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

export const startContainersAction = createAsyncThunk(
  "startContainersAction",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}voln/startAll`;
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

export const stopContainersAction = createAsyncThunk(
  "stopContainersAction",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}voln/stopAll`;
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

//// get команды бэкапа для контейнеров
export const getComandsBacupVM = () => (dispatch) => {
  const socket = socketIOClient(url_socket);
  socket.on("vm-backup", (data) => {
    console.log(data, "data");
    dispatch(viewListResultBackUpFN({ log: [], status: false }));
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

    viewListResultBackUpFN: (state, action) => {
      state.viewListResultBackUp = action.payload;
    },

    setCloneLogs: (state, action) => {
      state.listCloneLogs = action.payload;
    },
    setCollStackData: (state, action) => {
      state.listCallStack = action.payload;
    },
  },

  extraReducers: (builder) => {
    ///////////////////////////// getHistoryActionsReq
    builder.addCase(getHistoryActionsReq.fulfilled, (state, action) => {
      state.preloaderVM = false;
      state.listHistoryAction = action.payload;
    });
    builder.addCase(getHistoryActionsReq.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderVM = false;
      state.listHistoryAction = [];
    });
    builder.addCase(getHistoryActionsReq.pending, (state, action) => {
      state.preloaderVM = true;
    });

    /////////////////////////////// getTypesBackUpReq
    builder.addCase(getTypesBackUpReq.fulfilled, (state, action) => {
      state.preloaderVM = false;
      state.listTypeBackUpContainers.hosts = action.payload?.hosts?.map(
        (item) => {
          return { ...item, value: item?.guid, label: item?.storage_name };
        }
      );
      state.listTypeBackUpContainers.container = action.payload?.container?.map(
        (item) => {
          return { ...item, value: item?.guid, label: item?.storage_name };
        }
      );
      state.listTypeBackUpContainers.vm = action.payload?.vm?.map((item) => {
        return { ...item, value: item?.guid, label: item?.storage_name };
      });
    });

    builder.addCase(getTypesBackUpReq.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderVM = false;
      state.listTypeBackUpContainers = {};
    });
    builder.addCase(getTypesBackUpReq.pending, (state, action) => {
      state.preloaderVM = true;
    });

    //////////////////////////////// getCloneLogs
    builder.addCase(getListBackUpReq.fulfilled, (state, action) => {
      state.preloaderVM = false;
      state.listBackUpContainers = action.payload?.slice(1, 150);
    });
    builder.addCase(getListBackUpReq.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderVM = false;
      state.listBackUpContainers = [];
    });
    builder.addCase(getListBackUpReq.pending, (state, action) => {
      state.preloaderVM = true;
    });

    ////////getCloneLogs
    builder.addCase(getCloneLogs.fulfilled, (state, action) => {
      state.preloaderVM = false;
      state.listCloneLogs = action.payload?.logs?.slice(1, 150);
      state.listCallStack = action.payload?.callStack?.slice(1, 150);
    });
    builder.addCase(getCloneLogs.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderVM = false;
      state.listCloneLogs = [];
    });
    builder.addCase(getCloneLogs.pending, (state, action) => {
      state.preloaderVM = true;
    });
  },
});

export const {
  listStatusVmFN,
  viewListResultBackUpFN,
  setCloneLogs,
  setCollStackData,
} = virtualMachineSlice.actions;

export default virtualMachineSlice.reducer;
