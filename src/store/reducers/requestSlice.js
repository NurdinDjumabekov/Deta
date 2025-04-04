import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import socketIOClient from "socket.io-client";
import {
  clearAddHost,
  clearTemporaryHosts,
  setActiveContainer,
  setActiveHost,
  setGuidHostDel,
  setGuidHostEdit,
  setOpenAddFiles,
  setOpenAddProvider,
  setOpenModalAddGroup,
  setOpenModalKeyCont,
  setOpenOSModal,
} from "./stateSlice";
import { transformListNetwork } from "../../helpers/transformListNetwork";
import { myAlert } from "../../helpers/MyAlert";
import axiosInstance from "../../axiosInstance";
import { cutNums } from "../../helpers/cutNums";
import { setCloneLogs, setCollStackData } from "./virtualMachineSlice";
import { url_socket } from "../../helpers/LocalData";
const { REACT_APP_API_URL } = process.env;

const initialState = {
  preloader: false,
  listHosts: [],

  ///// containers /////
  listContainers: [],
  countsContainers: {}, //// кол-во вкл, откл. контейнеров
  searchContainer: "",
  diagramsContainer: [], //// для диаграммы хостов на главной странице

  listNetwork: [],
  listOS: [],
  listProviders: [],
  listGroupContainers: [], //// группы контейнеров
  listUsers: [],
  listAccessesUsers: [], //// список клиентов, которым надо дать доступы

  listVolns: {}, //// список волн
};

