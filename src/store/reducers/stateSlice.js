import { createSlice } from "@reduxjs/toolkit";

import { dnsListDefault } from "../../helpers/LocalData";
import {
  clearAddTempContData,
  clearBackUp,
  clearDataAddHost,
  clearDataTemporaryDNS,
  clearDataTemporaryHosts,
} from "../../helpers/clear";
import { cutNums } from "../../helpers/cutNums";

const initialState = {
  listDiagrams: [], //// для диаграммы хостов на главной странице

  ///// Сервисы & Пользователи
  menuInner: [
    { id: 2, name: "Сервисы", list: [] },
    { id: 3, name: "Пользователи", list: [] },
  ],

  activeHost: 0, //// активный временный хост
  activeContainer: 0, //// активный временный контейнер
  activeDns: { guid: "", name: "" }, //// активный временный dns

  dnsList: {
    one: {
      domen_guid: "",
      record_name: "",
      host_ip: "",
      ttl: "120",
      ttl_type: 1,
      comment: "",
      is_check_my_ip: true,
      type_record: 1,
    },
    two: {
      domen_guid: "",
      record_name: "",
      host_ip: "",
      ttl: "120",
      ttl_type: 1,
      comment: "",
      type_record: 2,
    },
    three: {
      domen_guid: "",
      record_name: "",
      host_ip: "",
      ttl: "120",
      ttl_type: 1,
      comment: "",
      type_record: 3,
    },
    four: {
      domen_guid: "",
      record_name: "",
      host_ip: "",
      ttl: "120",
      ttl_type: 1,
      comment: "",
      type_record: 4,
    },
    five: {
      domen_guid: "",
      record_name: "",
      txt_string: "",
      ttl: "120",
      ttl_type: 1,
      comment: "",
      type_record: 5,
    },
    six: {
      domen_guid: "",
      record_name: "",
      point_to_name: "",
      ttl: "120",
      ttl_type: 1,
      comment: "",
      type_record: 6,
    },
    seven: {
      domen_guid: "",
      record_name: "",
      sdf_string: "",
      ttl: "120",
      ttl_type: 1,
      comment: "",
      is_check_my_ip: true,
      type_record: 7,
    },
  },

  activeDnsMenu: 1,
  //// активное временное menu для добавления sub доменов

  temporaryDNS: {
    ///// временный state для хранения временных
    ///// данных домена для редактирвоания и удаления
    domen_name: "",
    comment: "",
    expire: "360000",
    negative: "3600",
    refresh: "3600",
    retry: "900",
    is_check_my_ip: true,
    my_ip: "",
  },

  temporaryHosts: {
    ///// временный state для хранения временных
    ///// данных хоста для редактирвоания
    host_name: "",
    guid_node: "",
    node_model: "",
    listVmbr: [],
  },

  guidHostDel: "", /// храню guid хоста для его удаления (open modal)
  guidHostEdit: "", /// храню guid хоста для его редактирования (open modal)

  addTempHost: {
    host_name: "",
    login: "",
    password: "",
    ip_address: "",
    sort: 1,
    bool: false,
  },
  ///// временные данные для добавления хоста

  temporaryContainer: { vm_comment: "", guid: "", listVmbr: [] },
  ///// временный state для хранения временных
  ///// данных контейнеров для редактирвоания

  addTempCont: { container_name: "", cpu: 0, ram: 0, ssd: 0, bool: false },
  ///// временные данные для добавления контейнеров

  openOSModal: "", ////guid для модалки выбора операц. системы

  openAddFiles: {
    files: [], //// подсталяю файлы, которые приходят с базы
    guid: "",
  }, //// guid для модалки добавления файлов

  openModalAddGroup: "", ////guid для модалки добавления контейнера в группу

  openModaDelGroup: "", ////guid для модалки удаления контейнера с группы

  openModaStoppedCont: "", ////guid для модалки выключения контейнера

  openModaDelCont: "", ////guid для модалки удаления контейнера

  openModalKeyCont: "", ////guid  для доступов отображения контейнеров клиентам

  openModaStartCont: { guid: "", vm_id: "" }, ////guid для модалки запуска контейнера

  openModalBackUp: {
    name: "", /// тут буду хрпнить данные о контейнере и хостедля простого отображения
    guid: "", /// guid - контейнера
    fasts: 0,
    type: 0,
    snaps: 0,
  },

  openModalAddProvider: {
    name: "",
    ip_address: "",
    color: "",
    sort: 1,
    actionType: 0,
  },
  cloneModal: false,

  cloneContainerData: {
    target_storage_backup: "",
    guid_vm: "",
    target_storage_vm: { label: "local_lvm", value: "local_lvm" },

    target_node_guid: {},
    description: "",
    container_name: "",
    ip_adress: "",
    mask: { label: "/16", value: "/16" },
    gateway: "",
  },

  migrateContainerData: {
    guid_vm: "",
    target_storage_vm: { label: "local_lvm", value: "local_lvm" },
    target_node_guid: {},
    migration_type: { label: "", value: "" },
  },

  listCloneLogs: [],
  distributeIpModal: false,
  migrateModal: false,

  migrateHostContainersModal: false,

  migrateHostContainersData: {
    guid_vm_list: [],
    target_storage_vm: { label: "local_lvm", value: "local_lvm" },
    target_node_guid: {},
    migration_type: { label: "", value: "" },
    backup_type: { label: "", value: "" },
  },
};

