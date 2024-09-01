import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import socketIOClient from "socket.io-client";
import axios from "axios";
import {
  changeMenuInner,
  clearAddHost,
  clearDnsList,
  clearOpenModalBackUp,
  clearTemporaryContainer,
  clearTemporaryDNS,
  clearTemporaryHosts,
  setActiveContainer,
  setActiveDns,
  setActiveHost,
  setDistributeIpModal,
  setGuidHostDel,
  setGuidHostEdit,
  setListDiagrams,
  setOpenModaDelCont,
  setOpenModaDelGroup,
  setOpenModalAddGroup,
  setOpenModalKeyCont,
} from "./stateSlice";
import { transformListNetwork } from "../../helpers/transformListNetwork";
import { defaultSubDomen } from "../../helpers/LocalData";
import { myAlert } from "../../helpers/MyAlert";
import { tranformKey } from "../../helpers/tranformTextInNum";
const { REACT_APP_API_URL } = process.env;

const initialState = {
  listHosts: [],

  ///// containers /////
  listContainers: [],
  searchContainer: "",
  diagramsContainer: [], //// для диаграммы хостов на главной странице
  dataForBackUp: {}, //// выборка данных для бэкапа

  listNetwork: [],
  listDnsDomen: [],
  listDnsSubDomen: [],
  listProviders: [],
  listGroupContainers: [], //// группы контейнеров
  listUsers: [],

  listAccessesUsers: [], //// список клиентов, которым надо дать доступы

  listVolns: {}, //// список волн
};

const url_socket = "http://217.29.26.222:3633";

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

//////////////////////////////////////////////////////////// hosts //////////////

