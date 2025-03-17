///////// hooks
import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

/////// fns
import {
  clearListTypeBackUpContainersFN,
  getTypesBackUpReq,
} from "../../../../store/reducers/virtualMachineSlice";
import { createMigrationContainer } from "../../../../store/reducers/virtualMachineSlice";

////// components
import MySelects from "../../../../common/MySelects/MySelects";
import Modals from "../../../../common/Modals/Modals";
import { Tooltip } from "@mui/material";

/////// icons
import migrate from "../../../../assets/icons/migrateLogo.png";

/////// helpers
import { transformListsForHost } from "../../../../helpers/transformLists";
import { myAlert } from "../../../../helpers/MyAlert";
import { listTypeMigrations } from "../../../../helpers/LocalData";

////// styles
import "./style.scss";

const Migration = ({ item }) => {
  const dispatch = useDispatch();

  const [migrationData, setMigrationData] = useState({});

  const { listHosts } = useSelector((state) => state.requestSlice);

  const { listTypeBackUpContainers } = useSelector(
    (state) => state.virtualMachineSlice
  );

  const listActiveHosts = listHosts?.filter((host) => host?.host_status == 1);
  const listTypes = transformListsForHost(listActiveHosts, "guid", "node_name");

  async function onChangeSelect(props) {
    const { name, value, label, guid_node, discription } = props;
    if (name == "target_node_guid") {
      await dispatch(getTypesBackUpReq(guid_node)).unwrap();
    }
    if (name == "migration_type") {
      const past = { label, value, discription };
      setMigrationData({ ...migrationData, [name]: past });
    } else {
      setMigrationData({ ...migrationData, [name]: { label, value } });
    }
  }

  async function onChangeBox({ type_backup }) {
    setMigrationData({ ...migrationData, type_backup: !!!type_backup });
  }

  const mirgateContainer = async (e) => {
    e.preventDefault();

    if (!!!migrationData?.target_node_guid?.value) {
      return myAlert("Выберите хост", "error");
    }

    if (!!!migrationData?.target_storage_vm?.value) {
      return myAlert("Выберите хранилище", "error");
    }

    const send = {
      guid_vm: migrationData.guid,
      storage_for_vm: migrationData?.target_storage_vm?.value,
      host: migrationData?.target_node_guid?.value,
      migration_type: migrationData?.migration_type?.value,
      type_backup: !!migrationData?.type_backup ? 1 : 0,
      main_type: 5, /// это миграция
    };

    const response = await dispatch(createMigrationContainer(send)).unwrap();

    if (response?.res == 1) {
      myAlert("Началась миграция контейнера");
      setMigrationData({});
    } else {
      myAlert("Не удалось отправить в очередь на миграцию");
    }
  };

  const clsoeModal = () => {
    setMigrationData({});
    dispatch(clearListTypeBackUpContainersFN());
  };

  const openModalFN = ({ guid }) => {
    setMigrationData({ guid, migration_type: listTypeMigrations?.[0] });
  };

  return (
    <div className="migration">
      <Tooltip title="Мигрировать" placement="top">
        <button onClick={() => openModalFN(item)}>
          <img src={migrate} alt="#" />
        </button>
      </Tooltip>
      <Modals
        openModal={!!migrationData?.guid}
        setOpenModal={clsoeModal}
        title={"Миграция контейнера"}
      >
        <div action="cloneContainer">
          <MySelects
            list={listTypes}
            initText={"Выбрать"}
            onChange={onChangeSelect}
            nameKey={"target_node_guid"}
            value={migrationData?.target_node_guid}
            title={"Выберите целевой хост для востановления"}
          />
          <MySelects
            list={listTypeBackUpContainers?.container}
            initText={"Выбрать"}
            onChange={onChangeSelect}
            nameKey={"target_storage_vm"}
            value={migrationData?.target_storage_vm}
            title={"Целевое хранилище для востановления"}
          />
          <MySelects
            list={listTypeMigrations}
            initText={"Выбрать"}
            onChange={onChangeSelect}
            nameKey={"migration_type"}
            value={migrationData?.migration_type}
            title={"Тип миграции"}
          />
          <p className="description">
            {migrationData?.migration_type?.discription}
          </p>
          <div
            className="checkboxBlock"
            onClick={() => onChangeBox(migrationData)}
          >
            <input
              type="checkbox"
              checked={!!migrationData?.type_backup}
              name="type_backup"
              className="select-all-checkbox"
            />
            <p className="description">Миграция с бэкапом</p>
          </div>
          <button className="btnAction" onClick={mirgateContainer}>
            Мигрировать
          </button>
        </div>
      </Modals>
    </div>
  );
};

export default Migration;
