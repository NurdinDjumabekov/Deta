import React, { useState, useEffect } from "react";
import Modals from "../../../../common/Modals/Modals";

import download from "../../../../assets/icons/download.svg";
import { useSelector, useDispatch } from "react-redux";
import { myAlert } from "../../../../helpers/MyAlert";
import { Tooltip } from "@mui/material";
import MySelects from "../../../../common/MySelects/MySelects";
import { listFast, listSnaps } from "../../../../helpers/LocalData";
import {
  backUpContainerFN,
  getDataForBackUp,
} from "../../../../store/reducers/actionsContaiersSlice";

//// styles
import "./style.scss";
import LogsModal from "../../../../common/LogsModal/LogsModal";
import io from "socket.io-client"; // Подключаем socket.io-client

const url_socket = "https://dd-api.ibm.kg";

const BackUp = ({ guid, vm_id, vm_name }) => {
  const dispatch = useDispatch();
  const { dataForBackUp } = useSelector((state) => state.actionsContaiersSlice);
  const [dataBackUp, setDataBackUp] = useState({});
  const [viewLog, setViewLog] = useState(false);
  const [logs, setLogs] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!viewLog) return; // Если окно закрыто, не подключаем сокет

    const newSocket = io(url_socket);
    setSocket(newSocket);

    const room = `vm-${guid}-backup`; // Генерируем имя комнаты WebSocket

    newSocket.emit("join_room", room); // Присоединяемся к комнате

    newSocket.on("backup_update", (data) => {
      console.log("🔄 Лог обновления:", data);
      setLogs((prevLogs) => [...prevLogs, data]); // Добавляем новые логи
    });

    return () => {
      newSocket.emit("leave_room", room); // Отключаемся от комнаты
      newSocket.disconnect();
      setSocket(null);
    };
  }, [viewLog]);

  const openModalBackUpFN = async () => {
    const res = await dispatch(getDataForBackUp({ guid_vm: guid })).unwrap();
    if (!!res?.[0]?.guid) {
      const obj = {
        name: `${vm_id} - ${vm_name}`,
        type: { value: res?.[0]?.guid, label: res?.[0]?.storage_name },
        fasts: { value: "zstd", label: "ZSTD (fast and good)" },
        snaps: { value: "snapshot", label: "Snapshot" },
        guid,
      };
      setDataBackUp(obj);
    }
  };

  const onChangeSelect = (item) => {
    setDataBackUp({ ...dataBackUp, [item?.name]: item });
  };

  const backUpContainer = async () => {
    if (!!!dataBackUp?.type?.value) {
      return myAlert("Выберите хранилище", "error");
    }
    const send = {
      guid_vm: dataBackUp?.guid,
      storage: dataBackUp?.type?.value,
      compress: dataBackUp?.fasts?.value,
      mode: dataBackUp?.snaps?.value,
    };

    const res = await dispatch(backUpContainerFN(send)).unwrap();

    if (res == 1) {
      setLogs([]); // Очищаем старые логи
      setViewLog(true); // Открываем модалку логов
    }
  };

  return (
    <>
      <Tooltip title="BackUp" placement="top">
        <button onClick={openModalBackUpFN}>
          <img src={download} alt="#" />
        </button>
      </Tooltip>

      <div className="backUpActions">
        <Modals
          openModal={!!dataBackUp?.guid}
          setOpenModal={() => setDataBackUp({})}
          title={`Бэкап сервера ${dataBackUp?.name}`}
        >
          <div className="addDns hostsEdit backUp__inner">
            <div className="backUp__main">
              <MySelects
                list={listFast}
                initText={"Выбрать"}
                onChange={onChangeSelect}
                nameKey={"fasts"}
                value={dataBackUp?.fasts}
                title={"Выберите режим"}
              />

              <MySelects
                list={dataForBackUp}
                initText={"Выбрать"}
                onChange={onChangeSelect}
                nameKey={"type"}
                value={dataBackUp?.type}
                title={"Выберите хранилище"}
              />

              <MySelects
                list={listSnaps}
                initText={"Выбрать"}
                onChange={onChangeSelect}
                nameKey={"snaps"}
                value={dataBackUp?.snaps}
                title={"Выберите режим"}
              />
            </div>
            <button className="addAction" onClick={backUpContainer}>
              Подтвердить
            </button>
          </div>
        </Modals>
      </div>

      {/* ЛОГИ БЭКАПА */}
      <LogsModal
        guid={guid}
        setViewLog={setViewLog}
        viewLog={viewLog}
        logs={logs}
      />
    </>
  );
};

export default BackUp;