///// getHosts - для получения провайдеров
export const getHosts = createAsyncThunk(
  "getHosts",
  async function (props, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}host/getHostList`;
    try {
      const response = await axios(url);
      if (response.status >= 200 && response.status < 300) {
        const first = response?.data?.[0]?.guid;
        const chart = response?.data?.[0]?.chart;
        dispatch(setActiveHost(first));
        dispatch(getContainers(first));
        /// подставляю первый хост чтобы он был активный

        dispatch(setListDiagrams(chart)); //// для диаграммы хостов
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

///// getGroup - для получения групп где хранятся контейнера
export const getGroup = createAsyncThunk(
  "getGroup",
  async function (props, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}++++++++++`;
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
  async function (guid, { dispatch, rejectWithValue }) {
    /// guid - guid хоста
    const url = `${REACT_APP_API_URL}host/deleteHost`;
    const data = { guid };
    try {
      const response = await axios.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        dispatch(getHosts()); /// снова получаю все данные
        dispatch(setGuidHostDel(false)); /// закрываю модалку для удаления хоста
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

////////////////////////////////////////////////////////// containers //////////////

///// getContainers - для получения контейнеров c помощью хостов
export const getContainers = createAsyncThunk(
  "getContainers",
  async function (guid, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}host/getHostContainerList`;
    const data = { vawe: "1", elemid: guid }; //// guid - хоста

    try {
      const response = await axios.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        dispatch(setActiveHost(guid));

        const record = response?.data?.usersAndService?.record;
        const result = response?.data?.usersAndService?.result;

        const objResult = { id: 2, list: tranformKey("service", result) };
        dispatch(changeMenuInner(objResult));

        const objRecord = { id: 3, list: tranformKey("user", record) };
        dispatch(changeMenuInner(objRecord));
        //// подставляю данные для меню чтобы узнать кол-во контейнеров

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
      const response = await axios.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        dispatch(setActiveHost("")); //// очищаю активный хост
        dispatch(setActiveContainer(0)); ///очищаю активный контейнер
        //// подставляю данные для меню чтобы узнать кол-во контейнеров
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
      const response = await axios.post(url, data);
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

///// getDataForBackUp - для получения данных для бэкапа
export const getDataForBackUp = createAsyncThunk(
  "getDataForBackUp",
  async function (props, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}node/getBackUpData`;
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

///// searchContainers - для получения контейнеров c помощью сервисов и пользователей
export const searchContainers = createAsyncThunk(
  "searchContainers",
  async function (text, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}host/search?searchText=${text}`;
    try {
      const response = await axios(url);
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
      const response = await axios.post(url, data);
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

///// editContainers - редактирование контейнеров
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

///// editContainerOS - добавление ОС контейнеров
export const editContainerOS = createAsyncThunk(
  "editContainerOS",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}host/+++++++++++++++`;
    try {
      const response = await axios.post(url, data);
      if (response.status >= 200 && response.status < 300) {
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

///// addFileInContainer - добавление файлов в контейнера
export const addFileInContainer = createAsyncThunk(
  "addFileInContainer",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}host/+++++++++++++++`;
    try {
      const response = await axios.post(url, data);
      if (response.status >= 200 && response.status < 300) {
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
    const url = `${REACT_APP_API_URL}+++++++++++++++`;
    try {
      const response = await axios.post(url, data);
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

//// delGroupContainerFN - удаление контейнера с группы
export const delGroupContainerFN = createAsyncThunk(
  "delGroupContainerFN",
  async function (guid, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}+++++++++++++++${guid}`;
    try {
      const response = await axios(url);
      if (response.status >= 200 && response.status < 300) {
        dispatch(setOpenModaDelGroup("")); /// закрываю модалку
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
    const url = `${REACT_APP_API_URL}+++++++++++++++`;
    myAlert("Время зафиксировано");
    try {
      const response = await axios.post(url, data);
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

//// offContainerFN - выключения контейнера
export const offContainerFN = createAsyncThunk(
  "offContainerFN",
  async function (guid, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}+++++++++++++++${guid}`;
    try {
      const response = await axios(url);
      if (response.status >= 200 && response.status < 300) {
        dispatch(setOpenModaDelGroup("")); /// закрываю модалку
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//// backUpContainerFN - бэкап контейнера
export const backUpContainerFN = createAsyncThunk(
  "backUpContainerFN",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}+++++++++++++++`;
    try {
      const response = await axios.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        dispatch(clearOpenModalBackUp());
        /// закрываю модалку и очищаю данные для временного хранения данных бэкапа
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//// editAccessesUsersFN - смена доступов отображения контейнеров клиентам
export const editAccessesUsersFN = createAsyncThunk(
  "editAccessesUsersFN",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}+++++++++++++++`;
    try {
      const response = await axios.post(url, data);
      if (response.status >= 200 && response.status < 300) {
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

//// delContainerFN - удаление контейнера
export const delContainerFN = createAsyncThunk(
  "delContainerFN",
  async function (guid, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}+++++++++++++++${guid}`;
    try {
      const response = await axios(url);
      if (response.status >= 200 && response.status < 300) {
        dispatch(setOpenModaDelCont("")); /// закрываю модалку
        return response?.data;
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
    //   const response = await axios.post(url, data);
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
        const guid = response?.data?.[0]?.guid;
        const name = response?.data?.[0]?.domen_name;

        dispatch(setActiveDns({ guid, name }));
        ///// подставляю в state для активного guid
        dispatch(getDnsSubDomen({ guid, domen_name: name }));
        // //// отправдяю guid для получения суб доменов определенного домена
        // dispatch(setPastDnsInSubDomen(`.${name}`));
        // // //// подставляю домен в поля суб доменов

        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////////////////////////////////////////////////////////// domens //////////////

///// addDomens - для добавления доменов
export const addDomens = createAsyncThunk(
  "addDomens",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}dns/creareDomen`;
    try {
      const response = await axios.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        const guid = response?.data?.guid;

        if (!!!guid) {
          myAlert("Такой домен уже существует!");
        } else {
          dispatch(getDnsDomen()); //// get все домены
          dispatch(clearTemporaryDNS());
          //// очищаю state для временного хранения dns данных
          setTimeout(() => {
            dispatch(setActiveDns({ guid, name: data?.domen_name }));
            dispatch(getDnsSubDomen({ guid, domen_name: data?.domen_name }));
            myAlert("Домен успешно добавлен!");
          }, 200);
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
//           dispatch(setActiveDns(createGuid)); check check
//           dispatch(getDnsSubDomen(createGuid));  check check
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

////
////
////
////

////////////////////////////////////////////////////////// sub domens //////////////

///// getDnsSubDomen - для получения субдоменов
export const getDnsSubDomen = createAsyncThunk(
  "getDnsSubDomen",
  async function ({ guid, domen_name }, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}dns/getSubDomens/${guid}`;
    try {
      const response = await axios(url);
      if (response.status >= 200 && response.status < 300) {
        dispatch(setActiveDns({ guid, name: domen_name }));
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

///// sortSubDomen - для сортировки sub доменов
export const sortSubDomen = createAsyncThunk(
  "sortSubDomen",
  async function (props, { dispatch, rejectWithValue }) {
    const { domen_guid, sort, field_name } = props;
    const url = `${REACT_APP_API_URL}dns/sortingSubDomens`;
    const data = { domen_guid, sort, field_name };

    try {
      const response = await axios.post(url, data);
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

///// addSubDomen - для добавления sub доменов
export const addSubDomen = createAsyncThunk(
  "addSubDomen",
  async function (props, { dispatch, rejectWithValue }) {
    console.log(props, "props");
    const { name, ...data } = props;
    const url = `${REACT_APP_API_URL}dns/creareSubDomen`;
    try {
      const response = await axios.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        const alreadyCreate = response?.data?.alreadyCreate;
        if (alreadyCreate) {
          myAlert("Такой субдомен уже существует!");
        } else {
          const obj = { guid: data?.domen_guid, domen_name: name };
          dispatch(getDnsSubDomen(obj)); /// это guid домена
          dispatch(clearDnsList()); /// очищаю данные всех input для добавления dns
          myAlert("Субдомен успешно добавлен!");

          // dispatch(setPastDnsInSubDomen(`.${name}`));
          ////// подставляю домен в поля суб доменов
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
        dispatch(getDnsSubDomen({ ...activeDns, domen_name: activeDns?.name }));
        /// это guid домена (get list data)
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

    const record_name = `${objEdit?.record_name}.${activeDns?.name}`;

    const url = `${REACT_APP_API_URL}dns/updateSubDomen`;
    const data = { ...objEdit, type_record: 1, record_name }; ///  type_record: 1, chech (dhtvtyyj)
    try {
      const response = await axios.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        dispatch(getDnsSubDomen({ ...activeDns, domen_name: activeDns?.name }));
        /// это guid домена (get list data)
        dispatch(setGuidEdit("")); //// закрываю модалку
        setObjedit(defaultSubDomen); //// очищаю временный state
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

///// confirmStatusSubDomenFN - для для изменения статуса добавленных доменов
export const confirmStatusSubDomenFN = createAsyncThunk(
  "confirmStatusSubDomenFN",
  async function (props, { dispatch, rejectWithValue }) {
    const { guid, name } = props;
    const data = { guid_domen: guid };
    const url = `${REACT_APP_API_URL}dns/saveSettings`;
    try {
      const response = await axios.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        dispatch(getDnsSubDomen({ guid, domen_name: name }));
        /// это guid домена (get list data)

        myAlert("Изменения внесены!");
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

///// changeIpProviders для смены одног0 провайдера на другой
export const changeIpProviders = createAsyncThunk(
  "changeIpProviders",
  async function (props, { dispatch, rejectWithValue }) {
    const { objIP, setObjIP, activeDns } = props;
    const data = { ...objIP, domen_guid: activeDns?.guid };
    const url = `${REACT_APP_API_URL}dns/undateIpInsurance`;

    try {
      const response = await axios.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        setObjIP({ from: "", to: "" }); //// очишаю state
        dispatch(getDnsSubDomen({ ...activeDns, domen_name: activeDns?.name }));
        myAlert("Изменения внесены!");
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

///// returnIpProviders для смены одног0 провайдера на другой
export const returnIpProviders = createAsyncThunk(
  "returnIpProviders",
  async function (activeDns, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}dns/returnIpInsurance?domen_guid=${activeDns?.guid}`;
    const data = { domen_guid: activeDns?.guid };
    try {
      const response = await axios.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        dispatch(getDnsSubDomen({ ...activeDns, domen_name: activeDns?.name }));
        myAlert("Изменения внесены!");
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

///// distributeIpAddresFN для смены одног0 провайдера на другой
export const distributeIpAddresFN = createAsyncThunk(
  "distributeIpAddresFN",
  async function (activeDns, { dispatch, rejectWithValue }) {
    const data = { domen_guid: activeDns?.guid };
    const url = `${REACT_APP_API_URL}dns/distributeIp`;

    try {
      const response = await axios.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        dispatch(setDistributeIpModal()); /// закрываю модалку подтверждения
        dispatch(getDnsSubDomen({ ...activeDns, domen_name: activeDns?.name }));
        myAlert("Изменения внесены!");
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

    setListAccessesUsers: (state, action) => {
      state.listAccessesUsers = action.payload;
    },

    setListVolns: (state, action) => {
      state.listVolns = action.payload;
    },
  },

  extraReducers: (builder) => {
    ///////////////////////////// getProviders
    builder.addCase(getProviders.fulfilled, (state, action) => {
      state.preloader = false;
      state.listProviders = action.payload;
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
      state.listHosts = action.payload;
    });
    builder.addCase(getHosts.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getHosts.pending, (state, action) => {
      state.preloader = true;
    });

    ////////////////////////////// getGroup
    builder.addCase(getGroup.fulfilled, (state, action) => {
      state.preloader = false;
      state.listGroupContainers = action.payload;
    });
    builder.addCase(getGroup.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getGroup.pending, (state, action) => {
      state.preloader = true;
    });

    ///////////////////////////// addHostFN
    builder.addCase(addHostFN.fulfilled, (state, action) => {
      state.preloader = false;
      const obj = action.payload;
      state.listHosts = state.listHosts?.map((item) =>
        item?.guid == obj?.guid ? obj : item
      );
    });
    builder.addCase(addHostFN.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(addHostFN.pending, (state, action) => {
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
      state.listContainers = action.payload?.result;
    });
    builder.addCase(getContainers.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
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

    ///////////////////////////// getDataForBackUp
    builder.addCase(getDataForBackUp.fulfilled, (state, action) => {
      state.preloader = false;
      state.dataForBackUp = action.payload;
    });
    builder.addCase(getDataForBackUp.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getDataForBackUp.pending, (state, action) => {
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

    ////////////////////////////// getDnsDomen
    builder.addCase(getDnsDomen.fulfilled, (state, action) => {
      state.preloader = false;
      state.listDnsDomen = action.payload;
    });
    builder.addCase(getDnsDomen.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getDnsDomen.pending, (state, action) => {
      state.preloader = true;
    });

    ////////////////////////////// getDnsSubDomen
    builder.addCase(getDnsSubDomen.fulfilled, (state, action) => {
      state.preloader = false;
      state.listDnsSubDomen = action.payload;
    });
    builder.addCase(getDnsSubDomen.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getDnsSubDomen.pending, (state, action) => {
      state.preloader = true;
    });

    ////////////////////////////// sortSubDomen
    builder.addCase(sortSubDomen.fulfilled, (state, action) => {
      state.preloader = false;
      state.listDnsSubDomen = action.payload;
    });
    builder.addCase(sortSubDomen.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(sortSubDomen.pending, (state, action) => {
      state.preloader = true;
    });

    ////////////////////////////// deleteSubDomen
    builder.addCase(deleteSubDomen.fulfilled, (state, action) => {
      state.preloader = false;
    });
    builder.addCase(deleteSubDomen.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      // alert("Не удалось удалить!");
    });
    builder.addCase(deleteSubDomen.pending, (state, action) => {
      state.preloader = true;
    });

    ////////////////////////////// editSubDomen
    builder.addCase(editSubDomen.fulfilled, (state, action) => {
      state.preloader = false;
    });
    builder.addCase(editSubDomen.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(editSubDomen.pending, (state, action) => {
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
} = requestSlice.actions;

export default requestSlice.reducer;
