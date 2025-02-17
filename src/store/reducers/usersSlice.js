import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import socketIOClient from "socket.io-client";
import axiosInstance from "../../axiosInstance";
import { myAlert } from "../../helpers/MyAlert";
const { REACT_APP_API_URL } = process.env;
///// usersSlice

const initialState = {
  preloaderUsers: false,
  listUserService: [],
};

//// crudUsersServiceReq - crud данных пользователей и сервисов
export const crudUsersServiceReq = createAsyncThunk(
  "crudUsersServiceReq",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}users_service/crud`;
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

//// getUsersServiceReq - get данных пользователей и сервисов
export const getUsersServiceReq = createAsyncThunk(
  "getUsersServiceReq",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}users_service/get_us`;
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

const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    ///////////////////////////// crudUsersServiceReq
    builder.addCase(crudUsersServiceReq.fulfilled, (state, action) => {
      state.preloaderUsers = false;
      state.listTodos = action.payload;
    });
    builder.addCase(crudUsersServiceReq.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderUsers = false;
      state.listTodos = [];
    });
    builder.addCase(crudUsersServiceReq.pending, (state, action) => {
      state.preloaderUsers = true;
    });

    //////////////////////////////// getUsersServiceReq
    builder.addCase(getUsersServiceReq.fulfilled, (state, action) => {
      state.preloaderUsers = false;
      state.listUserService = action.payload;
    });
    builder.addCase(getUsersServiceReq.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderUsers = false;
      state.listUserService = [];
    });
    builder.addCase(getUsersServiceReq.pending, (state, action) => {
      state.preloaderUsers = true;
    });
  },
});

export const { listDataSavedFN } = usersSlice.actions;

export default usersSlice.reducer;
