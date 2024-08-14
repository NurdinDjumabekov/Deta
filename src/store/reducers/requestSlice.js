import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import socketIOClient from "socket.io-client";
import axios from "axios";
import { clearDnsList, clearTemporaryDNS, setActiveDns } from "./stateSlice";
import { transformListNetwork } from "../../helpers/transformListNetwork";
import { defaultSubDomen } from "../../helpers/LocalData";
const { REACT_APP_API_URL } = process.env;

const initialState = {
  listHosts: [],
  listNetwork: [],
  listDnsDomen: [],
  listDnsSubDomen: [],
  listProviders: [],
};

const url_socket = "http://217.29.26.222:3633";

////////////////////// mainPage //////////////////////////////

///// getProviders - для получения провайдеров
export const getProviders = createAsyncThunk(
  "getProviders",
  async function (props, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}api/network/getProviders`;
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

export const updatedProvoders = () => (dispatch) => {
  const socket = socketIOClient(url_socket);
  socket.on("updateProviders", ({ data }) => {
    dispatch(setUpdatedProvider(data));
  });
  return () => {
    socket.disconnect();
  };
};

///// getHosts - для получения провайдеров
export const getHosts = createAsyncThunk(
  "getHosts",
  async function (props, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}host/getHostList`;
    try {
      const response = await axios(url);
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

export const updatedHosts = () => (dispatch) => {
  const socket = socketIOClient(url_socket);
  socket.on("updateProviders", ({ data }) => {
    // dispatch(setUpdatedProvider(data));
  });
  return () => {
    socket.disconnect();
  };
};

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

export const updatedNetwork = () => (dispatch) => {
  const socket = socketIOClient(url_socket);
  socket.on("pingStatusUpdate", (data) => {
    // console.log("Получены данные pingStatusUpdate:", data);
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

////////////// domens //////////////

///// addDomens - для добавления доменов
export const addDomens = createAsyncThunk(
  "addDomens",
  async function (props, { dispatch, rejectWithValue }) {
    const { domen_name } = props;

    const url = `${REACT_APP_API_URL}dns/creareDomen`;
    const data = { domen_name };
    try {
      const response = await axios.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        dispatch(getDnsDomen()); //// get все домены
        dispatch(clearTemporaryDNS());
        //// очищаю state для временного хранения dns данных
        const createGuid = response?.data?.guid;

        setTimeout(() => {
          dispatch(setActiveDns(createGuid));
          dispatch(getDnsSubDomen(createGuid));
        }, 500);
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

///// deleteDomen - для удаления доменов
export const deleteDomen = createAsyncThunk(
  "deleteDomen",
  async function (props, { dispatch, rejectWithValue }) {
    const { guidDelete, setGuidDelete } = props;

    const url = `${REACT_APP_API_URL}dns/deleteDomen`;
    const data = { guid: guidDelete };
    try {
      const response = await axios.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        dispatch(getDnsDomen()); //// get все домены
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

// ///// editDomen - для редактирования доменов
// export const editDomen = createAsyncThunk(
//   "editDomen",
//   async function (props, { dispatch, rejectWithValue }) {
//     const {} = props;

//     const url = `${REACT_APP_API_URL}`;
//     const data = { ...objEdit, type_record: 1 }; ///  type_record: 1, chech (dhtvtyyj)
//     try {
//       const response = await axios.post(url, data);
//       if (response.status >= 200 && response.status < 300) {

//         dispatch(getDnsDomen()); //// get все домены
//         dispatch(clearTemporaryDNS());
//         //// очищаю state для временного хранения dns данных
//         const createGuid = response?.data?.guid;

//         setTimeout(() => {
//           dispatch(setActiveDns(createGuid));
//           dispatch(getDnsSubDomen(createGuid));
//         }, 500);
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
    const { setGuidEdit, objEdit, setObjedit, activeDns } = props;

    const url = `${REACT_APP_API_URL}dns/updateSubDomen`;
    const data = { ...objEdit, type_record: 1 }; ///  type_record: 1, chech (dhtvtyyj)
    try {
      const response = await axios.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        dispatch(getDnsSubDomen(activeDns)); /// это guid домена (get list data)
        dispatch(setGuidEdit("")); //// закрываю модалку
        setObjedit(defaultSubDomen); //// очищаю временный
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

    setUpdatedProvider: (state, action) => {
      state.listProviders = action.payload;
    },

    setUpdatedNetwork: (state, action) => {
      const obj = action.payload;
      const list = state.listNetwork;
      state.listNetwork = transformListNetwork(list, obj);
    },
  },
  extraReducers: (builder) => {
    ///////////////////////////// getProviders
    builder.addCase(getProviders.fulfilled, (state, action) => {
      // state.preloader = false;
      state.listProviders = action.payload;
    });
    builder.addCase(getProviders.rejected, (state, action) => {
      state.error = action.payload;
      // state.preloader = false;
    });
    builder.addCase(getProviders.pending, (state, action) => {
      // state.preloader = true;
    });

    ///////////////////////////// getHosts
    builder.addCase(getHosts.fulfilled, (state, action) => {
      // state.preloader = false;
      state.listHosts = action.payload;
    });
    builder.addCase(getHosts.rejected, (state, action) => {
      state.error = action.payload;
      // state.preloader = false;
    });
    builder.addCase(getHosts.pending, (state, action) => {
      // state.preloader = true;
    });

    ///////////////////////////// getNetworks
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

export const { setUpdatedProvider, setListNetwork, setUpdatedNetwork } =
  requestSlice.actions;

export default requestSlice.reducer;
