import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/////// imgs
import container from "../../../assets/icons/menu/box2.svg";
import virtualka from "../../../assets/icons/tv.svg";
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
import keyIncon from "../../../assets/icons/key.svg";
import lookEye from "../../../assets/icons/eye-look.svg";
import noLookEye from "../../../assets/icons/eye-no-look.svg";

////// styles
import "./style.scss";

////// fns
import { setOpenAddFiles } from "../../../store/reducers/stateSlice";
import { setOpenModaStartCont } from "../../../store/reducers/stateSlice";
import { setOpenModalKeyCont } from "../../../store/reducers/stateSlice";
import { setOpenModals } from "../../../store/reducers/stateSlice";
import { setOpenModaDelCont } from "../../../store/reducers/stateSlice";
import { setOpenModaDelGroup } from "../../../store/reducers/stateSlice";
import { setOpenModaStoppedCont } from "../../../store/reducers/stateSlice";
import { setOpenModalAddGroup } from "../../../store/reducers/stateSlice";
import { setOpenModalBackUp } from "../../../store/reducers/stateSlice";
import { setTemporaryContainer } from "../../../store/reducers/stateSlice";
import { setOpenOSModal } from "../../../store/reducers/stateSlice";
import { setActiveContainer } from "../../../store/reducers/stateSlice";
import {
  getDataAcceptUsers,
  getDataForBackUp,
} from "../../../store/reducers/requestSlice";
import { getDiagramsContainers } from "../../../store/reducers/requestSlice";
import { getFilesInContainer } from "../../../store/reducers/requestSlice";
import { fixTimeCreateCont } from "../../../store/reducers/requestSlice";

////// components
import MemoryComp from "../MemoryComp/MemoryComp";

/////// helpers
import { secondsToDhms } from "../../../helpers/secondsToDhms";
import { setLookMoreInfo } from "../../../store/reducers/containersSlice";
const { REACT_APP_API_URL } = process.env;

