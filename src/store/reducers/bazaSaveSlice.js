import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import socketIOClient from "socket.io-client";
import axiosInstance from "../../axiosInstance";
import { myAlert } from "../../helpers/MyAlert";
const { REACT_APP_API_URL } = process.env;
///// bazaSaveSlice

const initialState = {
  preloadeкBaza: false,
  listDataSaved: [], /// список баз и хранилищ
};

const url_socket = "https://dd-api.ibm.kg";

///// getSaveDataReq - get базы и хранилища
export const getSaveDataReq = createAsyncThunk(
  "getSaveDataReq",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}database/getDataBaseAndStorages`;
    try {
      const response = await axiosInstance(url);
      if (response.status >= 200 && response.status < 300) {
        return response?.data?.databases;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

///// crudDataBasesReq - crud базы и хранилища
export const crudDataBasesReq = createAsyncThunk(
  "crudDataBasesReq",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}database/createUpdateDataBaseStorage`;
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

export const updatedDataBasesSIO = () => (dispatch) => {
  const socket = socketIOClient(url_socket);
  socket.on("updatedDataBasesSIO", (data) => {
    dispatch(listDataSavedFN(data?.data));
  });

  // Функция для отключения сокета
  return () => socket.disconnect();
};

const bazaSaveSlice = createSlice({
  name: "bazaSaveSlice",
  initialState,
  reducers: {
    listDataSavedFN: (state, action) => {
      state.listDataSaved = action.payload;
    },
  },

  extraReducers: (builder) => {
    ///////////////////////////// getSaveDataReq
    builder.addCase(getSaveDataReq.fulfilled, (state, action) => {
      state.preloader = false;
      state.listDataSaved = action.payload;
    });
    builder.addCase(getSaveDataReq.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      state.listDataSaved = [];
    });
    builder.addCase(getSaveDataReq.pending, (state, action) => {
      state.preloader = true;
    });
  },
});

export const { listDataSavedFN } = bazaSaveSlice.actions;

export default bazaSaveSlice.reducer;
