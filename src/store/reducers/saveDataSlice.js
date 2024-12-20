import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";
import { myAlert } from "../../helpers/MyAlert";
const { REACT_APP_API_URL } = process.env;

const initialState = {
  dataSave: { name: "", guid: "", token: "", name: "" },
};

////// logInAccount - логинизация
export const logInAccount = createAsyncThunk(
  "logInAccount",
  async function (props, { dispatch, rejectWithValue }) {
    const { navigate, data } = props;
    const url = `${REACT_APP_API_URL}/ta/login`;
    try {
      const response = await axiosInstance.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        const { result, guid, fio, user_type, token, phone } = response?.data;
        // if (result == 1 && !!guid) {
        //   const obj = { guid, fio, user_type, token };
        //   dispatch(setDataSaveFN({ ...obj, phone }));
        //   navigate("/");
        // } else {
        //   myAlert("Неверный логин или пароль", "error");
        // }
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const saveDataSlice = createSlice({
  name: "saveDataSlice",
  initialState,
  reducers: {
    setDataSaveFN: (state, action) => {
      state.dataSave = action.payload;
    },
    clearDataSaveFN: (state, action) => {
      state.dataSave = { name: "", guid: "", token: "", name: "" };
    },
  },

  extraReducers: (builder) => {
    ////////////// logInAccount
    builder.addCase(logInAccount.fulfilled, (state, action) => {
      state.preloader = false;
    });
    builder.addCase(logInAccount.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      myAlert("Неверный логин или пароль");
    });
    builder.addCase(logInAccount.pending, (state, action) => {
      state.preloader = true;
    });
  },
});
export const { setDataSaveFN, clearDataSaveFN } = saveDataSlice.actions;

export default saveDataSlice.reducer;
