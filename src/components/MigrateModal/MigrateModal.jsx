import { useSelector } from "react-redux";
import "./style.scss";
import { useDispatch } from "react-redux";
import {
  clearMigrateContainerData,
  setMigrateContainerData,
  setMigrateModal,
} from "../../store/reducers/stateSlice";
import { transformListsForHost } from "../../helpers/transformLists";
import {
  createMigrationContainer,
  getTypesBackUpReq,
} from "../../store/reducers/virtualMachineSlice";
import MySelects from "../../common/MySelects/MySelects";
import Modals from "../../common/Modals/Modals";
import { useState } from "react";
import { myAlert } from "../../helpers/MyAlert";

const MigrateModal = () => {
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const { migrateModal, migrateContainerData } = useSelector(
    (state) => state.stateSlice
  );

  const { listHosts } = useSelector((state) => state.requestSlice);
  const { listTypeBackUpContainers } = useSelector(
    (state) => state.virtualMachineSlice
  );

  const handleCloseModal = () => {
    dispatch(setMigrateModal(false));
    dispatch(clearMigrateContainerData());
  };

  async function onChangeSelect(item) {
    console.log(item, "item");

    const { name } = item;

    if (name == "target_node_guid") {
      await dispatch(getTypesBackUpReq(item?.guid_node)).unwrap();
    }

    if (name == "migration_type") {
      setDescription(item?.discription);
    }

    dispatch(
      setMigrateContainerData({
        ...migrateContainerData,
        [name]: item,
      })
    );
  }

  const mirgateContainer = async (e) => {
    e.preventDefault();
    const responseData = {
      guid_vm: migrateContainerData.guid_vm,
      target_storage_vm: migrateContainerData?.target_storage_vm.storage_name,
      target_node_guid: migrateContainerData?.target_node_guid?.value,
      migration_type: migrateContainerData?.migration_type?.value,
    };

    console.log(responseData, "responseData");

    const response = await dispatch(
      createMigrationContainer(responseData)
    ).unwrap();

    if (response?.res == 1) {
      myAlert("Миграция контейнера начато, следите в странице логов");
      handleCloseModal();
    } else {
      myAlert("Не удалось отправить в очередь на миграцию");
    }
  };

  const updatedHostList = listHosts.filter((host) => host?.host_status == 1);

  const listTypes = transformListsForHost(updatedHostList, "guid", "host_name");

  const listTypeMigrations = [
    {
      type: 1,
      label: "Тип 1",
      value: 1,
      discription:
        "Мы не выключаем делаем перенос, включаем на целевом хосте, выключаем на исходном хосте",
    },
    {
      type: 2,
      label: "Тип 2",
      value: 2,
      discription: "Мы выключаем на исходном, переносим и включаем на целевом ",
    },
  ];

  return (
    <Modals
      openModal={migrateModal}
      setOpenModal={handleCloseModal}
      title={"Миграция контейнера"}
    >
      <form action="cloneContainer" onSubmit={mirgateContainer}>
        <br />

        <MySelects
          list={listTypes}
          initText={"Выбрать"}
          onChange={onChangeSelect}
          nameKey={"target_node_guid"}
          value={migrateContainerData?.target_node_guid}
          title={"Выберите целевой хост для востановления"}
        />
        <br />
        <MySelects
          list={listTypeBackUpContainers?.container}
          initText={"Выбрать"}
          onChange={onChangeSelect}
          nameKey={"target_storage_vm"}
          value={migrateContainerData?.target_storage_vm}
          title={"Целевое хранилище для востановления"}
        />

        <br />
        <MySelects
          list={listTypeMigrations}
          initText={"Выбрать"}
          onChange={onChangeSelect}
          nameKey={"migration_type"}
          value={migrateContainerData?.migration_type}
          title={"Тип миграции"}
        />

        {description && (
          <>
            <br />
            <p style={{ fontSize: 13 }}>{description}</p>
          </>
        )}

        <div className="saveStandart">
          <button type="submit">Мигрировать</button>
        </div>
      </form>
    </Modals>
  );
};

export default MigrateModal;
