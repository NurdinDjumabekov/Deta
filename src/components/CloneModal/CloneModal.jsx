import { useSelector } from "react-redux";
import Modals from "../../common/Modals/Modals";
import { useDispatch } from "react-redux";
import {
  clearCloneContainerData,
  setCloneContainerData,
  setCloneModal,
} from "../../store/reducers/stateSlice";
import MySelects from "../../common/MySelects/MySelects";
import { transformListsForHost } from "../../helpers/transformLists";
import MyIPInput from "../../common/MyIPInput/MyIPInput";
import MyInputs from "../../common/MyInput/MyInputs";
import {
  createContainerClone,
  getTypesBackUpReq,
} from "../../store/reducers/virtualMachineSlice";
import { myAlert } from "../../helpers/MyAlert";

const CloneModal = () => {
  const { cloneModal, cloneContainerData } = useSelector(
    (state) => state.stateSlice
  );

  const { listHosts } = useSelector((state) => state.requestSlice);
  const { listTypeBackUpContainers } = useSelector(
    (state) => state.virtualMachineSlice
  );

  const { typeid } = cloneContainerData;

  const dispatch = useDispatch();

  const closeCloneModal = () => {
    dispatch(setCloneModal(false));
    dispatch(clearCloneContainerData());
  };

  function onChange(e) {
    const { name, value } = e.target;
    dispatch(setCloneContainerData({ ...cloneContainerData, [name]: value }));
  }

  async function onChangeSelect(item) {
    const { name } = item;

    if (name == "target_node_guid") {
      await dispatch(getTypesBackUpReq(item?.guid_node)).unwrap();
    }
    dispatch(
      setCloneContainerData({
        ...cloneContainerData,
        [name]: item,
      })
    );
  }

  const cloneContainer = async (e) => {
    e.preventDefault();
    const requestData = {
      target_storage_backup:
        cloneContainerData?.target_storage_backup?.storage_name,
      guid_vm: cloneContainerData?.guid_vm,
      target_storage_vm: cloneContainerData?.target_storage_vm.value,
      target_node_guid: cloneContainerData?.target_node_guid?.value,
      description: cloneContainerData?.description,
      container_name: cloneContainerData?.container_name,
      ip_adress: cloneContainerData?.ip_adress,
      mask: cloneContainerData?.mask?.value,
      gateway: cloneContainerData?.gateway,
    };

    const response = await dispatch(createContainerClone(requestData)).unwrap();

    if (response?.res == 1) {
      myAlert("Клонирование контейнера начато, следите в странице логов");
      closeCloneModal();
    } else {
      myAlert("Не удалось отправить в очередь на слонирование");
    }
  };

  const updatedHostList = listHosts.filter((host) => host?.host_status == 1);

  const listTypes = transformListsForHost(updatedHostList, "guid", "host_name");

  const listTargetStorage = [{ id: 1, label: "local-lvm", value: "local-lvm" }];

  const listMask = [
    { id: 1, label: "/16", value: "/16" },
    { id: 2, label: "/24", value: "/24" },
    { id: 3, label: "/32", value: "/32" },
  ];

  const typeMashine = typeid == "qemu" ? "вертуалки" : "контейнера";

  return (
    <Modals
      openModal={cloneModal}
      setOpenModal={closeCloneModal}
      title={`Клонирование ${typeMashine}`}
    >
      <form action="cloneContainer" onSubmit={cloneContainer}>
        <MyInputs
          title={`Название  ${typeMashine}`}
          onChange={onChange}
          name={"container_name"}
          value={cloneContainerData?.container_name}
          required={true}
        />

        <MyInputs
          title={`Описание  ${typeMashine}`}
          onChange={onChange}
          name={"description"}
          value={cloneContainerData?.description}
          required={true}
        />
        <br />

        <MySelects
          list={listTypes}
          initText={"Выбрать"}
          onChange={onChangeSelect}
          nameKey={"target_node_guid"}
          value={cloneContainerData?.target_node_guid}
          title={"Выберите целевой хост для востановления"}
        />

        <br />

        <MySelects
          list={listTypeBackUpContainers?.hosts}
          initText={"Выбрать"}
          onChange={onChangeSelect}
          nameKey={"target_storage_backup"}
          value={cloneContainerData?.target_storage_backup}
          title={
            "Хранилище для бекапа \n\n (Для востановления на том же хосте local, на другом хосте px-huawei)"
          }
        />

        <br />

        <MySelects
          list={listTargetStorage}
          initText={"Выбрать"}
          onChange={onChangeSelect}
          nameKey={"target_storage_vm"}
          value={cloneContainerData?.target_storage_vm}
          title={"Целевое хранилище для востановления"}
        />

        {typeid !== "qemu" && (
          <>
            <MyIPInput
              title={"IP контейнера"}
              onChange={onChange}
              name={"ip_adress"}
              value={cloneContainerData?.ip_address}
              required={true}
            />

            <br />
            <MySelects
              list={listMask}
              initText={"Выбрать"}
              onChange={onChangeSelect}
              nameKey={"mask"}
              value={cloneContainerData?.mask}
              title={"Маска подсети"}
            />

            <MyIPInput
              title={"Шлюз"}
              onChange={onChange}
              name={"gateway"}
              value={cloneContainerData?.ip_address}
              required={true}
            />
          </>
        )}

        <div className="saveStandart">
          <button type="submit">Клонировать</button>
        </div>
      </form>
    </Modals>
  );
};

export default CloneModal;
