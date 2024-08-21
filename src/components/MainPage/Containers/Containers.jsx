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
import keyIncon from "../../../assets/icons/key.svg";

////// styles
import "./style.scss";

////// fns
import { setOpenAddFiles } from "../../../store/reducers/stateSlice";
import { setOpenModals } from "../../../store/reducers/stateSlice";
import { setOpenModaDelCont } from "../../../store/reducers/stateSlice";
import { setOpenModaDelGroup } from "../../../store/reducers/stateSlice";
import { setOpenModaStoppedCont } from "../../../store/reducers/stateSlice";
import { setOpenModalAddGroup } from "../../../store/reducers/stateSlice";
import { setOpenModalBackUp } from "../../../store/reducers/stateSlice";
import { setTemporaryContainer } from "../../../store/reducers/stateSlice";
import { setOpenOSModal } from "../../../store/reducers/stateSlice";

import { setActiveContainer } from "../../../store/reducers/stateSlice";

////// components
import MemoryComp from "../MemoryComp/MemoryComp";
import { fixTimeCreateCont } from "../../../store/reducers/requestSlice";
import { secondsToDhms } from "../../../helpers/secondsToDhms";
import { Table, TableBody } from "@mui/material";
import { TableCell, TableContainer } from "@mui/material";
import { TableHead, TableRow } from "@mui/material";

const Containers = ({ item }) => {
  const { id, host_name, container_name, description } = item;
  const { key, del, percent, GB, guid, info } = item;
  /////
  const { vm_id, vm_name, vm_comment, vm_uptime } = item;
  const { vm_cpu_usage, vm_cpu, vm_ram_usage_mb, vm_ram_mb } = item;

  const dispatch = useDispatch();

  const { activeContainer, openModalBackUp } = useSelector(
    (state) => state.stateSlice
  );

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

  const openModalBackUpFN = () => {
    ////  BackUp контейнера через запрос
    const obj = { name: `${vm_id} - ${vm_name} ${host_name}`, guid };
    dispatch(setOpenModalBackUp({ ...openModalBackUp, ...obj }));
  };

  const openModalDelInGroup = () => dispatch(setOpenModaDelGroup(guid));
  //// модалка для удаления контейнера с группы

  const openModalOffContainer = () => dispatch(setOpenModaStoppedCont(guid));
  //// модалка для выключения контейнера

  const delContainer = () => dispatch(setOpenModaDelCont(guid));
  //// модалка для удаления контейнера

  const openKeyInfo = () => dispatch(setOpenModals(1));
  //// модалка для доступов отображения контейнеров клиентам

  const active = activeContainer == guid ? "containerActive" : "";

  return (
    <TableContainer>
      <Table>
        <TableBody
          className={`containerMain ${active}`}
          onClick={clickContainer}
        >
          <TableRow className="containerMain__inner">
            {/* ///// */}
            <TableCell className="bottom">
              <div className="numIndex">
                <img src={container} alt="[]" />
                <p>{vm_id}</p>
              </div>
              <div className="numIndexShadow">
                <img src={container} alt="[]" />
                <p>{vm_id}</p>
              </div>
            </TableCell>

            {/* ///// */}
            <TableCell className="editBlock">
              <div className="editBlock__inner">
                <button className="edit" onClick={openModalEdit}>
                  <img src={edit} alt="" />
                </button>
                <button className="OS" onClick={openOSModal}>
                  <img src={round} alt="os" />
                </button>
              </div>
              {/* <div className="editBlock__inner">
                <button className="edit">
                  <img src={editBlue} alt="" />
                </button>
                <button className="edit">
                  <img src={editBlue} alt="" />
                </button>
              </div> */}
            </TableCell>

            {/* ///// */}
            <TableCell className="titles">
              <div className="mainInfo">
                <b className="hostName">
                  [{host_name}] <p className="container_name"> - {vm_name}</p>
                </b>
              </div>
              <span className="description">{vm_comment}</span>
            </TableCell>

            {/* ///// */}
            <TableCell className="memory">
              <div className="memory__inner">
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
            </TableCell>

            {/* ///// */}
            <TableCell className="" style={{ width: "29%" }}>
              <div className="actions">
                <div className="actions__inner">
                  <button onClick={openModalAddGroup}>
                    <img src={addGroup} alt="#" />
                    <span className="moreInfoLeft">Добавить в группу</span>
                  </button>
                  <button onClick={openModalFixTime}>
                    <img src={calendarX} alt="#" />
                    <span className="moreInfoLeft">
                      Зафиксировать время создания
                    </span>
                  </button>
                  <button onClick={openModalBackUpFN}>
                    <img src={download} alt="#" />
                    <span className="moreInfoLeft">BackUp</span>
                  </button>
                  <button onClick={openKeyInfo}>
                    <img src={keyIncon} alt="#" />
                  </button>
                  {/* <button>
              <img src={playCircle} alt="#" />
              <span className="moreInfoLeft">Запустить сервер</span>
            </button> */}
                  {/* <button>
              <img src={repeat} alt="#" />
              <span className="moreInfoLeft">Перезагрузить сервер</span>
            </button> */}
                  {/* <button>
              <img src={stopCircle} alt="#" />
              <span className="moreInfoLeft">Мягкое выключение</span>
            </button> */}
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
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Containers;

const getConfigValue = (configString, key) => {
  const regex = new RegExp(`${key}=([^\\s]+)`, "m");
  const match = configString?.match(regex);
  return match ? match[1] : null;
};
