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
  getStatusVMReq,
  logsActionsVM_FN,
  updateStatusActionVM_Req,
  viewLogsFN,
} from "../../../../store/reducers/actionsContaiersSlice";
import {
  getContainers,
  getContainersInMenu,
} from "../../../../store/reducers/requestSlice";

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
    if (!!status_action_backup) setViewLogs(true);
    else setViewLogs(false);
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
      if (!!activeHost) dispatch(getContainers(activeHost));
      else {
        if (activeUserService?.type == 2) {
          const send = { guid_host: "", guid_service: activeUserService?.guid };
          dispatch(getContainersInMenu(send));
        } else if (activeUserService?.type == 3) {
          const send = { guid_host: "", guid_user: activeUserService?.guid };
          dispatch(getContainersInMenu(send));
        }
      }
    }
  };

  useEffect(() => {
    const load = async () => {
      if (!!dataBackUp.guid && !!status_action_backup) {
        if (intervalRef.current) return; // Если интервал уже запущен, не запускаем новый
        intervalRef.current = setInterval(async () => {
          try {
            const sendData = { upid: item?.backup_upid, guid: item?.guid };
            const res = await dispatch(getStatusVMReq(sendData)).unwrap();
            if (res.data.exitstatus == "OK" || res.data.status == "stopped") {
              const name = "status_action_backup";
              const result = await dispatch(
                updateStatusActionVM_Req({ guid, name })
              ).unwrap();
              if (result?.res == 1) {
                if (!!activeHost) dispatch(getContainers(activeHost));
                else {
                  if (activeUserService?.type == 2) {
                    const send = {
                      guid_host: "",
                      guid_service: activeUserService?.guid,
                    };
                    dispatch(getContainersInMenu(send));
                  } else if (activeUserService?.type == 3) {
                    const send = {
                      guid_host: "",
                      guid_user: activeUserService?.guid,
                    };
                    dispatch(getContainersInMenu(send));
                  }
                }
              }
            }
          } catch (error) {
            console.error(" Ошибка в getStatusVMReq:", error);
          }
        }, 3000);
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
          title={`Лог бэкапа '${vm_name}'`}
        >
          <div className="logsContainer myScroll">
            {logsActionsVM.length > 0 ? (
              logsActionsVM.map((log, index) => (
                <p
                  key={index}
                  style={{
                    color: log.t == "TASK OK" ? "green" : "",
                    fontWeight: log.t == "TASK OK" ? "500" : "",
                    fontSize: log.t == "TASK OK" ? 18 : 14,
                  }}
                >
                  {log?.t}
                </p>
              ))
            ) : (
              <p>Логи загружаются...</p>
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
