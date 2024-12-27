/////// hooks
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

////// components
import Modals from "../../../common/Modals/Modals";
import MyInputs from "../../../common/MyInput/MyInputs";
import MyTextArea from "../../../common/MyTextArea/MyTextArea";
import MyIPInput from "../../../common/MyIPInput/MyIPInput";

////// helpers
import { myAlert } from "../../../helpers/MyAlert";

////// fns
import { editComandsReq } from "../../../store/reducers/dataCenterSlice";

////// icons

/////// style
import "./style.scss";
import { checkIP } from "../../../helpers/checkFNS";
import ConfirmModal from "../../../common/ConfirmModal/ConfirmModal";

const ModalsComands = (props) => {
  const { crudComands, setCrudComands, getData } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onChange = (e) => {
    const { name, value } = e.target;
    setCrudComands({ ...crudComands, [name]: value });
  };

  const createEditCommandFN = async (e) => {
    e.preventDefault();
    if (checkIP(crudComands?.ip_address)) {
      return myAlert("Заполните правильно 'IP адрес'", "error");
    }

    const send = { ...crudComands, port: crudComands?.port || 22 };
    const res = await dispatch(editComandsReq(send)).unwrap();
    if (res == 1) {
      myAlert("Данные успешно сохранены");
      setCrudComands({});
      getData();
    }
  };

  const delCommandFN = async (e) => {
    e.preventDefault();
    const res = await dispatch(editComandsReq(crudComands)).unwrap();
    if (res == 1) {
      myAlert("Данные успешно удалены");
      setCrudComands({});
      getData();
    }
  };

  const objTitle = { 1: "Добавить", 2: "Редактировать" };
  if (crudComands?.actionType == 1 || crudComands?.actionType == 2) {
    return (
      <Modals
        openModal={true}
        setOpenModal={() => setCrudComands({})}
        title={objTitle?.[crudComands?.actionType]}
      >
        <form className="addEditCommand" onSubmit={createEditCommandFN}>
          <MyInputs
            title={`Логин`}
            onChange={onChange}
            name={"username"}
            value={crudComands?.username}
            required={true}
          />
          <MyInputs
            title={`Пароль`}
            onChange={onChange}
            name={"password"}
            value={crudComands?.password}
            required={true}
          />
          <MyIPInput
            title={`IP адрес`}
            onChange={onChange}
            name={"ip_address"}
            value={crudComands?.ip_address}
            required={true}
          />
          <MyInputs
            title={`Порт`}
            onChange={onChange}
            name={"port"}
            value={crudComands?.port}
          />
          <MyTextArea
            title={`Текст команды`}
            onChange={onChange}
            name={"command"}
            value={crudComands?.command}
            required={true}
          />
          <MyTextArea
            title={`Описание`}
            onChange={onChange}
            name={"description"}
            value={crudComands?.description}
            required={true}
          />
          <div className="saveStandart">
            <button type="submit">Сохранить</button>
          </div>
        </form>
      </Modals>
    );
  }

  /* удаление */
  if (crudComands?.actionType == 3) {
    return (
      <ConfirmModal
        state={crudComands?.actionType == 3}
        title={"Удалить ?"}
        yes={delCommandFN}
        no={() => setCrudComands({})}
      />
    );
  }
};

export default ModalsComands;