const stateSlice = createSlice({
  name: "stateSlice",
  initialState,
  reducers: {
    setOpenModals: (state, action) => {
      state.modal = action.payload;
    },

    closeModals: (state, action) => {
      state.modal = 0;
    },

    setListDiagrams: (state, action) => {
      state.listDiagrams = action.payload?.list?.map((item) => {
        return {
          time: item?.date_system,
          CPU: item?.node_cpu_usage,
          RAM: item?.node_ram_usage,
          node_ram_mb: cutNums(+action.payload?.node_ram_mb / 1024, 2),
        };
      });
    },

    setMenuInner: (state, action) => {
      const newMenu = state.menuInner?.map((item) => {
        if (item.id === action.payload)
          return { ...item, active: !item.active };
        else return { ...item, active: false };
      });
      state.menuInner = newMenu;
    },

    changeMenuInner: (state, action) => {
      state.menuInner = action.payload;
    },

    setActiveHost: (state, action) => {
      state.activeHost = action.payload;
    },

    setActiveContainer: (state, action) => {
      state.activeContainer = action.payload;
    },

    setActiveDns: (state, action) => {
      state.activeDns = action.payload;
    },

    setDnsList: (state, action) => {
      state.dnsList = action.payload;
    },

    clearDnsList: (state, action) => {
      state.dnsList = dnsListDefault;
    },

    setDnsEveryKey: (state, action) => {
      const { obj, everyObj } = action.payload;
      state.dnsList = {
        ...state.dnsList,
        [obj]: { ...state.dnsList[obj], ...everyObj },
      };
    },

    setPastDnsInSubDomen: (state, action) => {
      const record_name = action.payload;
      const dnsList = state.dnsList;
      ///// подставляю domen в поля record_name всех sub доменов

      const updateRecordNames = (dnsList, newText) => {
        const updatedDnsList = { ...dnsList };

        Object.keys(updatedDnsList).forEach((key) => {
          if (updatedDnsList[key].hasOwnProperty("record_name")) {
            updatedDnsList[key]["record_name"] = newText;
          }
        });

        return updatedDnsList;
      };

      state.dnsList = updateRecordNames(dnsList, record_name);
    },

    setActiveDnsMenu: (state, action) => {
      state.activeDnsMenu = action.payload;
    },

    setTemporaryDNS: (state, action) => {
      state.temporaryDNS = action.payload;
    },

    clearTemporaryDNS: (state, action) => {
      state.temporaryDNS = clearDataTemporaryDNS;
      //// state для временного хранения dns данных
    },

    ////////////////////////////////////////////// hosts

    ////// для удаления по guid хоста
    setGuidHostDel: (state, action) => {
      state.guidHostDel = action.payload;
    },

    ////// для редактирования по guid хоста
    setGuidHostEdit: (state, action) => {
      state.guidHostEdit = action.payload;
    },

    ////// для редактирования по guid хоста
    setAddHost: (state, action) => {
      state.addTempHost = { ...state.addTempHost, ...action.payload };
    },

    ////// очищаю временн0 хранящиеся данные хоста
    clearAddHost: (state, action) => {
      state.addTempHost = clearDataAddHost;
    },

    ///////////////////////// temporaryHosts
    setTemporaryHosts: (state, action) => {
      state.temporaryHosts = action.payload;
    },

    clearTemporaryHosts: (state, action) => {
      state.temporaryHosts = clearDataTemporaryHosts;
      //// state для временного хранения данных хоста
    },

    addVmbr: (state, action) => {
      const text = action.payload;
      // Проверяю, если элемент уже существует в списке, чтобы избежать дублирования
      if (!state.temporaryHosts.listVmbr?.includes(text)) {
        state.temporaryHosts.listVmbr = [
          ...state.temporaryHosts.listVmbr,
          text,
        ];
      }
    },

    delVmbr: (state, action) => {
      const text = action.payload;
      state.temporaryHosts.listVmbr = state.temporaryHosts.listVmbr?.filter(
        (i) => i !== text
      );
      //// state для временного хранения данных хоста,
      //// удаляю со списка  vmbr
    },

    ////////////////////////////////////////////////// containers
    setTemporaryContainer: (state, action) => {
      state.temporaryContainer = action.payload;
    },

    clearTemporaryContainer: (state, action) => {
      state.temporaryContainer = { vm_comment: "", guid: "", listVmbr: [] };
      //// state для временного хранения данных хоста
    },

    delVmbrContainer: (state, action) => {
      const text = action.payload;
      state.temporaryContainer.listVmbr =
        state.temporaryContainer.listVmbr?.filter((i) => i !== text);
      //// state для временного хранения данных хоста,
      //// удаляю со списка  vmbr
    },

    setAddTempCont: (state, action) => {
      state.addTempCont = { ...state.addTempCont, ...action.payload };
    },

    clearAddTempCont: (state, action) => {
      state.addTempCont = clearAddTempContData;
    },

    setOpenOSModal: (state, action) => {
      state.openOSModal = action.payload;
    },

    setOpenAddFiles: (state, action) => {
      state.openAddFiles = { ...state.openAddFiles, ...action.payload };
    },

    clearOpenAddFiles: (state, action) => {
      state.openAddFiles = { files: [], guid: "" };
      //// подсталяю файлы, которые приходят с базы
    },

    setOpenModalAddGroup: (state, action) => {
      state.openModalAddGroup = action.payload;
    },

    setOpenModaDelGroup: (state, action) => {
      state.openModaDelGroup = action.payload;
    },

    setOpenModalBackUp: (state, action) => {
      state.openModalBackUp = action.payload;
    },

    clearOpenModalBackUp: (state, action) => {
      state.openModalBackUp = clearBackUp;
    },

    setOpenModaStoppedCont: (state, action) => {
      state.openModaStoppedCont = action.payload;
    },

    setOpenModaDelCont: (state, action) => {
      state.openModaDelCont = action.payload;
    },

    setOpenModalKeyCont: (state, action) => {
      state.openModalKeyCont = action.payload;
    },

    setOpenModaStartCont: (state, action) => {
      state.openModaStartCont = action.payload;
    },

    closeModalStartCont: (state, action) => {
      state.openModaStartCont = { guid: "", vm_id: "" };
    },

    setDistributeIpModal: (state, action) => {
      state.distributeIpModal = action.payload;
    },

    setOpenAddProvider: (state, action) => {
      state.openModalAddProvider = action.payload;
    },

    setCloneModal: (state, action) => {
      state.cloneModal = action.payload;
    },

    setMigrateModal: (state, action) => {
      state.migrateModal = action.payload;
    },

    setCloneContainerData: (state, action) => {
      state.cloneContainerData = action.payload;
    },

    clearCloneContainerData: (state, action) => {
      state.cloneContainerData = {
        target_storage_backup: "",
        guid_vm: "",
        target_storage_vm: { label: "local-lvm", value: "local-lvm" },

        target_node_guid: {},
        description: "",
        container_name: "",
        ip_adress: "",
        mask: { id: 1, label: "/16", value: "/16" },
        gateway: "",
      };
    },

    setMigrateContainerData: (state, action) => {
      state.migrateContainerData = action.payload;
    },

    clearMigrateContainerData: (state, action) => {
      state.migrateContainerData = {
        guid_vm: "",
        target_storage_vm: { label: "local_lvm", value: "local_lvm" },
        target_node_guid: {},
      };
    },

    setMigrateHostModal: (state, action) => {
      state.migrateHostContainersModal = action.payload;
    },

    setMigrateHostContainersData: (state, action) => {
      state.migrateHostContainersData = action.payload;
    },

    clearMigrateHostData: (state, action) => {},
  },
});

