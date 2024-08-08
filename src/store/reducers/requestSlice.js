import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import socketIOClient from "socket.io-client";
import axios from "axios";
const { REACT_APP_API_URL } = process.env;

const initialState = { listNetwork: [] };

const url_socket = "http://217.29.26.222:3633";

export const getHosts = createAsyncThunk(
  "getHosts",
  async function (props, { rejectWithValue }) {
    const { dataLogin } = props;

    // return new Promise((resolve, reject) => {
    //   // Отправка данных для логина через WebSocket
    //   socket.emit("gethosts", dataLogin);

    //   // Установка обработчика для получения ответа
    //   const handleResponse = (response) => {
    //     console.log(response); // Вывод ответа в консоль
    //     resolve(response);
    //   };

    //   // Установка обработчика для ошибок
    //   const handleError = (error) => {
    //     console.error(error.message); // Вывод ошибки в консоль
    //     rejectWithValue(error.message);
    //     reject(error.message);
    //   };

    //   // Подписка на события
    //   socket.on("gethosts", handleResponse);
    //   socket.on("error", handleError);

    //   // Удаление обработчиков при завершении
    //   return () => {
    //     socket.off("gethosts", handleResponse);
    //     socket.off("error", handleError);
    //   };
    // });
  }
);

///// getNetworks - для получения сетей
export const getNetworks = createAsyncThunk(
  "getNetworks",
  async function (props, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}api/network/getallIpList`;
    try {
      const response = await axios(url);
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

export const updatedNetwork = (listNetwork) => (dispatch) => {
  const socket = socketIOClient(url_socket);
  socket.on("pingStatusUpdate", (data) => {
    console.log("Получены данные pingStatusUpdate:", data);
    dispatch(setUpdatedNetwork(data));
  });

  // Функция для отключения сокета
  return () => {
    socket.disconnect();
  };
};

const requestSlice = createSlice({
  name: "requestSlice",
  initialState,
  reducers: {
    setListNetwork: (state, action) => {
      state.listNetwork = action.payload;
    },
    setUpdatedNetwork: (state, action) => {
      state.listNetwork = state?.listNetwork?.map((i) => {
        i?.ips?.map((j) => {
          if (j.guid === action.payload.guid) {
            return { ...j, ...action.payload };
          } else {
            return j;
          }
        });
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNetworks.fulfilled, (state, action) => {
      // state.preloader = false;
      state.listNetwork = action.payload;
    });
    builder.addCase(getNetworks.rejected, (state, action) => {
      state.error = action.payload;
      // state.preloader = false;
    });
    builder.addCase(getNetworks.pending, (state, action) => {
      // state.preloader = true;
    });
  },
});
export const { setListNetwork, setUpdatedNetwork } = requestSlice.actions;

export default requestSlice.reducer;
