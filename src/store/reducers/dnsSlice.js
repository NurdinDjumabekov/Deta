import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import socketIOClient from "socket.io-client";
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
  setOpenAddFiles,
  setOpenModaDelCont,
  setOpenModaDelGroup,
  setOpenModalAddGroup,
  setOpenModalKeyCont,
  setOpenOSModal,
} from "./stateSlice";
import { transformListNetwork } from "../../helpers/transformListNetwork";
import { defaultSubDomen } from "../../helpers/LocalData";
import { myAlert } from "../../helpers/MyAlert";
import { tranformKey } from "../../helpers/tranformTextInNum";
import axiosInstance from "../../axiosInstance";
import axios from "axios";
import { cutNums } from "../../helpers/cutNums";
const { REACT_APP_API_URL } = process.env;

const initialState = {
  preloaderDns: false,
  listDnsDomen: [],
  listDnsSubDomen: [],
  listScriptDns: [], /// список сценарий для переключения днс
};

///// getDnsDomen - для получения доменов
export const getDnsDomen = createAsyncThunk(
  "getDnsDomen",
  async function (props, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}dns/getDomens`;
    try {
      const response = await axiosInstance(url);
      if (response.status >= 200 && response.status < 300) {
        const guid = response?.data?.[0]?.guid;
        const name = response?.data?.[0]?.domen_name;
        dispatch(setActiveDns({ guid, name }));
        ///// подставляю в state для активного guid
        dispatch(getDnsSubDomen({ guid, domen_name: name }));
        // //// отправдяю guid для получения суб доменов определенного домена
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

///// addDomens - для добавления доменов
export const addDomens = createAsyncThunk(
  "addDomens",
  async function ({ data, setObjDomen }, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}dns/creareDomen`;
    try {
      const response = await axiosInstance.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        const guid = response?.data?.guid;

        if (!!!guid) {
          myAlert("Такой домен уже существует!", "error");
        } else {
          dispatch(getDnsDomen()); //// get все домены
          dispatch(clearTemporaryDNS());
          //// очищаю state для временного хранения dns данных
          setTimeout(() => {
            dispatch(setActiveDns({ guid, name: data?.domen_name }));
            dispatch(getDnsSubDomen({ guid, domen_name: data?.domen_name }));
            myAlert("Домен успешно добавлен!");
            setObjDomen("");
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
    const { guidDelete, setGuidDelete, getData } = props;
    const url = `${REACT_APP_API_URL}dns/deleteDomen`;
    const data = { guid: guidDelete };
    try {
      const response = await axiosInstance.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        getData(); //// get все домены
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

///// editStatusSubDomen - для редактирования статуса возможности преключения суб доменов
// 0 - можно переключать
// 1 - нельзя переключать
export const editStatusSubDomen = createAsyncThunk(
  "editStatusSubDomen",
  async function (props, { dispatch, rejectWithValue }) {
    const { data, setEditStatus, activeDns } = props;
    const url = `${REACT_APP_API_URL}dns/updateStatusSubDomen`;
    try {
      const response = await axiosInstance.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        if (response?.data?.res == 1) {
          myAlert("Изменения внесены");
          setEditStatus({});
          const send = { ...activeDns, domen_name: activeDns?.name };
          dispatch(getDnsSubDomen(send));
          //// get суб домены этого dns
        } else {
          myAlert(response?.data?.message);
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

///// getDnsSubDomen - для получения субдоменов
export const getDnsSubDomen = createAsyncThunk(
  "getDnsSubDomen",
  async function (props, { dispatch, rejectWithValue }) {
    const { guid, domen_name, searchText } = props;
    console.log(props, "props");
    const searchParams = !!searchText ? `?search=${searchText}` : "";
    const url = `${REACT_APP_API_URL}dns/getSubDomens/${guid}${searchParams}`;
    try {
      const response = await axiosInstance(url);
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

///// addSubDomen - для добавления sub доменов
export const addSubDomen = createAsyncThunk(
  "addSubDomen",
  async function (props, { dispatch, rejectWithValue }) {
    const { name, ...data } = props;
    const url = `${REACT_APP_API_URL}dns/creareSubDomen`;
    try {
      const response = await axiosInstance.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        const alreadyCreate = response?.data?.alreadyCreate;
        if (alreadyCreate) {
          myAlert("Такая запись уже существует!", "error");
        } else {
          const obj = { guid: data?.domen_guid, domen_name: name };
          dispatch(getDnsSubDomen(obj)); /// это guid домена
          dispatch(clearDnsList()); /// очищаю данные всех input для добавления dns
          myAlert("Процедура успешно завершена!");

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
      const response = await axiosInstance.post(url, data);
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

    const record_name = !!objEdit?.record_name
      ? `${objEdit?.record_name}.${activeDns?.name}`
      : ``;

    const url = `${REACT_APP_API_URL}dns/updateSubDomen`;
    const data = { ...objEdit, type_record: 1, record_name }; ///  type_record: 1, chech (dhtvtyyj)
    try {
      const response = await axiosInstance.post(url, data);
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
      const response = await axiosInstance.post(url, data);
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
      const response = await axiosInstance.post(url, data);
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
      const response = await axiosInstance.post(url, data);
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
      const response = await axiosInstance.post(url, data);
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

///// getScriptDns - get список сценарий для переключения днс
export const getScriptDns = createAsyncThunk(
  "getScriptDns",
  async function (i, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}dns/getDnsSwitchRules`;
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

///// choiceReadySripts - применение готовых сценариев
export const choiceReadySripts = createAsyncThunk(
  "choiceReadySripts",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}dns/useSwitchRules`;
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

const dnsSlice = createSlice({
  name: "dnsSlice",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    ////////////////////////////// getDnsDomen
    builder.addCase(getDnsDomen.fulfilled, (state, action) => {
      state.preloaderDns = false;
      state.listDnsDomen = action.payload;
    });
    builder.addCase(getDnsDomen.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderDns = false;
    });
    builder.addCase(getDnsDomen.pending, (state, action) => {
      state.preloaderDns = true;
    });

    ////////////////////////////// addDomens
    builder.addCase(addDomens.fulfilled, (state, action) => {
      state.preloaderDns = false;
    });
    builder.addCase(addDomens.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderDns = false;
      myAlert("Упс, что-то пошло не так?, перезагрузите страницу", "error");
    });
    builder.addCase(addDomens.pending, (state, action) => {
      state.preloaderDns = true;
    });

    /////////////////////////////// deleteDomen
    builder.addCase(deleteDomen.fulfilled, (state, action) => {
      state.preloaderDns = false;
    });
    builder.addCase(deleteDomen.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderDns = false;
    });
    builder.addCase(deleteDomen.pending, (state, action) => {
      state.preloaderDns = true;
    });

    ////////////////////////////// getDnsSubDomen
    builder.addCase(getDnsSubDomen.fulfilled, (state, action) => {
      state.preloaderDns = false;
      state.listDnsSubDomen = action.payload;
    });
    builder.addCase(getDnsSubDomen.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderDns = false;
    });
    builder.addCase(getDnsSubDomen.pending, (state, action) => {
      state.preloaderDns = true;
    });

    ////////////////////////////// sortSubDomen
    builder.addCase(sortSubDomen.fulfilled, (state, action) => {
      state.preloaderDns = false;
      state.listDnsSubDomen = action.payload;
    });
    builder.addCase(sortSubDomen.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderDns = false;
    });
    builder.addCase(sortSubDomen.pending, (state, action) => {
      state.preloaderDns = true;
    });

    ////////////////////////////// confirmStatusSubDomenFN
    builder.addCase(confirmStatusSubDomenFN.fulfilled, (state, action) => {
      state.preloaderDns = false;
    });
    builder.addCase(confirmStatusSubDomenFN.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderDns = false;
    });
    builder.addCase(confirmStatusSubDomenFN.pending, (state, action) => {
      state.preloaderDns = true;
    });

    ////////////////////////////// deleteSubDomen
    builder.addCase(deleteSubDomen.fulfilled, (state, action) => {
      state.preloaderDns = false;
    });
    builder.addCase(deleteSubDomen.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderDns = false;
      // alert("Не удалось удалить!");
    });
    builder.addCase(deleteSubDomen.pending, (state, action) => {
      state.preloaderDns = true;
    });

    ////////////////////////////// editSubDomen
    builder.addCase(editSubDomen.fulfilled, (state, action) => {
      state.preloaderDns = false;
    });
    builder.addCase(editSubDomen.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderDns = false;
    });
    builder.addCase(editSubDomen.pending, (state, action) => {
      state.preloaderDns = true;
    });

    ///////////////////////////// getScriptDns
    builder.addCase(getScriptDns.fulfilled, (state, action) => {
      state.preloaderDns = false;
      state.listScriptDns = action.payload?.buttons?.map((item) => {
        return { id: item?.guid, name: item?.rules_name };
      });
    });
    builder.addCase(getScriptDns.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderDns = false;
    });
    builder.addCase(getScriptDns.pending, (state, action) => {
      state.preloaderDns = true;
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
} = dnsSlice.actions;

export default dnsSlice.reducer;