const Containers = ({ item }) => {
  const { vm_id, vm_name, vm_comment, vm_uptime, host_name, del, files } = item;
  const { vm_cpu_usage, vm_cpu, vm_ram_usage_mb, vm_ram_mb, guid, info } = item;
  const { icon_url } = item;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { lookMoreInfo } = useSelector((state) => state.containersSlice);
  const { activeContainer, openModalBackUp } = useSelector(
    (state) => state.stateSlice
  );

  const clickVmId = () => {
    ///// перекидываю на другую (постороннюю) ссылку
    // window.open(
    //   `http://localhost:3000/vnc?vnc_key=${guid}`,
    //   "_blank",
    //   "noopener,noreferrer"
    // );
    navigate(`/vnc/${guid}`);
  };

  const clickContainer = () => {
    dispatch(setActiveContainer(guid)); //// делаю активным нажатый контейнер
    dispatch(getDiagramsContainers(guid)); //// для get диграмм контейнеров
  };

  const openModalEdit = () => {
    dispatch(setTemporaryContainer({ guid, vm_comment }));
    //// открываю модалку для редактирования и подставля. во временный state данные
  };

  const openOSModal = () => dispatch(setOpenOSModal(guid));
  //// открываю модалку выбора операц. системы

  const openAddFilesFN = () => dispatch(getFilesInContainer(guid));
  ///// get файлы каждого контейнера
  //// внутри него открываю модалку для добавления файлов в контейнер

  const openModalAddGroup = () => {
    dispatch(setOpenModalAddGroup(guid)); // (guid - guid контейнера)
    //// открываю модалку для добавления контейнера в группу
    dispatch(getDataAcceptUsers(guid)); // (guid - guid контейнера)
    //// запрос на получения списка для доступов пользователей и для получения обычных user
  };

  const openModalFixTime = () => dispatch(fixTimeCreateCont({ guid_vm: guid }));
  ////  фиксирование времени создания контейнера

  const openModalBackUpFN = () => {
    ////  BackUp контейнера через запрос
    const obj = { name: `${vm_id} - ${vm_name} ${host_name}`, guid };
    dispatch(setOpenModalBackUp({ ...openModalBackUp, ...obj }));
    dispatch(getDataForBackUp(guid));
    //// get данные для бэкапа
  };

  const openModalDelInGroup = () => dispatch(setOpenModaDelGroup(guid));
  //// модалка для удаления контейнера с группы

  const openModalOffContainer = () => dispatch(setOpenModaStoppedCont(guid));
  //// модалка для выключения контейнера

  const delContainer = () => dispatch(setOpenModaDelCont(guid));
  //// модалка для удаления контейнера

  const openKeyInfo = () => {
    dispatch(setOpenModalKeyCont(guid));
    //// модалка для доступов отображения контейнеров клиентам
    dispatch(getDataAcceptUsers(guid)); // (guid - guid контейнера)
    //// запрос на получения списка для доступов пользователей и для получения обычных user
  };

  const handleVirtualMachine = (type) => {
    const obj = { 1: "Запустить ", 2: "Перезагрузить", 3: "Выключить " };
    const text = `${obj?.[type]} виртуальную машину ${vm_id} ?`;
    dispatch(setOpenModaStartCont({ guid, vm_id: text }));
    //// для модалки запуска, обновления и остановки запуска контейнера
  };

  const openLookMoreInfo = () => dispatch(setLookMoreInfo(item));
  //// открытие модалки для просмотра болеее подробной информации

  const active = activeContainer == guid ? "containerActive" : "";

  const objType = { cont: container, virt: virtualka, service: container };

  const objTypeData = {
    1: "containerColor",
    2: "virtualkaColor",
    3: "serviceColor",
  };

  const haveKeyType = "yes"; /// check

  function nums() {
    return Math.floor(Math.random() * 3) + 1;
  }

  return (
    <div
      // className={`containerMain ${active} ${objTypeData?.["virtualka"]}`}
      className={`containerMain ${active} ${objTypeData?.[nums()]}`}
      onClick={clickContainer}
    >
      <div className="containerMain__inner">
        {/* ///// */}
        <div className="bottom" onClick={clickVmId}>
          <div className={`numIndex ${haveKeyType ? "" : "noActivce"}`}>
            <img src={objType?.["virt"]} alt="[]" />
            <p>{vm_id}</p>
          </div>
        </div>

        {/* ///// */}
        <div className="editBlock">
          <div className="editBlock__inner">
            <button className="edit" onClick={openModalEdit}>
              <img src={edit} alt="" />
            </button>
            <button className="OS" onClick={openOSModal}>
              {icon_url ? (
                <img src={`${REACT_APP_API_URL}${icon_url}`} alt="os" />
              ) : (
                <img src={round} alt="os" />
              )}
            </button>
          </div>
          <div className="editBlock__inner">
            {!!info && (
              <button className="edit" onClick={openLookMoreInfo}>
                <img src={!!lookMoreInfo?.guid ? noLookEye : lookEye} alt="" />
              </button>
            )}
          </div>
        </div>

        {/* ///// */}
        <div className="titles">
          <div className="mainInfo">
            <b className="hostName">
              [{host_name}] <p className="container_name"> - {vm_name}</p>
            </b>
          </div>
          <span className="description">{vm_comment}</span>
        </div>

        {/* ///// */}
        <div className="memory">
          <div className="memory__inner">
            <button onClick={openAddFilesFN}>
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
                <p>{getConfigValue(info, "size")}</p>
              </div>
            )}
          </div>
        </div>

        {/* ///// */}
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
            <button onClick={openModalBackUpFN}>
              <img src={download} alt="#" />
              <span className="moreInfoLeft">BackUp</span>
            </button>
            <button onClick={openKeyInfo}>
              <img src={keyIncon} alt="#" />
            </button>

            <button onClick={() => handleVirtualMachine(1)}>
              <img src={playCircle} alt="#" />
              <span className="moreInfoLeft">Запустить сервер</span>
            </button>
            <button onClick={() => handleVirtualMachine(2)}>
              <img src={repeat} alt="#" />
              <span className="moreInfoLeft">Перезагрузить сервер</span>
            </button>
            <button onClick={() => handleVirtualMachine(3)}>
              <img src={stopCircle} alt="#" />
              <span className="moreInfoLeft">Мягкое выключение</span>
            </button>

            <button onClick={openModalDelInGroup}>
              <img src={minus} alt="#" />
              <span className="moreInfoLeft">Удалить из списка</span>
            </button>
            <button onClick={openModalOffContainer}>
              <img src={warning} alt="#" />
              <span className="moreInfoLeft">
                Жёсткое выключение (!может вызвать повреждение файлов на
                высоконагруженных серверах!)
              </span>
            </button>
            {!del && (
              <button className="deleteBtn" onClick={delContainer}>
                Удалить
              </button>
            )}
          </div>
          <div className={`key ${del ? "actions__key" : ""}`}>
            <p>({secondsToDhms(vm_uptime)})</p>
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
