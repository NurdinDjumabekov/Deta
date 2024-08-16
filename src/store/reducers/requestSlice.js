import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import socketIOClient from "socket.io-client";
import axios from "axios";
import {
  clearAddHost,
  clearDnsList,
  clearTemporaryContainer,
  clearTemporaryDNS,
  clearTemporaryHosts,
  setActiveDns,
  setActiveHost,
  setGuidHostEdit,
} from "./stateSlice";
import { transformListNetwork } from "../../helpers/transformListNetwork";
import { defaultSubDomen } from "../../helpers/LocalData";
const { REACT_APP_API_URL } = process.env;

const initialState = {
  listHosts: [],

  ///// containers /////
  listContainers: [],
  searchContainer: "",

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

////////////////////////////////////////////////////////// hosts

///// getHosts - для получения провайдеров
export const getHosts = createAsyncThunk(
  "getHosts",
  async function (props, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}host/getHostList`;
    try {
      const response = await axios(url);
      if (response.status >= 200 && response.status < 300) {
        const first = response?.data?.[0]?.guid;
        dispatch(setActiveHost(first));
        dispatch(getContainers(first));
        /// подставляю первый хост чтобы он был активный
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

///// addHostFN - для редактирования суб доменов
export const addHostFN = createAsyncThunk(
  "addHostFN",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}host/createHost`;
    ///  data - новые добавляемые данные хоста
    try {
      const response = await axios.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        console.log(response?.data, "response?.data");
        dispatch(clearAddHost()); //// очищаю временные данные для создания хоста

        const guid = response?.data?.[0]; //// guid нового созданного хоста
        dispatch(setActiveHost(guid)); /// для того чтобы сделать активным созданный хост
        dispatch(getContainers(guid)); /// для того чтобы взять контейнера созданного хоста
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////// для моментального обновления хоста
export const updatedHosts = () => (dispatch) => {
  const socket = socketIOClient(url_socket);
  socket.on("asdas", ({ data }) => {
    dispatch(setUpdatedHost(data));
  });
  return () => {
    socket.disconnect();
  };
};

///// deleteSubDomen - для удаления суб доменов
export const deleteHost = createAsyncThunk(
  "deleteSubDomen",
  async function (props, { dispatch, rejectWithValue }) {
    const { guidDelete, setGuidDelete, activeDns } = props;
    /// guidDelete - guid суб домена
    const url = `${REACT_APP_API_URL}dns/1231231231`;
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

///// editHost - для редактирования суб доменов
export const editHost = createAsyncThunk(
  "editHost",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}host/editHost`;
    ///  data - изменяемы данные хоста
    try {
      const response = await axios.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        dispatch(clearTemporaryHosts()); ///// очищаю временное хранение данных хоста
        dispatch(setGuidHostEdit("")); //// закрываю модалку
        return response?.data?.[0];
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////////////////////////////////////////////////////////// containers

///// getContainers - для получения контейнеров
export const getContainers = createAsyncThunk(
  "getContainers",
  async function (guid, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}host/getHostContainerList`;
    const data = { vawe: "1", elemid: guid }; //// guid - хоста

    try {
      const response = await axios.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        dispatch(setActiveHost(guid));
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

///// editContainers - для редактирования контейнеров
export const editContainers = createAsyncThunk(
  "editContainers",
  async function ({ activeHost, data }, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}host/editContainer`;
    ///  data - изменяемы данные хоста
    try {
      const response = await axios.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        dispatch(getContainers(activeHost));
        //// guid активного хоста

        dispatch(clearTemporaryContainer());
        ///// очищаю временное хранение данных контейнеров
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////////////////////////////////////////////////////////// сети

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

    setUpdatedHost: (state, action) => {
      const obj = action.payload;
      state.listHosts = state.listHosts?.map((item) =>
        item?.guid === obj?.guid ? { ...item, ...obj } : item
      );
    },

    ///// поиск котейнеров
    setSearchContainer: (state, action) => {
      state.searchContainer = action.payload;
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

    ///////////////////////////// addHostFN
    builder.addCase(addHostFN.fulfilled, (state, action) => {
      // state.preloader = false;
      const obj = action.payload;
      state.listHosts = state.listHosts?.map((item) =>
        item?.guid == obj?.guid ? obj : item
      );
    });
    builder.addCase(addHostFN.rejected, (state, action) => {
      state.error = action.payload;
      // state.preloader = false;
    });
    builder.addCase(addHostFN.pending, (state, action) => {
      // state.preloader = true;
    });

    ///////////////////////////// editHost
    builder.addCase(editHost.fulfilled, (state, action) => {
      // state.preloader = false;
      const obj = action.payload;
      state.listHosts = state.listHosts?.map((item) =>
        item?.guid == obj?.guid ? obj : item
      );
    });
    builder.addCase(editHost.rejected, (state, action) => {
      state.error = action.payload;
      // state.preloader = false;
    });
    builder.addCase(editHost.pending, (state, action) => {
      // state.preloader = true;
    });

    ///////////////////////////// getContainers
    builder.addCase(getContainers.fulfilled, (state, action) => {
      // state.preloader = false;
      state.listContainers = action.payload?.result;
    });
    builder.addCase(getContainers.rejected, (state, action) => {
      state.error = action.payload;
      // state.preloader = false;
    });
    builder.addCase(getContainers.pending, (state, action) => {
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

export const {
  setUpdatedProvider,
  setListNetwork,
  setUpdatedNetwork,
  setUpdatedHost,
  setSearchContainer,
} = requestSlice.actions;

export default requestSlice.reducer;
