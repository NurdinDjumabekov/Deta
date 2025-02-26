import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import socketIOClient from "socket.io-client";
import { myAlert } from "../../helpers/MyAlert";
import axiosInstance from "../../axiosInstance";
const { REACT_APP_API_URL } = process.env;

const initialState = {
  preloaderContainer: false,
  dataForBackUp: [], //// выборка хранилищ для бэкапа
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
        return response?.data?.res;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getLogBackUp = (guid_vm) => (dispatch) => {
  const socket = socketIOClient(url_socket);
  socket.on(`vm-${guid_vm}-backup`, (data) => {
    console.log(data, "data");
  });

  // Функция для отключения сокета
  return () => socket.disconnect();
};

const actionsContaiersSlice = createSlice({
  name: "actionsContaiersSlice",
  initialState,
  reducers: {
    // setListNetwork: (state, action) => {
    //   state.listNetwork = action.payload;
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
  },
});

export const {} = actionsContaiersSlice.actions;

export default actionsContaiersSlice.reducer;
