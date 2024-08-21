////// hooks
import React from "react";
import { useSelector } from "react-redux";

////// components
import Modals from "../Modals/Modals";
import AccessesUsers from "./HostsAndContainers/AccessesUsers";

const ModalComponents = () => {
  const { modal } = useSelector((state) => state.stateSlice);

  const objModals = {
    1: { c: <AccessesUsers />, title: "Пользователи" }, //// модалка для доступов отображения контейнеров клиентам
  };

  return (
    <Modals
      openModal={!!modal}
      title={objModals?.[modal]?.title}
      setOpenModal={() => {}}
    >
      {objModals?.[modal]?.c}
    </Modals>
  );
};

export default ModalComponents;
