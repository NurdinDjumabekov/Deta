import { createSlice } from "@reduxjs/toolkit";

////// imgs
import container from "../../assets/icons/menu/box.svg";
import servers from "../../assets/icons/menu/database.svg";
import users from "../../assets/icons/menu/users.svg";

const initialState = {
  menuInner: [
    { id: 1, name: "Контейнеры", img: container, active: false },
    {
      id: 2,
      name: "Сервисы",
      img: servers,
      active: false,
      list: [
        { name: "Тестовая группa", decs: "описание1" },
        { name: "ЛИС стационар", decs: "описание1" },
        { name: "ЛИС облако", decs: "описание1" },
        { name: "Мис", decs: "описание1" },
        { name: "Доставка", decs: "описание1" },
        { name: "FIN", decs: "описание1" },
        { name: "1C", decs: "описание1" },
      ],
    },

    {
      id: 3,
      name: "Пользователи",
      img: users,
      active: false,
      list: [
        { name: "Иван", decs: "описание1" },
        { name: "Баатыр", decs: "описание1" },
        { name: "Роза", decs: "описание1" },
        { name: "Айжамал", decs: "описание1" },
        { name: "Эржан", decs: "описание1" },
        { name: "Бек", decs: "описание1" },
      ],
    },
  ],
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
  },
});

export const { setMenuInner } = stateSlice.actions;

export default stateSlice.reducer;

// { name: "контейнер1", decs: "описание1" },
// { name: "контейнер1", decs: "описание1" },
// { name: "контейнер1", decs: "описание1" },
// { name: "контейнер1", decs: "описание1" },
// { name: "контейнер1", decs: "описание1" },
// { name: "контейнер1", decs: "описание1" },
