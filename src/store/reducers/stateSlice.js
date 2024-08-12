import { createSlice } from "@reduxjs/toolkit";

////// imgs
import container from "../../assets/icons/menu/box.svg";
import servers from "../../assets/icons/menu/database.svg";
import users from "../../assets/icons/menu/users.svg";
import { dnsListDefault } from "../../helpers/LocalData";

const listGr = [
  { name: "Тестовая группa", decs: "описание1" },
  { name: "ЛИС стационар", decs: "описание1" },
  { name: "ЛИС облако", decs: "описание1" },
  { name: "Мис", decs: "описание1" },
  { name: "Доставка", decs: "описание1" },
  { name: "FIN", decs: "описание1" },
  { name: "1C", decs: "описание1" },
];

const listname = [
  { name: "Иван", decs: "описание1" },
  { name: "Баатыр", decs: "описание1" },
  { name: "Роза", decs: "описание1" },
  { name: "Айжамал", decs: "описание1" },
  { name: "Эржан", decs: "описание1" },
  { name: "Бек", decs: "описание1" },
];

const initialState = {
  menuInner: [
    { id: 1, name: "Контейнеры", img: container, active: false },

    {
      id: 2,
      name: "Сервисы",
      img: servers,
      active: false,
      list: listGr,
    },

    {
      id: 3,
      name: "Пользователи",
      img: users,
      active: false,
      list: listname,
    },
  ],

  ///// активный host на главной странице

  activeHost: 0, //// активный временный хост
  activeContainer: 0, //// активный временный контейнер
  activeDns: "", //// активный временный dns

  dnsList: {
    one: {
      record_name: "",
      host_ip: "",
      ttl: "",
      ttl_type: 1,
      comment: "",
      // bool: false,
      type_record: 1,
    },
    two: {
      name2: "",
      addres2: "",
      record2: "",
      time2: 0,
      comment2: "",
      type_record: 2,
    },
    three: {
      id: 3,
      name3: "",
      addres3: "",
      record3: "",
      time3: 0,
      comment3: "",
      perference3: "",
      type_record: 3,
    },
    four: {
      id: 4,
      name4: "",
      addres4: "",
      record4: "",
      time4: 0,
      comment4: "",
      type_record: 4,
    },
    five: {
      id: 5,
      name5: "",
      addres5: "",
      record5: "",
      time5: 0,
      comment5: "",
      type_record: 5,
    },
    six: {
      id: 6,
      name6: "",
      addres6: "",
      record6: "",
      time6: 0,
      comment6: "",
      type_record: 6,
    },
    seven: {
      id: 7,
      name7: "",
      addres7: "",
      record7: "",
      time7: 0,
      comment7: "",
      bool7: false,
      type_record: 7,
    },
  },

  activeDnsMenu: 1,
  //// активное временное menu для добавления sub доменов

  temporaryDNS: {
    ///// временный state для хранения временного
    ///// домена для редактирвоания и удаления
    dns_sone_guid: "",
    domen_name: "",
    guid: "",
    server_ttl: 0,
    status: 0,
  },
};

const stateSlice = createSlice({
  name: "stateSlice",
  initialState,
  reducers: {
    setMenuInner: (state, action) => {
      const newMenu = state.menuInner?.map((item) => {
        if (item.id === action.payload) {
          return { ...item, active: !item.active };
        } else {
          return { ...item, active: false };
        }
      });
      state.menuInner = newMenu;
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

    setActiveDnsMenu: (state, action) => {
      state.activeDnsMenu = action.payload;
    },

    setTemporaryDNS: (state, action) => {
      state.temporaryDNS = action.payload;
    },
  },
});

export const {
  setMenuInner,
  setActiveHost,
  setActiveContainer,
  setActiveDns,
  setDnsList,
  clearDnsList,
  setDnsEveryKey,
  setActiveDnsMenu,
  setTemporaryDNS,
} = stateSlice.actions;

export default stateSlice.reducer;
