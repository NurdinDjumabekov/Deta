import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  clearMigrateHostData,
  setMigrateHostContainersData,
  setMigrateHostModal,
} from "../../store/reducers/stateSlice";
import { transformListsForHost } from "../../helpers/transformLists";
import {
  createHostMigration,
  createMigrationContainer,
  getTypesBackUpReq,
} from "../../store/reducers/virtualMachineSlice";
import MySelects from "../../common/MySelects/MySelects";
import Modals from "../../common/Modals/Modals";
import { useState } from "react";
import { myAlert } from "../../helpers/MyAlert";

const MigrateHostModal = () => {
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const { migrateHostContainersModal, migrateHostContainersData } = useSelector(
    (state) => state.stateSlice
  );

  const { listHosts } = useSelector((state) => state.requestSlice);
  const { listTypeBackUpContainers } = useSelector(
    (state) => state.virtualMachineSlice
  );

  const handleCloseModal = () => {
    dispatch(setMigrateHostModal(false));
    dispatch(clearMigrateHostData());
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
      setMigrateHostContainersData({
        ...migrateHostContainersData,
        [name]: item,
      })
    );
  }

  const mirgateContainer = async (e) => {
    e.preventDefault();

    const responseData = {
      guid_vm_list: migrateHostContainersData.guid_vm_list,
      target_storage_vm:
        migrateHostContainersData?.target_storage_vm.storage_name,
      target_node_guid: migrateHostContainersData?.target_node_guid?.value,
      migration_type: migrateHostContainersData?.migration_type?.value,
      backup_type: migrateHostContainersData?.backup_type?.value,
    };

    console.log(responseData, "responseData");

    const response = await dispatch(createHostMigration(responseData)).unwrap();

    if (response?.res == 1) {
      myAlert("Миграция контейнера начата, следите в странице логов");
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
        "Мы не выключаем, делаем перенос, выключаем на исходном хосте, включаем на целевом хосте",
    },
    {
      type: 2,
      label: "Тип 2",
      value: 2,
      discription: "Мы выключаем на исходном, переносим, включаем на целевом ",
    },

    {
      type: 3,
      label: "Холодная миграция",
      value: 3,
      discription: "Переносим на целевой хост ",
    },
  ];

  const listTypeBackUp = [
    {
      type: 1,
      label: "Использовать последний бекап ",
      value: 1,
    },
    {
      type: 2,
      label: "Забекапить",
      value: 2,
    },
  ];

  return (
    <Modals
      openModal={migrateHostContainersModal}
      setOpenModal={handleCloseModal}
      title={"Миграция контейнеров ВОЛНА"}
    >
      <form action="cloneContainer" onSubmit={mirgateContainer}>
        <br />

        <MySelects
          list={listTypes}
          initText={"Выбрать"}
          onChange={onChangeSelect}
          nameKey={"target_node_guid"}
          value={migrateHostContainersData?.target_node_guid}
          title={"Выберите целевой хост для востановления"}
        />
        <br />
        <MySelects
          list={listTypeBackUpContainers?.container}
          initText={"Выбрать"}
          onChange={onChangeSelect}
          nameKey={"target_storage_vm"}
          value={migrateHostContainersData?.target_storage_vm}
          title={"Целевое хранилище для востановления"}
        />

        <br />
        <MySelects
          list={listTypeBackUp}
          initText={"Выбрать"}
          onChange={onChangeSelect}
          nameKey={"backup_type"}
          value={migrateHostContainersData?.backup_type}
          title={"Тип бекапирование"}
        />

        <br />
        <MySelects
          list={listTypeMigrations}
          initText={"Выбрать"}
          onChange={onChangeSelect}
          nameKey={"migration_type"}
          value={migrateHostContainersData?.migration_type}
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

export default MigrateHostModal;