///// getProviders - для получения провайдеров
export const getProviders = createAsyncThunk(
  "getProviders",
  async function (props, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}network/getProviders`;
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

export const updatedProvoders = () => (dispatch) => {
  const socket = socketIOClient(url_socket);
  socket.on("updateProviders", ({ data }) => {
    dispatch(setUpdatedProvider(data));
  });
  return () => {
    socket.disconnect();
  };
};

export const updatedCloneLogs = () => (dispatch) => {
  const socket = socketIOClient(url_socket);
  socket.on("updateCloneLogs", ({ data, callStack }) => {
    console.log(data, "setCloneLogs");

    dispatch(setCloneLogs(data));
    dispatch(setCollStackData(callStack));
  });
  return () => {
    socket.disconnect();
  };
};

//////////////////////////////////////////////////////////// hosts //////////////

///// getHosts - для получения провайдеров
export const getHosts = createAsyncThunk(
  "getHosts",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `host/getHostList`;
    try {
      const response = await axiosInstance.get(url);
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

///// getOS - для получения операционных систем
export const getOS = createAsyncThunk(
  "getOS",
  async function (props, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}node/getOS`;
    try {
      const response = await axiosInstance(url);
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

///// addHostFN - для добавления хостов //// check
export const addHostFN = createAsyncThunk(
  "addHostFN",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}host/createHost`;
    try {
      const response = await axiosInstance.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        dispatch(clearAddHost()); //// очищаю временные данные для создания хоста
        if (response.data.res == 1) {
          myAlert("Хост добавлен, ожидайте обновление хоста");
        } else if (response.data.res == 2) {
          myAlert("Хост с таким наименованием уже существует", "error");
        } else if (response.data.res == 3) {
          myAlert("Хост с таким ip адресом уже существует", "error");
        } else {
          myAlert("Упс, что-то пошло не так!", "error");
        }
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
  async function (guid, { dispatch, rejectWithValue }) {
    /// guid - guid хоста
    const url = `${REACT_APP_API_URL}host/deleteHost`;
    const data = { guid };
    try {
      const response = await axiosInstance.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        dispatch(getHosts()); /// снова получаю все данные
        dispatch(setGuidHostDel(false)); /// закрываю модалку для удаления хоста
        myAlert("Хост удалён!");
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

///// editHost - для редактирования хостов
export const editHost = createAsyncThunk(
  "editHost",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}host/editHost`;
    ///  data - изменяемы данные хоста
    try {
      const response = await axiosInstance.post(url, data);
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

export const addProvider = createAsyncThunk(
  "addProvider",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}data/addProvider`;
    ///  data - данные провайдера
    try {
      const response = await axiosInstance.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        if (response?.data?.res == 1) {
          myAlert("Данные сохранены");
          dispatch(setOpenAddProvider({})); //// закрываю модалку
          dispatch(getProviders());
        }
        return response?.data?.res;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const crudProvider = createAsyncThunk(
  "crudProvider",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}network/crudProvider`;
    try {
      const response = await axiosInstance.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        if (response?.data?.res == 1) {
          const obj = { 2: "Данные сохранены", 3: "Данные удалены" };
          myAlert(obj?.[data?.actionType]);
          dispatch(setOpenAddProvider({})); //// закрываю модалку
          dispatch(getProviders());
        }
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////////////////////////////////////////////////////////// containers //////////////

///// getContainers - для получения контейнеров c помощью хостов
export const getContainers = createAsyncThunk(
  "getContainers",
  async function (guid, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}host/getHostContainerList`;
    const data = { elemid: guid }; //// guid - хоста
    try {
      const response = await axiosInstance.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        dispatch(setActiveHost(guid));
        dispatch(countsContainersFN(response?.data?.counts));
        //// подставляю кол-ва вкл и откл контейнеров
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

///// getContainersInMenu - для получения контейнеров c помощью сервисов и пользователей
export const getContainersInMenu = createAsyncThunk(
  "getContainersInMenu",
  async function (props, { dispatch, rejectWithValue }) {
    const { guid_host, guid_service, guid_user } = props;
    const url = `${REACT_APP_API_URL}host/filterByUserService`;
    const data = { guid_host, guid_service, guid_user }; //// guid - хоста
    try {
      const response = await axiosInstance.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        dispatch(setActiveHost("")); //// очищаю активный хост
        dispatch(setActiveContainer(0)); ///очищаю активный контейнер
        //// подставляю данные для меню чтобы узнать кол-во контейнеров
        dispatch(countsContainersFN(response?.data?.counts));
        //// подставляю кол-ва вкл и откл контейнеров
        return response?.data?.result;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

///// getDiagramsContainers - для получения контейнеров c помощью сервисов и пользователей
export const getDiagramsContainers = createAsyncThunk(
  "getDiagramsContainers",
  async function (guid_vm, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}host/getVmDiagramData`;
    const data = { guid_vm }; //// guid - контейнерв

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

///// searchContainers - для получения контейнеров c помощью сервисов и пользователей
export const searchContainers = createAsyncThunk(
  "searchContainers",
  async function (text, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}host/search?searchText=${text}`;
    try {
      const response = await axiosInstance(url);
      if (response.status >= 200 && response.status < 300) {
        dispatch(setActiveHost("")); //// очищаю активный хост
        dispatch(setActiveContainer(0)); ///очищаю активный контейнер
        return response?.data?.result;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

///// addContainersFN - добавление контейнеров
export const addContainersFN = createAsyncThunk(
  "addContainersFN",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}host/+++++++++++++++++++`;
    ///  data - добавляемые данные хоста
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

///// editVmOS_req - добавление ОС контейнеров
export const editVmOS_req = createAsyncThunk(
  "editVmOS_req",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}node/updateVmOc`;
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

///// getFilesInContainer - get файлов каждого контейнера
export const getFilesInContainer = createAsyncThunk(
  "getFilesInContainer",
  async function (guid, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}node/getvmFiles?guid_vm=${guid}`;
    try {
      const response = await axiosInstance(url);
      if (response.status >= 200 && response.status < 300) {
        ///// очищаю временное хранение данных контейнеров
        dispatch(setOpenAddFiles({ guid, files: response?.data?.files }));
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

///// addDelFileInContainer - добавление и удаление файлов в контейнера
export const addDelFileInContainer = createAsyncThunk(
  "addDelFileInContainer",
  async function (props, { dispatch, rejectWithValue }) {
    const { data, guid_container } = props;
    const url = `${REACT_APP_API_URL}node/sendDellFile`;
    try {
      const response = await axiosInstance.post(url, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status >= 200 && response.status < 300) {
        dispatch(getFilesInContainer(guid_container));
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

///// addGroupContFN - добавление контейнера в группу
export const addGroupContFN = createAsyncThunk(
  "addGroupContFN",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}node/updateUserOrGroupPermissions`;
    try {
      const response = await axiosInstance.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        dispatch(setOpenModalAddGroup(""));
        /// очищаю данные для закрытия модалки
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

///// fixTimeCreateCont - фиксирование времени создания контейнера
export const fixTimeCreateCont = createAsyncThunk(
  "fixTimeCreateCont",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}node/createTimeMark`;
    try {
      const response = await axiosInstance.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        myAlert("Время зафиксировано");
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

///// getDataAcceptUsers - get данные доступов для пользователей и обычный список польз-лей
export const getDataAcceptUsers = createAsyncThunk(
  "getDataAcceptUsers",
  async function (guid, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}node/getAccept?guid_vm=${guid}`;
    try {
      const response = await axiosInstance(url);
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

//// editAccessesUsersFN - смена доступов отображения контейнеров клиентам и смена групп
export const editAccessesUsersFN = createAsyncThunk(
  "editAccessesUsersFN",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}node/updateUserOrGroupPermissions`;
    try {
      const response = await axiosInstance.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        myAlert("Данные сохранены");
        dispatch(setOpenModalKeyCont(""));
        /// закрываю модалку и очищаю данные для временного хранения данных для смены доступов отображения контейнеров клиентам
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////////////////////////////////////////////////////////// volns //////////////

///// getVolns - для получения волн определенного хоста
export const getVolns = createAsyncThunk(
  "getVolns",
  async function (guid, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}host/+++++++++++++++`;
    const data = { guid }; //// guid - хоста

    // try {
    //   const response = await axiosInstance.post(url, data);
    //   if (response.status >= 200 && response.status < 300) {

    //     return response?.data;
    //   } else {
    //     throw Error(`Error: ${response.status}`);
    //   }
    // } catch (error) {
    //   return rejectWithValue(error.message);
    // }
  }
);

////////////////////////////////////////////////////////// сети //////////////

///// getNetworks - для получения сетей
export const getNetworks = createAsyncThunk(
  "getNetworks",
  async function (props, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}network/getallIpList`;
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

export const updatedNetwork = () => (dispatch) => {
  const socket = socketIOClient(url_socket);
  socket.on("pingStatusUpdate", (data) => {
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

    setUpdatedProvider: (state, action) => {
      state.listProviders = action.payload;
    },

    countsContainersFN: (state, action) => {
      state.countsContainers = action.payload;
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

    clearListHostsFN: (state, action) => {
      state.listHosts = [];
    },

    ///// поиск котейнеров
    setSearchContainer: (state, action) => {
      state.searchContainer = action.payload;
    },

    setListAccessesUsers: (state, action) => {
      state.listAccessesUsers = action.payload;
    },

    setListVolns: (state, action) => {
      state.listVolns = action.payload;
    },

    clearMainPage: (state, action) => {
      state.listHosts = [];
      state.listContainers = [];
      state.countsContainers = {};
      state.diagramsContainer = [];
      state.dataForBackUp = [];
    },
  },

  extraReducers: (builder) => {
    ///////////////////////////// getProviders
    builder.addCase(getProviders.fulfilled, (state, action) => {
      state.preloader = false;
      state.listProviders = action.payload?.map((item) => {
        return {
          ...item,
          value: item?.provider_gateway,
          label: item?.provider_gateway,
        };
      });
    });
    builder.addCase(getProviders.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getProviders.pending, (state, action) => {
      state.preloader = true;
    });

    ///////////////////////////// getHosts
    builder.addCase(getHosts.fulfilled, (state, action) => {
      state.preloader = false;
      state.listHosts = action.payload?.map((i) => {
        return { ...i, value: i?.guid, label: i?.node_name };
      });
    });
    builder.addCase(getHosts.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      state.listHosts = [];
    });
    builder.addCase(getHosts.pending, (state, action) => {
      state.preloader = true;
    });

    ////////////////////////////// getOS
    builder.addCase(getOS.fulfilled, (state, action) => {
      state.preloader = false;
      state.listOS = action.payload;
    });
    builder.addCase(getOS.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getOS.pending, (state, action) => {
      state.preloader = true;
    });

    ///////////////////////////// editHost
    builder.addCase(editHost.fulfilled, (state, action) => {
      state.preloader = false;
      const obj = action.payload;
      state.listHosts = state.listHosts?.map((item) =>
        item?.guid == obj?.guid ? obj : item
      );
    });
    builder.addCase(editHost.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(editHost.pending, (state, action) => {
      state.preloader = true;
    });

    ///////////////////////////// getContainers
    builder.addCase(getContainers.fulfilled, (state, action) => {
      state.preloader = false;
      state.listVolns = {
        clear: [],
        active: action.payload?.active?.map((i) => ({ ...i, bool: 0 })),
        diactive: action.payload?.diactive?.map((i) => ({ ...i, bool: 0 })),
      };
      state.listContainers = action.payload?.result;
    });
    builder.addCase(getContainers.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      state.listContainers = [];
      myAlert("Ошибка, не удалось загрузить данные!", "error");
    });
    builder.addCase(getContainers.pending, (state, action) => {
      state.preloader = true;
    });

    ///////////////////////////// getContainersInMenu
    builder.addCase(getContainersInMenu.fulfilled, (state, action) => {
      state.preloader = false;
      state.listContainers = action.payload;
    });
    builder.addCase(getContainersInMenu.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getContainersInMenu.pending, (state, action) => {
      state.preloader = true;
    });

    ///////////////////////////// getDiagramsContainers
    builder.addCase(getDiagramsContainers.fulfilled, (state, action) => {
      state.preloader = false;
      state.diagramsContainer = action.payload?.map((item) => {
        return {
          time: item?.date_system,
          CPU: item?.vm_cpu_usage,
          RAM: item?.vm_ram_usage_mb,
          vm_ram_mb: cutNums(+item?.vm_ram_mb / 1024, 2),
        };
      });
    });
    builder.addCase(getDiagramsContainers.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getDiagramsContainers.pending, (state, action) => {
      state.preloader = true;
    });

    ///////////////////////////// searchContainers
    builder.addCase(searchContainers.fulfilled, (state, action) => {
      state.preloader = false;
      state.listContainers = action.payload;
    });
    builder.addCase(searchContainers.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(searchContainers.pending, (state, action) => {
      state.preloader = true;
    });

    ////////////////////////////// getFilesInContainer
    builder.addCase(getFilesInContainer.fulfilled, (state, action) => {
      state.preloader = false;
    });
    builder.addCase(getFilesInContainer.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getFilesInContainer.pending, (state, action) => {
      state.preloader = true;
    });

    ///////////////////////////// getVolns
    builder.addCase(getVolns.fulfilled, (state, action) => {
      state.preloader = false;
      state.listVolns = action.payload;
    });
    builder.addCase(getVolns.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getVolns.pending, (state, action) => {
      state.preloader = true;
    });

    ///////////////////////////// getNetworks
    builder.addCase(getNetworks.fulfilled, (state, action) => {
      state.preloader = false;
      state.listNetwork = action.payload;
    });
    builder.addCase(getNetworks.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getNetworks.pending, (state, action) => {
      state.preloader = true;
    });

    /////////////////////////////// getDataAcceptUsers
    builder.addCase(getDataAcceptUsers.fulfilled, (state, action) => {
      state.preloader = false;
      state.listAccessesUsers = action.payload?.users || [];
      state.listUsers = action.payload?.services || [];
    });
    builder.addCase(getDataAcceptUsers.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getDataAcceptUsers.pending, (state, action) => {
      state.preloader = true;
    });
  },
});

export const {
  setUpdatedProvider,
  setListNetwork,
  setUpdatedNetwork,
  setUpdatedHost,
  setSearchContainer,
  setListAccessesUsers,
  setListVolns,
  countsContainersFN,
  clearListHostsFN,
  clearMainPage,
} = requestSlice.actions;

export default requestSlice.reducer;
