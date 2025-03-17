//////// hooks
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

//////// components
import Modals from "../../../../common/Modals/Modals";
import ConfirmModal from "../../../../common/ConfirmModal/ConfirmModal";
import MySelects from "../../../../common/MySelects/MySelects";

////// style
import "./style.scss";

////// fns
import { getTypesBackUpReq } from "../../../../store/reducers/virtualMachineSlice";
import { actionsVolns } from "../../../../store/reducers/actionsContaiersSlice";

/////// helpers
import { transformListsForHost } from "../../../../helpers/transformLists";
import { listTypeMigrations } from "../../../../helpers/LocalData";
import { myAlert } from "../../../../helpers/MyAlert";

const ModalsVolns = ({ setActionType, actionType }) => {
  const dispatch = useDispatch();

  const { listHosts } = useSelector((state) => state.requestSlice);
  const listActiveHosts = listHosts?.filter((host) => host?.host_status == 1);
  const listTypes = transformListsForHost(listActiveHosts, "guid", "node_name");
  const { listTypeBackUpContainers } = useSelector(
    (state) => state.virtualMachineSlice
  );

  async function onChangeSelect(props) {
    const { name, value, label, guid_node, discription } = props;
    if (name == "target_node_guid") {
      await dispatch(getTypesBackUpReq(guid_node)).unwrap();
    }
    if (name == "migration_type") {
      const past = { label, value, discription };
      setActionType({ ...actionType, [name]: past });
    } else {
      setActionType({ ...actionType, [name]: { label, value } });
    }
  }

  async function onChangeBox({ type_backup }) {
    setActionType({ ...actionType, type_backup: !!!type_backup });
  }

  const stopVms = async () => {
    const send = {
      list: actionType.list,
      main_type: 3, //// СТОП vm
    };
    const res = await dispatch(actionsVolns(send)).unwrap();
    if (res == 1) {
      setActionType({});
      myAlert("Данные внесены в стэк, перейдите на страницу логов...");
    }
  };

  const startVms = async () => {
    const send = {
      list: actionType.list,
      main_type: 4, //// запуск vm
    };
    const res = await dispatch(actionsVolns(send)).unwrap();
    if (res == 1) {
      setActionType({});
      myAlert("Данные внесены в стэк, перейдите на страницу логов...");
    }
  };

  const delVms = async () => {
    const send = {
      list: actionType.list,
      main_type: 7, //// УДАЛЕНИЕ vm
    };

    const res = await dispatch(actionsVolns(send)).unwrap();
    if (res == 1) {
      setActionType({});
      myAlert("Данные внесены в стэк, перейдите на страницу логов...");
    }
  };

  const mirgateContainer = async (e) => {
    e.preventDefault();

    if (!!!actionType?.target_node_guid?.value) {
      return myAlert("Выберите хост", "error");
    }

    if (!!!actionType?.target_storage_vm?.value) {
      return myAlert("Выберите хранилище", "error");
    }

    const send = {
      list: actionType.list,
      storage_for_vm: actionType?.target_storage_vm?.value,
      host: actionType?.target_node_guid?.value,
      migration_type: actionType?.migration_type?.value,
      type_backup: !!actionType?.type_backup ? 1 : 0,
      main_type: 5, //// миграция
    };

    const res = await dispatch(actionsVolns(send)).unwrap();
    if (res == 1) {
      setActionType({});
      myAlert("Данные внесены в стэк, перейдите на страницу логов...");
    }
  };

  if (actionType?.type == 1) {
    return (
      <ConfirmModal
        state={true}
        title={`Остановить выделенный список контейнеров?`}
        yes={stopVms}
        no={() => setActionType({})}
      />
    );
  }

  if (actionType?.type == 2) {
    return (
      <ConfirmModal
        state={true}
        title={`Запустить выделенный список контейнеров?`}
        yes={startVms}
        no={() => setActionType({})}
      />
    );
  }

  if (actionType?.type == 4) {
    return (
      <ConfirmModal
        state={true}
        title={`Удалить выделенный список контейнеров?`}
        yes={delVms}
        no={() => setActionType({})}
      />
    );
  }

  if (actionType?.type == 3) {
    return (
      <div className="migration">
        <Modals
          openModal={true}
          setOpenModal={() => setActionType({})}
          title={"Миграция контейнеров"}
        >
          <form action="cloneContainer" onSubmit={mirgateContainer}>
            <MySelects
              list={listTypes}
              initText={"Выбрать"}
              onChange={onChangeSelect}
              nameKey={"target_node_guid"}
              value={actionType?.target_node_guid}
              title={"Выберите целевой хост для востановления"}
            />

            <MySelects
              list={listTypeBackUpContainers?.container}
              initText={"Выбрать"}
              onChange={onChangeSelect}
              nameKey={"target_storage_vm"}
              value={actionType?.target_storage_vm}
              title={"Целевое хранилище для востановления"}
            />

            <MySelects
              list={listTypeMigrations}
              initText={"Выбрать"}
              onChange={onChangeSelect}
              nameKey={"migration_type"}
              value={actionType?.migration_type}
              title={"Тип миграции"}
            />

            <p className="description">
              {actionType?.migration_type?.discription}
            </p>

            <div
              className="checkboxBlock"
              onClick={() => onChangeBox(actionType)}
            >
              <input
                type="checkbox"
                checked={!!actionType?.type_backup}
                name="type_backup"
                className="select-all-checkbox"
              />
              <p className="description">Миграция с бэкапом</p>
            </div>

            <button className="btnAction" type="submit">
              Мигрировать
            </button>
          </form>
        </Modals>
      </div>
    );
  }
};

export default ModalsVolns;