export const {
  setOpenModals,
  closeModals,
  setListDiagrams,
  setMenuInner,
  changeMenuInner,
  setActiveHost,
  setActiveContainer,
  setActiveDns,
  setDnsList,
  clearDnsList,
  setDnsEveryKey,
  setPastDnsInSubDomen,
  setActiveDnsMenu,
  setTemporaryDNS,
  clearTemporaryDNS,
  setGuidHostDel,
  setGuidHostEdit,
  setAddHost,
  clearAddHost,
  addVmbr,
  delVmbr,
  setTemporaryHosts,
  clearTemporaryHosts,
  setTemporaryContainer,
  clearTemporaryContainer,
  delVmbrContainer,
  setAddTempCont,
  clearAddTempCont,
  setOpenOSModal,
  setOpenAddFiles,
  clearOpenAddFiles,
  setOpenModalAddGroup,
  setOpenModaDelGroup,
  setOpenModalBackUp,
  clearOpenModalBackUp,
  setOpenModaStoppedCont,
  setOpenModaDelCont,
  setOpenModalKeyCont,
  setOpenModaStartCont,
  closeModalStartCont,
  setDistributeIpModal,
  setOpenAddProvider,
  setCloneModal,
  setCloneContainerData,
  clearCloneContainerData,
  setMigrateModal,
  clearMigrateContainerData,
  setMigrateContainerData,
  clearMigrateHostData,
  setMigrateHostContainersData,
  setMigrateHostModal,
} = stateSlice.actions;

export default stateSlice.reducer;
