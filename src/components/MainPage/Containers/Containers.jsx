//////// hooks
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/////// imgs
import container from "../../../assets/icons/menu/box2.svg";
import virtualka from "../../../assets/icons/tv.svg";
import services from "../../../assets/icons/menu/database.svg";
import edit from "../../../assets/icons/edit.svg";
import migrate from "../../../assets/icons/migrateLogo.png";

//// imgs
import calendarX from "../../../assets/icons/calendar-x.svg";
import addGroup from "../../../assets/icons/folder-plus.svg";
import warning from "../../../assets/icons/warning.svg";
import minus from "../../../assets/icons/circle-minus.svg";
import dataBaseIcon from "../../../assets/images/memoryImgs/database.png";
import round from "../../../assets/images/OS/round.png";
import keyIncon from "../../../assets/icons/key.svg";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";

////// styles
import "./style.scss";

////// fns
import {
  setCloneContainerData,
  setCloneModal,
  setMigrateContainerData,
  setMigrateModal,
  setOpenModaStartCont,
} from "../../../store/reducers/stateSlice";
import { setOpenModalKeyCont } from "../../../store/reducers/stateSlice";
import { setOpenModaDelCont } from "../../../store/reducers/stateSlice";
import { setOpenModaDelGroup } from "../../../store/reducers/stateSlice";
import { setOpenModaStoppedCont } from "../../../store/reducers/stateSlice";
import { setOpenModalAddGroup } from "../../../store/reducers/stateSlice";
import { setTemporaryContainer } from "../../../store/reducers/stateSlice";
import { setOpenOSModal } from "../../../store/reducers/stateSlice";
import { setActiveContainer } from "../../../store/reducers/stateSlice";
import { getDataAcceptUsers } from "../../../store/reducers/requestSlice";
import { getDiagramsContainers } from "../../../store/reducers/requestSlice";
import { getFilesInContainer } from "../../../store/reducers/requestSlice";
import { fixTimeCreateCont } from "../../../store/reducers/requestSlice";
import { setLookMoreInfo } from "../../../store/reducers/containersSlice";

////// components
import MemoryComp from "../MemoryComp/MemoryComp";
import { Tooltip } from "@mui/material";

/////// helpers
import { secondsToDhms } from "../../../helpers/secondsToDhms";
import { getTypesBackUpReq } from "../../../store/reducers/virtualMachineSlice";
import BackUp from "../ActionsContainer/BackUp/BackUp";
import Shupdown from "../ActionsContainer/Shupdown/Shupdown";
import ReloadVM from "../ActionsContainer/ReloadVM/ReloadVM";
import StartVM from "../ActionsContainer/StartVM/StartVM";

/////// env
const { REACT_APP_API_URL } = process.env;

