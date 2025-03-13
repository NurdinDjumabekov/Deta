/////// hooks
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState, useCallback } from "react";

////// components
import Modals from "../../../common/Modals/Modals";
import MyInputs from "../../../common/MyInput/MyInputs";
import MyTextArea from "../../../common/MyTextArea/MyTextArea";
import MyIPInput from "../../../common/MyIPInput/MyIPInput";
import MySelects from "../../../common/MySelects/MySelects";
import ConfirmModal from "../../../common/ConfirmModal/ConfirmModal";

////// helpers
import { myAlert } from "../../../helpers/MyAlert";
import { checkIP } from "../../../helpers/checkFNS";
import { colorsList } from "../../../helpers/LocalData";
import debounce from "debounce";

////// fns
import {
  editComandsReq,
  getListVMsInIp,
} from "../../../store/reducers/dataCenterSlice";

/////// style
import "./style.scss";

const ModalsComands = (props) => {
  const { crudComands, setCrudComands, getData } = props;

  const dispatch = useDispatch();

  const { listVMsInIp } = useSelector((state) => state.dataCenterSlice);

  function onChange(e) {
    const { name, value } = e.target;
    setCrudComands({ ...crudComands, [name]: value });
    if (name == "vm_id") searchData(value, dispatch);
  }

  function searchData(value, dispatch) {
    const debouncedSearch = debounce((val) => {
      if (val?.length > 1) {
        dispatch(getListVMsInIp(val));
      }
    }, 800);
    debouncedSearch(value);
  }

  async function createEditCommandFN(e) {
    e.preventDefault();
    if (checkIP(crudComands?.ip_address)) {
      return myAlert("Заполните правильно 'IP адрес'", "error");
    }

    // if (!!!crudComands?.vm_guid) {
    //   return myAlert("Выберите контейнер", "error");
    // }

    const send = {
      ...crudComands,
      port: crudComands?.port || 22,
      vm_guid: crudComands?.vm_guid?.value,
    };

    const res = await dispatch(editComandsReq(send)).unwrap();
    if (res == 1) {
      myAlert("Данные успешно сохранены");
      setCrudComands({});
      getData();
    }
  }

  async function delCommandFN(e) {
    e.preventDefault();
    const res = await dispatch(editComandsReq(crudComands)).unwrap();
    if (res == 1) {
      myAlert("Данные успешно удалены");
      setCrudComands({});
      getData();
    }
  }

  function onChangeSelect(item) {
    setCrudComands({ ...crudComands, vm_guid: item, vm_id: item?.vm_id });
  }

  const objTitle = { 1: "Добавить", 2: "Редактировать" };

  if (crudComands?.actionType == 1 || crudComands?.actionType == 2) {
    return (
      <div className="crudCommands">
        <Modals
          openModal={true}
          setOpenModal={() =>
            setCrudComands({
              username: "root",
              password: "Afina954120",
              port: 22,
            })
          }
          title={objTitle?.[crudComands?.actionType]}
        >
          <form className="addEditCommand" onSubmit={createEditCommandFN}>
            <MyIPInput
              title={`IP адрес`}
              onChange={onChange}
              name={"ip_address"}
              value={crudComands?.ip_address}
              required={true}
            />

            <MyInputs
              title={`Номер контейнера`}
              onChange={onChange}
              name={"vm_id"}
              value={crudComands?.vm_id}
              required={false}
            />

            <MySelects
              list={listVMsInIp}
              initText={"Выбрать"}
              onChange={onChangeSelect}
              nameKey={"vm_guid"}
              value={crudComands?.vm_guid}
              title={"Список контейнеров"}
            />

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
            <MyInputs
              title={`Порт`}
              onChange={onChange}
              name={"port"}
              value={crudComands?.port}
            />
            <MyTextArea
              title={`Bash команда`}
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

            <ul className="listColors">
              {colorsList?.map((item, index) => (
                <li
                  key={index}
                  style={{ background: item }}
                  className={crudComands?.color == item ? "active" : ""}
                  onClick={() =>
                    setCrudComands({ ...crudComands, color: item })
                  }
                />
              ))}
            </ul>

            <div className="saveStandart">
              <button type="submit">Сохранить</button>
            </div>
          </form>
        </Modals>
      </div>
    );
  }

  /* удаление */
  if (crudComands?.actionType == 3) {
    return (
      <ConfirmModal
        state={crudComands?.actionType == 3}
        title={"Удалить ?"}
        yes={delCommandFN}
        no={() =>
          setCrudComands({
            username: "root",
            password: "Afina954120",
            port: 22,
          })
        }
      />
    );
  }
};

export default ModalsComands;
