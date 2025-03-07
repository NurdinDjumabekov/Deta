////////// hooks
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

///////// icons
import download from "../../../../assets/icons/download.svg";

//////// components
import Modals from "../../../../common/Modals/Modals";
import MySelects from "../../../../common/MySelects/MySelects";
import MiniLoader from "../../../../common/MiniLoader/MiniLoader";
import { Tooltip } from "@mui/material";

/////// helpers
import { myAlert } from "../../../../helpers/MyAlert";
import { listFast, listSnaps } from "../../../../helpers/LocalData";
import { getDataVM } from "../../../../helpers/getDataVM";
import { textActionVM } from "../../../../helpers/returnColorStatus";

import {
  backUpContainerFN,
  getDataForBackUp,
  getStatusVMReq,
  logsActionsVM_FN,
  updateStatusVmReq,
} from "../../../../store/reducers/actionsContaiersSlice";

/////// style
import "./style.scss";

const BackUp = ({ item }) => {
  const { guid, vm_id, vm_name, status_action_backup } = item;

  const dispatch = useDispatch();
  const intervalRef = useRef(null);

  const { dataForBackUp, logsActionsVM } = useSelector(
    (state) => state.actionsContaiersSlice
  );
  const { activeUserService } = useSelector(
    (state) => state.actionsContaiersSlice
  );
  const { activeHost } = useSelector((state) => state.stateSlice);
  const [dataBackUp, setDataBackUp] = useState({});
  const [viewLogs, setViewLogs] = useState({});

  const openModalBackUpFN = async () => {
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
    setViewLogs(!!status_action_backup);
    dispatch(logsActionsVM_FN([]));
  };

  const onChangeSelect = (item) => {
    setDataBackUp((prev) => ({ ...prev, [item.name]: item }));
  };

  const backUpContainer = async () => {
    if (!dataBackUp?.type?.value) return myAlert("Выберите хранилище", "error");
    const send = {
      guid_vm: dataBackUp.guid,
      storage: dataBackUp.type.value,
      compress: dataBackUp.fasts.value,
      mode: dataBackUp.snaps.value,
    };
    const res = await dispatch(backUpContainerFN(send)).unwrap();
    if (res?.res == 1) {
      setViewLogs(true);
      getDataVM({ dispatch, activeHost, activeUserService });
    }
  };

  const sendType = { guid, name: "status_action_backup" };

  useEffect(() => {
    const MAX_RETRIES = 3; // Максимальное количество попыток
    let count = 0;

    const checkStatusVP = async () => {
      while (count < MAX_RETRIES) {
        try {
          const sendData = { upid: item?.backup_upid, guid: item?.guid };
          const res = await dispatch(getStatusVMReq(sendData)).unwrap();

          if (res.data.exitstatus === "OK" && res.data.status === "stopped") {
            // Успешный ответ - обновляем статус и выходим из цикла
            const result = await dispatch(updateStatusVmReq(sendType)).unwrap();

            if (result?.res === 1) {
              getDataVM({ dispatch, activeHost, activeUserService });
            }
            return;
          } else if (res.data.status === "running") {
            // продолжаем отправлять запрос каждые 5 сек
            if (intervalRef.current) return;
            intervalRef.current = setInterval(checkStatusVP, 5000);
            return;
          } else if (
            res.data.exitstatus !== "OK" &&
            res.data.status === "stopped"
          ) {
            // делаем еще 3 попытки
            count++;
            if (count >= MAX_RETRIES) {
              console.warn("Статус VM не изменился после 3 попыток");
              const sendData = { ...sendType, errorStatus: true };
              const result = await dispatch(
                updateStatusVmReq(sendData)
              ).unwrap();

              if (result?.res === 1) {
                getDataVM({ dispatch, activeHost, activeUserService });
              }
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
          }
        } catch (error) {
          const er = `Ошибка при запросе статуса VM (попытка ${count + 1}):`;
          myAlert(er, "error");
          console.error(er, error);
        }

        await new Promise((resolve) => setTimeout(resolve, 3000)); // Ожидание 3 сек перед повтором
      }
    };

    const load = async () => {
      if (!!dataBackUp.guid && !!status_action_backup) {
        if (intervalRef.current) return; // Если интервал уже запущен, не запускаем новый
        intervalRef.current = setInterval(checkStatusVP, 3000);
      } else {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    load();
    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [dataBackUp.guid, dispatch, item]);

  const closeModal = () => {
    dispatch(logsActionsVM_FN([]));
    setDataBackUp({});
  };

  return (
    <div className="backUpActions">
      <div className="backUpActions__action">
        <Tooltip title="BackUp" placement="top">
          <button onClick={openModalBackUpFN}>
            <img src={download} alt="#" />
          </button>
        </Tooltip>
        <Modals
          openModal={!!dataBackUp.guid && !!!status_action_backup && !viewLogs}
          setOpenModal={closeModal}
          title={`Бэкап сервера ${dataBackUp.name}`}
        >
          <div className="backUpActions__inner">
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
            <button className="btnAction btnAction2" onClick={backUpContainer}>
              Подтвердить
            </button>
          </div>
        </Modals>
      </div>
      <div className="backUpActions__logs">
        <Modals
          openModal={!!dataBackUp.guid && viewLogs}
          setOpenModal={closeModal}
          title={`Логи '${vm_name}'`}
        >
          <div className="logsContainer myScroll">
            {logsActionsVM.length > 0 ? (
              logsActionsVM.map((log, index) => (
                <p
                  key={index}
                  style={{
                    color: textActionVM(log.t)?.color,
                    fontWeight: textActionVM(log.t)?.fontWeight,
                    fontSize: textActionVM(log.t)?.size,
                  }}
                >
                  {log?.t}
                </p>
              ))
            ) : (
              <MiniLoader />
            )}
          </div>
        </Modals>
      </div>

      {/* {viewLog && (
        <LogsModal
          open={viewLog}
          onClose={() => setViewLog(false)}
          logs={logs}
        />
      )} */}
    </div>
  );
};

export default BackUp;
