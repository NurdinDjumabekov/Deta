import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import io from "socket.io-client";

const initialState = {
  aaa: "",
};

const socket = io("http://dccs.ibm.kg"); // Замените URL на ваш

export const getHosts = createAsyncThunk(
  "getHosts",
  async function (props, { rejectWithValue }) {
    const { dataLogin } = props;

    return new Promise((resolve, reject) => {
      // Отправка данных для логина через WebSocket
      socket.emit("gethosts", dataLogin);

      // Установка обработчика для получения ответа
      const handleResponse = (response) => {
        console.log(response); // Вывод ответа в консоль
        resolve(response);
      };

      // Установка обработчика для ошибок
      const handleError = (error) => {
        console.error(error.message); // Вывод ошибки в консоль
        rejectWithValue(error.message);
        reject(error.message);
      };

      // Подписка на события
      socket.on("gethosts", handleResponse);
      socket.on("error", handleError);

      // Удаление обработчиков при завершении
      return () => {
        socket.off("gethosts", handleResponse);
        socket.off("error", handleError);
      };
    });
  }
);

const requestSlice = createSlice({
  name: "requestSlice",
  initialState,
  reducers: {
    changeTokenA: (state, action) => {
      state.aaa = action.payload;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(deleteSoldProd.fulfilled, (state, action) => {
    //   state.preloader = false;
    // });
    // builder.addCase(deleteSoldProd.rejected, (state, action) => {
    //   state.error = action.payload;
    //   state.preloader = false;
    //   alert("Упс, что-то пошло не так! Не удалось удалить...");
    // });
    // builder.addCase(deleteSoldProd.pending, (state, action) => {
    //   state.preloader = true;
    // });
  },
});
export const { changeTokenA } = requestSlice.actions;

export default requestSlice.reducer;
