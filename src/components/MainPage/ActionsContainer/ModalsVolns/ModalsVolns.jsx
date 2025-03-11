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

/////// helpers
import { transformListsForHost } from "../../../../helpers/transformLists";
import { listTypeMigrations } from "../../../../helpers/LocalData";
import { actionsVolns } from "../../../../store/reducers/actionsContaiersSlice";
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

  const stopVms = () => {
    console.log(actionType, "actionType");
  };

  const startVms = () => {
    console.log(actionType, "actionType");
  };

  const delVms = () => {
    console.log(actionType, "actionType");
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
    };

    const res = await dispatch(actionsVolns(send)).unwrap();
    if (res == 1) {
      setActionType({});
      myAlert("Данные внесены в цикл, перейдите на страницу логов...");
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
        yes={stopVms}
        no={() => setActionType({})}
      />
    );
  }

  if (actionType?.type == 4) {
    return (
      <ConfirmModal
        state={true}
        title={`Удалить выделенный список контейнеров?`}
        yes={stopVms}
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
