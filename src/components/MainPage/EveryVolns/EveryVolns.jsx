//////// hooks
import React, { useEffect, useState } from "react";

//////// components
import { Draggable } from "react-beautiful-dnd";

/////// imgs
import water from "../../../assets/icons/water.svg";
import play from "../../../assets/icons/volns/play.svg";
import stop from "../../../assets/icons/volns/stop.svg";
import deleteIcon from "../../../assets/icons/delete.svg";
import migrateLogo from "../../../assets/icons/migrateLogo.png";

////// style
import "./style.scss";

/////// helpers
import { checkChangeTTL } from "../../../helpers/checkFNS";
import { myAlert } from "../../../helpers/MyAlert";
import { useSelector } from "react-redux";
import { setListVolns } from "../../../store/reducers/requestSlice";
import { useDispatch } from "react-redux";
import {
  setMigrateHostContainersData,
  setMigrateHostModal,
} from "../../../store/reducers/stateSlice";
import ConfirmModal from "../../../common/ConfirmModal/ConfirmModal";
import {
  startContainersAction,
  stopContainersAction,
} from "../../../store/reducers/virtualMachineSlice";

const EveryVolns = ({ list, title, onAddItem, guid, num, selectedColumn }) => {
  console.log(selectedColumn, "guid");

  const [action_type, setActionType] = useState(0);
  const [titleModal, setTitleModal] = useState("");
  const dispatch = useDispatch();
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const { listVolns } = useSelector((state) => state.requestSlice);
  const { migrateHostContainersData } = useSelector(
    (state) => state.stateSlice
  );

  const [inputValue, setInputValue] = useState("");
  const [activeVolns, setActiveVolns] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  const handleInputChange = (e) => {
    if (checkChangeTTL(e?.target?.value)) {
      setInputValue(e?.target?.value);
    }
  };

  const handleSelectAllChange = () => {
    if (selectAllChecked) {
      setSelectedItems([]);
    } else {
      setSelectedItems(list.map((item) => item.guid));
    }
    setSelectAllChecked(!selectAllChecked);
  };

  useEffect(() => {
    setSelectedItems([]);
    setSelectAllChecked(false);
  }, [list]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue?.trim()) {
      onAddItem(inputValue?.trim());
      setInputValue("");
    }
  };

  const handleCheckboxChange = (itemGuid) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(itemGuid)
        ? prevSelected.filter((guid) => guid !== itemGuid)
        : [...prevSelected, itemGuid]
    );
  };

  console.log(selectedItems, "selectedItems");

  const startVoln = async (type) => {
    if (type == 3) {
      const guid_vm_list = selectedItems.map((item) => ({
        guid_vm: item,
      }));

      dispatch(
        setMigrateHostContainersData({
          ...migrateHostContainersData,
          guid_vm_list,
        })
      );

      dispatch(setMigrateHostModal(true));
    } else {
      setActionType(type);
      setTitleModal(
        `${
          type == 2
            ? "Вы действительно хотите остановить список контейнеров"
            : "Вы действительно хотите запустить список контейнеров"
        }`
      );
    }
  };

  const startContainers = async () => {
    const responseData = {
      vm_guid_list: list
        .filter((item) => selectedItems.includes(item.guid)) // Фильтруем только выбранные элементы
        .map((item) => ({ guid_vm: item.guid })),
      action: "start",
    };

    const response = await dispatch(
      startContainersAction(responseData)
    ).unwrap();

    if (response?.res == 1) {
      myAlert("Контейнеры успешно запущены, следите в логах");
      setActionType();
    } else {
      myAlert("Не удалось запустить контейнеры");
    }
  };

  const stopContainers = async () => {
    const responseData = {
      vm_guid_list: list
        .filter((item) => selectedItems.includes(item.guid)) // Фильтруем только выбранные элементы
        .map((item) => ({ guid_vm: item.guid })),
      action: "stop",
    };

    const response = await dispatch(
      stopContainersAction(responseData)
    ).unwrap();

    if (response?.res == 1) {
      myAlert("Контейнеры успешно остановлены, следите в логах");
      setActionType();
    } else {
      myAlert("Не удалось остановить контейнеры");
    }
  };

  const activateVolns = async () => {};

  const deleteVolns = (type) => {
    dispatch(setListVolns({ ...listVolns, clear: [] }));
    myAlert(`Началось удаление ВПС (Волна ${num})`);
  };

  const check = activeVolns === guid;

  return (
    <div className="everyVolns">
      <div className="header">
        <h6>{title}</h6>
        <div className="title">
          <img src={water} alt="..." />
          <span>{list?.length}</span>
          <input
            type="checkbox"
            checked={selectAllChecked}
            onChange={handleSelectAllChange}
            className="select-all-checkbox"
          />
        </div>
      </div>

      <div className="list hoverScroll">
        {list?.map((item, index) => (
          <Draggable key={item?.guid} draggableId={item?.guid} index={index}>
            {(provided) => (
              <div className="everyInner">
                <span
                  ref={provided?.innerRef}
                  {...provided?.draggableProps}
                  {...provided?.dragHandleProps}
                >
                  {item?.vm_id}
                </span>

                <input
                  className="checkbox"
                  type="checkbox"
                  checked={selectedItems.includes(item.guid)}
                  onChange={() => handleCheckboxChange(item.guid)}
                />
                {/* <div className={check ? "load" : ""}></div> */}
              </div>
            )}
          </Draggable>
        ))}
      </div>

      <div className="actions">
        {num == 1 ? (
          <button onClick={() => deleteVolns(3)}>
            <img src={deleteIcon} alt="save" />
            <span className="moreInfoLeft">Очистить</span>
          </button>
        ) : (
          <>
            <button onClick={() => startVoln(2)}>
              <img src={stop} alt="stop" />
              <span className="moreInfoLeft">Остановить</span>
            </button>

            <button onClick={() => startVoln(1)}>
              <img src={play} alt="play" />
              <span className="moreInfoLeft">Запустить</span>
            </button>

            <button onClick={() => startVoln(3)}>
              <img src={migrateLogo} alt="migrate" />
              <span className="moreInfoLeft">Мигрировать</span>
            </button>
          </>
        )}
      </div>

      <ConfirmModal
        state={action_type > 0}
        title={titleModal}
        yes={() => {
          if (action_type === 1) {
            startContainers();
          } else if (action_type == 2) {
            stopContainers();
          }
          setActionType(0);
        }}
        no={() => setActionType(0)}
      />
    </div>
  );
};

export default EveryVolns;
