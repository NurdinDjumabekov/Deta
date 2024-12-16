import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import socketIOClient from "socket.io-client";
import axiosInstance from "../../axiosInstance";
import { myAlert } from "../../helpers/MyAlert";
const { REACT_APP_API_URL } = process.env;
///// todosSlice

const initialState = {
  preloaderTodos: false,
  listTodos: [], /// список задач
  listUsers: [], /// список пользователей
};

///// getTodosReq - get список задач
export const getTodosReq = createAsyncThunk(
  "getTodosReq",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}task/getTasksData`;
    try {
      const response = await axiosInstance(url);
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

//// getListUsersReq - get список пользователей
export const getListUsersReq = createAsyncThunk(
  "getListUsersReq",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}task/users`;
    try {
      const response = await axiosInstance(url);
      if (response.status >= 200 && response.status < 300) {
        return response?.data?.users || [];
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//// crudFolderReq - crud папку для задач
export const crudFolderReq = createAsyncThunk(
  "crudFolderReq",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}task/folders`;
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

//// crudTodosReq - crud задач
export const crudTodosReq = createAsyncThunk(
  "crudTodosReq",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}task/tasks`;
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

//// crudFilesTodosReq - crud файлов в задачи
export const crudFilesTodosReq = createAsyncThunk(
  "crudFilesTodosReq",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}task/files`;
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

//// crudCommentTodosReq - crud файлов в задачи
export const crudCommentTodosReq = createAsyncThunk(
  "crudCommentTodosReq",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}task/comments`;
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

const todosSlice = createSlice({
  name: "todosSlice",
  initialState,
  reducers: {
    listDataSavedFN: (state, action) => {
      state.listDataSaved = action.payload;
    },
  },

  extraReducers: (builder) => {
    ///////////////////////////// getTodosReq
    builder.addCase(getTodosReq.fulfilled, (state, action) => {
      state.preloaderTodos = false;
      state.listTodos = action.payload;
    });
    builder.addCase(getTodosReq.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderTodos = false;
      state.listTodos = [];
    });
    builder.addCase(getTodosReq.pending, (state, action) => {
      state.preloaderTodos = true;
    });

    ///////////////////////////// getListUsersReq
    builder.addCase(getListUsersReq.fulfilled, (state, action) => {
      state.preloaderTodos = false;
      state.listUsers = action.payload?.map((item) => {
        return { label: item?.fio, value: item?.guid };
      });
    });
    builder.addCase(getListUsersReq.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderTodos = false;
      state.listUsers = [];
    });
    builder.addCase(getListUsersReq.pending, (state, action) => {
      state.preloaderTodos = true;
    });
  },
});

export const { listDataSavedFN } = todosSlice.actions;

export default todosSlice.reducer;
