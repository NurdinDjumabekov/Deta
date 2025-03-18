import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

/////// components
import { Tooltip } from "@mui/material";
import Modals from "../Modals/Modals";
import MyInputs from "../MyInput/MyInputs";
import MyIPInput from "../MyIPInput/MyIPInput";

////// fns
import {
  editAccess,
  getDataCenterReq,
} from "../../store/reducers/dataCenterSlice";

////// icons
import LockClockIcon from "@mui/icons-material/LockClock";
import QueuePlayNextIcon from "@mui/icons-material/QueuePlayNext";

///// style
import "./style.scss";

///// helpers
import { extractGuid } from "../../helpers/transformLists";
import { checkIP } from "../../helpers/checkFNS";
import { myAlert } from "../../helpers/MyAlert";

const EditInfoDC = () => {
  /// редактирвание данных дата центра
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const [action, setAction] = useState({});

  const openModalEdit = async () => {
    const res = await dispatch(getDataCenterReq()).unwrap();
    const obj = res?.find((i) => i.guid == extractGuid(pathname));
    setAction(obj);
  };

  function onChange(e) {
    const { name, value } = e.target;
    setAction({ ...action, [name]: value });
  }

  const saveData = async (e) => {
    e.preventDefault();

    const er = "Заполните правильно поле 'IP address: '";
    if (checkIP(action?.host)) return myAlert(er, "error");

    const res = await dispatch(editAccess(action)).unwrap();
    if (res == 1) {
      myAlert("Данные сохранены");
      setAction({});
    }
  };

  const clickLink = async () => {
    const res = await dispatch(getDataCenterReq()).unwrap();
    const obj = res?.find((i) => i.guid == extractGuid(pathname));
    window.open(`https://${obj?.host}/haproxy`, "_blank");
  };

  return (
    <div className="editDC">
      <Tooltip title={"Изменить данные доступов"} placement="right">
        <button
          onClick={openModalEdit}
          className="actionProxy"
          style={{ background: "#f17600" }}
        >
          <LockClockIcon />
        </button>
      </Tooltip>

      <Tooltip title={"Ссылка на Haproxy"} placement="right">
        <button onClick={clickLink} className="actionProxy">
          <QueuePlayNextIcon />
        </button>
      </Tooltip>

      <Modals
        openModal={action?.guid}
        setOpenModal={() => setAction({})}
        title="Доступы"
      >
        <form className="editDC__inner" onSubmit={saveData}>
          <MyInputs
            title={`Пользователь`}
            onChange={onChange}
            name={"username"}
            value={action?.username}
            required={true}
          />

          <MyInputs
            title={`Пароль`}
            onChange={onChange}
            name={"password"}
            value={action?.password}
            required={true}
          />

          <MyIPInput
            title={"IP адрес"}
            onChange={onChange}
            name={"host"}
            value={action?.host}
            required={true}
          />

          <MyInputs
            title={`Порт`}
            onChange={onChange}
            name={"port"}
            value={action?.port}
            type="number"
            required={true}
          />

          <button className="btnAction" type="submit">
            Сохранить данные
          </button>
        </form>
      </Modals>
    </div>
  );
};

export default EditInfoDC;
