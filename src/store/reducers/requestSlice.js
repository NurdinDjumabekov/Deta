import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import socketIOClient from "socket.io-client";
import axios from "axios";
import { clearDnsList, setActiveDns } from "./stateSlice";
const { REACT_APP_API_URL } = process.env;

const initialState = {
  listNetwork: [],
  listDnsDomen: [],
  listDnsSubDomen: [],
};

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

///// getDnsDomen - для получения dns доменов
export const getDnsDomen = createAsyncThunk(
  "getDnsDomen",
  async function (props, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}dns/getDomens`;
    try {
      const response = await axios(url);
      if (response.status >= 200 && response.status < 300) {
        const firstGuid = response?.data?.[0]?.guid;
        dispatch(setActiveDns(firstGuid));
        dispatch(getDnsSubDomen(firstGuid));
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

///// addSubDomen - для добавления sub доменов
export const addSubDomen = createAsyncThunk(
  "addSubDomen",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}dns/creareSubDomen`;
    try {
      const response = await axios.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        dispatch(getDnsSubDomen(data?.domen_guid)); /// это guid домена
        dispatch(clearDnsList()); /// очищаю данные всех input для добавления dns
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////////////// domens //////////////

///// deleteDomen - для удаления суб доменов
export const deleteDomen = createAsyncThunk(
  "deleteDomen",
  async function (props, { dispatch, rejectWithValue }) {
    const { guidDelete, setGuidDelete } = props;

    const url = `${REACT_APP_API_URL}dns/deleteDomen`;
    const data = { guid: guidDelete };
    try {
      const response = await axios.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        dispatch(setGuidDelete("")); //// закрываю модалку
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ///// editSubDomen - для редактирования суб доменов
// export const editSubDomen = createAsyncThunk(
//   "editSubDomen",
//   async function (props, { dispatch, rejectWithValue }) {
//     const { guidEdit, setGuidEdit } = props;

//     const url = `${REACT_APP_API_URL}api/ .... guid=${guidEdit}`;
//     try {
//       const response = await axios(url);
//       if (response.status >= 200 && response.status < 300) {
//         console.log(response?.data, "editSubDomen");
//         dispatch(setGuidEdit("")); //// закрываю модалку
//         return response?.data;
//       } else {
//         throw Error(`Error: ${response.status}`);
//       }
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

////////////// sub domens //////////////

///// getDnsSubDomen - для получения dns доменов
export const getDnsSubDomen = createAsyncThunk(
  "getDnsSubDomen",
  async function (guid, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}dns/getSubDomens/${guid}`;
    try {
      const response = await axios(url);
      if (response.status >= 200 && response.status < 300) {
        dispatch(setActiveDns(guid));
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

///// deleteSubDomen - для удаления суб доменов
export const deleteSubDomen = createAsyncThunk(
  "deleteSubDomen",
  async function (props, { dispatch, rejectWithValue }) {
    const { guidDelete, setGuidDelete, activeDns } = props;
    /// guidDelete - guid суб домена
    const url = `${REACT_APP_API_URL}dns/deleteSubDomen`;
    const data = { guid: guidDelete };
    try {
      const response = await axios.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        dispatch(getDnsSubDomen(activeDns)); /// это guid домена
        dispatch(setGuidDelete("")); //// закрываю модалку
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

///// editSubDomen - для редактирования суб доменов
export const editSubDomen = createAsyncThunk(
  "editSubDomen",
  async function (props, { dispatch, rejectWithValue }) {
    const { setGuidEdit, objEdit, detObjedit, activeDns } = props;

    const url = `${REACT_APP_API_URL}dns/updateSubDomen`;
    const data = { ...objEdit, type_record: 1 }; ///  type_record: 1, chech (dhtvtyyj)
    try {
      const response = await axios.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        dispatch(getDnsSubDomen(activeDns)); /// это guid домена (get list data)
        dispatch(setGuidEdit("")); //// закрываю модалку
        detObjedit({}); //// очищаю временный
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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

    ////////////////////////////// getDnsDomen
    builder.addCase(getDnsDomen.fulfilled, (state, action) => {
      // state.preloader = false;
      state.listDnsDomen = action.payload;
    });
    builder.addCase(getDnsDomen.rejected, (state, action) => {
      state.error = action.payload;
      // state.preloader = false;
    });
    builder.addCase(getDnsDomen.pending, (state, action) => {
      // state.preloader = true;
    });

    ////////////////////////////// getDnsSubDomen
    builder.addCase(getDnsSubDomen.fulfilled, (state, action) => {
      // state.preloader = false;
      state.listDnsSubDomen = action.payload;
    });
    builder.addCase(getDnsSubDomen.rejected, (state, action) => {
      state.error = action.payload;
      // state.preloader = false;
    });
    builder.addCase(getDnsSubDomen.pending, (state, action) => {
      // state.preloader = true;
    });

    ////////////////////////////// deleteSubDomen
    builder.addCase(deleteSubDomen.fulfilled, (state, action) => {
      // state.preloader = false;
    });
    builder.addCase(deleteSubDomen.rejected, (state, action) => {
      state.error = action.payload;
      // state.preloader = false;
      // alert("Не удалось удалить!");
    });
    builder.addCase(deleteSubDomen.pending, (state, action) => {
      // state.preloader = true;
    });

    ////////////////////////////// editSubDomen
    builder.addCase(editSubDomen.fulfilled, (state, action) => {
      // state.preloader = false;
    });
    builder.addCase(editSubDomen.rejected, (state, action) => {
      state.error = action.payload;
      // state.preloader = false;
    });
    builder.addCase(editSubDomen.pending, (state, action) => {
      // state.preloader = true;
    });
  },
});

export const { setListNetwork, setUpdatedNetwork } = requestSlice.actions;

export default requestSlice.reducer;
