import React, { useState, useEffect, useRef, useCallback } from "react";
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
  getLogBackUp,
} from "../../../../store/reducers/actionsContaiersSlice";
import LogsModal from "../../../../common/LogsModal/LogsModal";
import socketIOClient from "socket.io-client";

const url_socket = "https://dd-api.ibm.kg";

const BackUp = ({ guid, vm_id, vm_name }) => {
  const dispatch = useDispatch();
  const { dataForBackUp } = useSelector((state) => state.actionsContaiersSlice);
  const [dataBackUp, setDataBackUp] = useState({});
  const [viewLog, setViewLog] = useState(false);
  const [logs, setLogs] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!viewLog) return;

    console.log("🟢 Подключаемся к WebSocket...", url_socket);
    const socket = socketIOClient(url_socket);
    socketRef.current = socket;

    socket.on(`vm-${guid}-backup`, (data) => {
      console.log("🔥 Пришли данные из WebSocket:", data);
      if (data.logs?.length) {
        setLogs((prevLogs) => [...prevLogs, ...data.logs]);
      }
    });

    return () => {
      console.log("🔴 Отключаем WebSocket...");
      socket.disconnect();
      socketRef.current = null;
    };
  }, [viewLog, guid]);

  const openModalBackUpFN = useCallback(async () => {
    const res = await dispatch(getDataForBackUp({ guid_vm: guid })).unwrap();
    if (!!res?.[0]?.guid) {
      setDataBackUp({
        name: `${vm_id} - ${vm_name}`,
        type: { value: res?.[0]?.guid, label: res?.[0]?.storage_name },
        fasts: { value: "zstd", label: "ZSTD (fast and good)" },
        snaps: { value: "snapshot", label: "Snapshot" },
        guid,
      });
    }
  }, [dispatch, guid, vm_id, vm_name]);

  const onChangeSelect = useCallback(
    (item) => setDataBackUp((prev) => ({ ...prev, [item.name]: item })),
    []
  );

  const backUpContainer = useCallback(async () => {
    if (!dataBackUp?.type?.value) return myAlert("Выберите хранилище", "error");

    const send = {
      guid_vm: dataBackUp.guid,
      storage: dataBackUp.type.value,
      compress: dataBackUp.fasts.value,
      mode: dataBackUp.snaps.value,
    };

    const res = await dispatch(backUpContainerFN(send)).unwrap();

    if (res === 1) {
      setLogs([]); // Очистка логов перед новым бэкапом
      setViewLog(true); // Открываем лог-модалку
    }
  }, [dispatch, dataBackUp]);

  return (
    <>
      <Tooltip title="BackUp" placement="top">
        <button onClick={openModalBackUpFN}>
          <img src={download} alt="#" />
        </button>
      </Tooltip>

      <div className="backUpActions">
        <Modals
          openModal={!!dataBackUp.guid}
          setOpenModal={() => setDataBackUp({})}
          title={`Бэкап сервера ${dataBackUp.name}`}
        >
          <div className="addDns hostsEdit backUp__inner">
            <div className="backUp__main">
              <MySelects
                list={listFast}
                initText="Выбрать"
                onChange={onChangeSelect}
                nameKey="fasts"
                value={dataBackUp.fasts}
                title="Выберите режим"
              />
              <MySelects
                list={dataForBackUp}
                initText="Выбрать"
                onChange={onChangeSelect}
                nameKey="type"
                value={dataBackUp.type}
                title="Выберите хранилище"
              />
              <MySelects
                list={listSnaps}
                initText="Выбрать"
                onChange={onChangeSelect}
                nameKey="snaps"
                value={dataBackUp.snaps}
                title="Выберите режим"
              />
            </div>
            <button className="addAction" onClick={backUpContainer}>
              Подтвердить
            </button>
          </div>
        </Modals>
      </div>

      {viewLog && (
        <LogsModal
          open={viewLog}
          onClose={() => setViewLog(false)}
          logs={logs}
        />
      )}
    </>
  );
};

export default BackUp;