const Containers = ({ item }) => {
  const { vm_id, vm_name, vm_comment, vm_uptime, host_name, del, files } = item;
  const { vm_cpu_usage, vm_cpu, vm_ram_usage_mb, vm_ram_mb, guid, info } = item;
  const { guid_node, node_name, guid_host } = item;
  const { icon_url, statusid, typeid, service_check } = item;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { activeContainer, cloneContainerData, migrateContainerData } =
    useSelector((state) => state.stateSlice);

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
    if (guid == activeContainer) return;
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

  const openCloneContainerModel = async () => {
    await dispatch(getTypesBackUpReq(guid_node)).unwrap();
    dispatch(setCloneModal(true));
    const past = {
      ...cloneContainerData,
      guid_vm: guid,
      target_node_guid: { label: node_name, value: guid_host },
      typeid: typeid,
    };
    dispatch(setCloneContainerData(past));
  };

  const openMigrateModal = async () => {
    await dispatch(getTypesBackUpReq(guid_node)).unwrap();
    dispatch(setMigrateModal(true));
    const past = {
      ...migrateContainerData,
      guid_vm: guid,
      target_node_guid: { label: node_name, value: guid_host },
    };
    dispatch(setMigrateContainerData(past));
  };

  const active = activeContainer == guid ? "containerActive" : "";

  const objTypeImgs = { qemu: virtualka, lxc: container };

  const objStatusType = {
    running: "rgb(70,150,45)",
    stopped: "#514848",
    deleted: "#514848",
  };

  const checkActive =
    objStatusType?.[statusid] == "rgb(70,150,45)" ? true : false;

  return (
    <div className={`containerMain  ${active}`} onClick={clickContainer}>
      <div className="containerMain__inner">
        {/* ///// */}
        <div className="bottom" onClick={clickVmId}>
          <div
            className={`numIndex`}
            style={{ background: objStatusType?.[statusid] }}
          >
            {!!service_check ? (
              <img src={services} alt="[]" className="services" />
            ) : (
              <img src={objTypeImgs?.[typeid]} alt="[]" />
            )}
            <p>{vm_id}</p>
          </div>
        </div>

        {/* ///// */}
        <div className="editBlock">
          <div className="editBlock__inner">
            <button className="edit" onClick={openModalEdit}>
              <img src={edit} alt="edit" />
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
                <VisibilityIcon sx={{ fill: "#66b4ff" }} />
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
          <span className="description">
            {vm_comment}
            {item?.files?.map((i, index) => (
              <a href={i?.path} target="_blank" key={index}>
                {i?.original_name} {index < item?.files?.length - 1 && ", "}
              </a>
            ))}
          </span>
        </div>

        {/* ///// */}
        <div className={`memory ${!checkActive ? "noActiveMemory" : ""}`}>
          <div className="memory__inner">
            <Tooltip title="Загрузить файлы" placement="top">
              <button onClick={openAddFilesFN}>
                <AttachFileIcon sx={{ fill: "#008000" }} />
              </button>
            </Tooltip>
            <MemoryComp
              node_cpu_usage={vm_cpu_usage}
              node_cpu={vm_cpu}
              node_ram_usage={vm_ram_usage_mb}
              node_ram_mb={vm_ram_mb}
              array_storages={[]}
            />
            {!!info && (
              <div className="GB_dataBase">
                <div>
                  <img src={dataBaseIcon} alt="#" />
                </div>
                <p>{getConfigValue(info, "size")}</p>
              </div>
            )}
          </div>
        </div>

        {/* /////  checkActive */}
        <div className={`actions noActions`}>
          <div className="actions__inner">
            <>
              <Tooltip title="Мигрировать" placement="top">
                <button onClick={openMigrateModal}>
                  <img src={migrate} alt="#" />
                </button>
              </Tooltip>

              <Tooltip title="Клонировать" placement="top">
                <button onClick={openCloneContainerModel}>
                  <FileCopyOutlinedIcon sx={{ width: 22, height: 22 }} />
                </button>
              </Tooltip>

              <Tooltip title="Добавить в группу" placement="top">
                <button onClick={openModalAddGroup}>
                  <img src={addGroup} alt="#" />
                </button>
              </Tooltip>

              {checkActive && (
                <>
                  <Tooltip title="Зафиксировать время создания" placement="top">
                    <button onClick={openModalFixTime}>
                      <img src={calendarX} alt="#" />
                    </button>
                  </Tooltip>
                  {/* <Tooltip title="Перезагрузить сервер" placement="top">
                    <button onClick={() => handleVirtualMachine(2)}> //// delete
                      <img src={repeat} alt="#" />
                    </button>
                  </Tooltip> */}
                  <ReloadVM item={item} />
                  <Shupdown item={item} />
                </>
              )}

              <BackUp item={item} />

              <Tooltip title="Пользователи" placement="top">
                <button onClick={openKeyInfo}>
                  <img src={keyIncon} alt="#" />
                </button>
              </Tooltip>

              {!checkActive && <StartVM item={item} />}
            </>

            <Tooltip title="Удалить из списка" placement="top">
              <button onClick={openModalDelInGroup}>
                <img src={minus} alt="#" />
              </button>
            </Tooltip>

            {checkActive && (
              <>
                {/* <Tooltip
                  title=" Жёсткое выключение (!может вызвать повреждение файлов на
                высоконагруженных серверах!)"
                  placement="top"
                >
                  <button onClick={openModalOffContainer}>
                    <img src={warning} alt="#" />
                  </button>
                </Tooltip> */}
              </>
            )}
            <button className="deleteBtn" onClick={delContainer}>
              Удалить
            </button>
          </div>
          {checkActive && (
            <div className={`key ${del ? "actions__key" : ""}`}>
              <p>
                {!!secondsToDhms(vm_uptime)
                  ? `${secondsToDhms(vm_uptime)}`
                  : ""}
              </p>
            </div>
          )}
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
