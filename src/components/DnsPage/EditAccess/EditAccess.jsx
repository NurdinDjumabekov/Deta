import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

/////// components
import { Tooltip } from "@mui/material";

////// fns
import {
  editAccess,
  getDataCenterReq,
} from "../../../store/reducers/dataCenterSlice";

////// icons
import LockClockIcon from "@mui/icons-material/LockClock";

///// style
import "./style.scss";

///// helpers
import { extractGuid } from "../../../helpers/transformLists";
import { checkIP } from "../../../helpers/checkFNS";
import { myAlert } from "../../../helpers/MyAlert";
import Modals from "../../../common/Modals/Modals";
import MyInputs from "../../../common/MyInput/MyInputs";
import MyIPInput from "../../../common/MyIPInput/MyIPInput";
import {
  crudAccessDns,
  getAccessDnsReq,
} from "../../../store/reducers/dnsSlice";
import EditIcon from "../../../assets/MyIcons/EditIcon";
import DeleteIcon from "../../../assets/MyIcons/DeleteIcon";
import ConfirmModal from "../../../common/ConfirmModal/ConfirmModal";

const EditAccess = () => {
  /// редактирвание данных дата центра
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const [action, setAction] = useState({});
  const [listAccess, setListAccess] = useState([]);
  const [actionAccess, setActionAccess] = useState(false);

  const openModalEdit = async () => {
    const res = await dispatch(getAccessDnsReq()).unwrap();
    setListAccess(res);
    setActionAccess(true);
    // const obj = res?.find((i) => i.guid == extractGuid(pathname));
    // setAction(obj);
  };

  function onChange(e) {
    const { name, value } = e.target;
    setAction({ ...action, [name]: value });
  }

  const saveData = async (e) => {
    e.preventDefault();

    const er = "Заполните правильно поле 'IP address: '";
    if (checkIP(action?.host) && action.action_type != 3)
      return myAlert(er, "error");

    console.log(action, "action");

    const res = await dispatch(crudAccessDns(action)).unwrap();
    if (res == 1) {
      const res = await dispatch(getAccessDnsReq()).unwrap();
      setListAccess(res);
      myAlert("Данные сохранены");
      setAction({});
    }
  };

  console.log(listAccess, "listAccess");

  const openEveryModal = (item, action_type) => {
    setAction({ ...item, action_type });
  };

  return (
    <div className="editDC accessDnsModal">
      <Tooltip title={"Изменить данные доступов"} placement="right">
        <button className="return access" onClick={openModalEdit}>
          <LockClockIcon />
        </button>
      </Tooltip>

      <Modals
        openModal={actionAccess}
        setOpenModal={() => setActionAccess(false)}
        title="Доступы"
      >
        <div className="accessDnsModal__list">
          {listAccess?.map((item) => (
            <div>
              <p>Ip адрес: {item?.host}</p>
              <p>Логин: {item?.username}</p>
              <p>Пароль: {item?.password}</p>
              <p>Порт: {item?.port}</p>
              <button className="edit" onClick={() => openEveryModal(item, 2)}>
                <EditIcon width="18" height="18" />
              </button>
              <button className="del" onClick={() => openEveryModal(item, 3)}>
                <DeleteIcon width="21" height="21" />
              </button>
            </div>
          ))}
        </div>
        <button
          className="btnAction"
          onClick={() => setAction({ action_type: 1 })}
        >
          Добавить
        </button>
      </Modals>

      <Modals
        openModal={[1, 2].includes(action?.action_type)}
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
            Сохранить
          </button>
        </form>
      </Modals>

      <ConfirmModal
        state={action?.action_type == 3}
        title={"Удалить ?"}
        yes={saveData}
        no={() => setAction({})}
      />
    </div>
  );
};

export default EditAccess;
