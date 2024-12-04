import React from "react";
import "./style.scss";
import { closeModalStartCont } from "../../../../store/reducers/stateSlice";
import { useDispatch } from "react-redux";

const ActionsVirtualMachine = () => {
  const dispatch = useDispatch();
  const obj = { 1: "Запустить ", 2: "Перезагрузить", 3: "Выключить " };

  const list = [
    "запуск сервера..... запуск сервера..... запуск сервера..... запуск сервера.....",
    "запуск сервера.... запуск сервера..... запуск сервера..... .",
    "запуск сервера.....",
    "запуск сервера..... запуск сервера..... запуск сервера..... запуск сервера..... запуск сервера..... ",
    "запуск сервера..... запуск сервера..... запуск сервера..... ",
    "запуск сервера.....",
    "запуск сервера.....запуск сервера..... запуск сервера..... ",
    "запуск сервера.....",
  ];

  const close = () => dispatch(closeModalStartCont());

  return (
    <div className="virtual__inner">
      <div className="listLoads">
        {[]?.map((item) => (
          <li>{item}</li>
        ))}
      </div>
      <div className="btnActions">
        <button>Да</button>
        <button className="cancel" onClick={close}>
          Отмена
        </button>
      </div>
    </div>
  );
};

export default ActionsVirtualMachine;
