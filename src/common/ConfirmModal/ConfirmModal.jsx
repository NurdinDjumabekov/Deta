import React from "react";
import Modals from "../Modals/Modals";
import "./style.scss";

const ConfirmModal = ({ state, no, title, yes }) => {
  return (
    <Modals openModal={state} setOpenModal={no} title={title}>
      <div className="modalDel">
        <button className="yes" onClick={yes}>
          Да
        </button>
        <button className="no" onClick={no}>
          Нет
        </button>
      </div>
    </Modals>
  );
};

export default ConfirmModal;
