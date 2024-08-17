import React from "react";
import { useDispatch, useSelector } from "react-redux";

/////// imgs
import container from "../../../assets/icons//menu/box.svg";
import edit from "../../../assets/icons/edit.svg";
import editBlue from "../../../assets/icons/editBlue.svg";
import skrepka from "../../../assets/icons/skrepka.svg";

//// imgs
import calendarX from "../../../assets/icons/calendar-x.svg";
import download from "../../../assets/icons/download.svg";
import addGroup from "../../../assets/icons/folder-plus.svg";
import moreInfo from "../../../assets/icons/moreInfo.svg";
import warning from "../../../assets/icons/warning.svg";
import playCircle from "../../../assets/icons/play-circle.svg";
import stopCircle from "../../../assets/icons/stop-circle.svg";
import repeat from "../../../assets/icons/repeat.svg";
import deleteIcon from "../../../assets/icons/delete.svg";
import minus from "../../../assets/icons/circle-minus.svg";
import dataBaseIcon from "../../../assets/images/memoryImgs/database.png";
import round from "../../../assets/images/OS/round.png";

////// styles
import "./style.scss";

////// fns
import {
  setOpenAddFiles,
  setOpenModaDelGroup,
  setOpenModalAddGroup,
  setOpenOSModal,
  setTemporaryContainer,
} from "../../../store/reducers/stateSlice";
import { setActiveContainer } from "../../../store/reducers/stateSlice";

////// components
import MemoryComp from "../MemoryComp/MemoryComp";
import { fixTimeCreateCont } from "../../../store/reducers/requestSlice";

const Containers = ({ item }) => {
  const { id, host_name, container_name, description } = item;
  const { key, del, percent, GB, guid, info } = item;
  /////
  const { vm_id, vm_name, vm_comment } = item;
  const { vm_cpu_usage, vm_cpu, vm_ram_usage_mb, vm_ram_mb } = item;

  const dispatch = useDispatch();

  const { activeContainer } = useSelector((state) => state.stateSlice);

  const clickContainer = () => dispatch(setActiveContainer(guid));

  const openModalEdit = () => {
    //// открываю модалку для редактирования и подставля. во временный state данные
    dispatch(setTemporaryContainer({ guid, vm_comment }));
  };

  const openOSModal = () => dispatch(setOpenOSModal(true));
  //// открываю модалку выбора операц. системы

  const openAddFiles = () => dispatch(setOpenAddFiles(guid));
  //// открываю модалку для добавления файлов в контейнер\

  const openModalAddGroup = () => dispatch(setOpenModalAddGroup(guid));
  //// открываю модалку для добавления контейнера в группу

  const openModalFixTime = () => dispatch(fixTimeCreateCont(guid));
  ////  фиксирование времени создания контейнера

  const openModalDelInGroup = () => dispatch(setOpenModaDelGroup(guid));
  //// модалка для выключения контейнера

  const active = activeContainer == guid ? "containerActive" : "";

  return (
    <div className={`containerMain ${active}`} onClick={clickContainer}>
      <div className="containerMain__inner">
        <div className="numIndex">
          <div>
            <img src={container} alt="[]" />
            <p>{vm_id}</p>
          </div>
        </div>

        <div className="editBlock">
          <button className="edit" onClick={openModalEdit}>
            <img src={edit} alt="" />
          </button>
          <button className="OS" onClick={openOSModal}>
            <img src={round} alt="os" />
          </button>
          {/* <button className="edit">
            <img src={editBlue} alt="" />
          </button> */}
        </div>
        <div className="mainInfo">
          <div>
            <b className="hostName">[{host_name}] </b>
            <p className="container_name"> - {vm_name}</p>
          </div>
          <span className="description">{vm_comment}</span>
        </div>
      </div>

      <div className="GB__block">
        <div className="memory">
          <button onClick={openAddFiles}>
            <img src={skrepka} alt="#" />
          </button>
          <MemoryComp
            node_cpu_usage={vm_cpu_usage}
            node_cpu={vm_cpu}
            node_ram_usage={vm_ram_usage_mb}
            node_ram_mb={vm_ram_mb}
            array_storages={[]}
          />
          {info && (
            <div className="GB_dataBase">
              <div>
                <img src={dataBaseIcon} alt="#" />
              </div>
              <p>{getConfigValue(info, "size")}6G</p>
            </div>
          )}
        </div>

        <div className="actions">
          <div className="actions__inner">
            <button onClick={openModalAddGroup}>
              <img src={addGroup} alt="#" />
              <span className="moreInfoLeft">Добавить в группу</span>
            </button>
            <button onClick={openModalFixTime}>
              <img src={calendarX} alt="#" />
              <span className="moreInfoLeft">Зафиксировать время создания</span>
            </button>
            <button>
              <img src={download} alt="#" />
              <span className="moreInfoLeft">BackUp</span>
            </button>
            {/* <button>
              <img src={keyIncon} alt="#" />
              <span className="moreInfoLeft"></span>
            </button> */}
            <button>
              <img src={playCircle} alt="#" />
              <span className="moreInfoLeft">Запустить сервер</span>
            </button>
            <button>
              <img src={repeat} alt="#" />
              <span className="moreInfoLeft">Перезагрузить сервер</span>
            </button>
            <button>
              <img src={stopCircle} alt="#" />
              <span className="moreInfoLeft">Мягкое выключение</span>
            </button>
            <button onClick={openModalDelInGroup}>
              <img src={minus} alt="#" />
              <span className="moreInfoLeft">Удалить из списка</span>
            </button>
            <button>
              <img src={warning} alt="#" />
              <span className="moreInfoLeft">
                Жёсткое выключение (!может вызвать повреждение файлов на
                высоконагруженных серверах!)
              </span>
            </button>
          </div>
          <div className={`key ${!del ? "actions__key" : ""}`}>
            <p>({key})</p>
            {del && <button className="deleteBtn">Удалить</button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Containers;

const getConfigValue = (configString, key) => {
  const regex = new RegExp(`${key}=([^\\s]+)`, "m");
  const match = configString?.match(regex);
  return match ? match[1] : null;
};
