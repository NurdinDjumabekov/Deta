/////// hooks
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

////// imgs
import repeat from "../../../../assets/icons/repeat.svg";

////// components
import { Tooltip } from "@mui/material";
import Modals from "../../../../common/Modals/Modals";
import ConfirmModal from "../../../../common/ConfirmModal/ConfirmModal";
import MiniLoader from "../../../../common/MiniLoader/MiniLoader";

////// fns
import {
  getStatusVMReq,
  logsActionsVM_FN,
  reloadContainerFN,
  updateStatusVmReq,
} from "../../../../store/reducers/actionsContaiersSlice";

/////// helpers
import { getDataVM } from "../../../../helpers/getDataVM";
import { textActionVM } from "../../../../helpers/returnColorStatus";
import { myAlert } from "../../../../helpers/MyAlert";

/////// style
import "./style.scss";

const ReloadVM = React.memo(({ item }) => {
  const { guid, vm_id, vm_name, status_action_reload } = item;

  const dispatch = useDispatch();
  const intervalRef = useRef(null);

  const { logsActionsVM } = useSelector((state) => state.actionsContaiersSlice);
  const { activeUserService } = useSelector(
    (state) => state.actionsContaiersSlice
  );
  const { activeHost } = useSelector((state) => state.stateSlice);
  const [dataReload, setDataReload] = useState({});
  const [viewLogs, setViewLogs] = useState(false);

  const openModalBackUpFN = async () => {
    setDataReload({ name: `${vm_id} - ${vm_name}`, guid });
    setViewLogs(!!status_action_reload);
    dispatch(logsActionsVM_FN([]));
  };

  const shutdownContainer = async () => {
    const res = await dispatch(reloadContainerFN(dataReload)).unwrap();
    if (res?.res == 1) {
      setViewLogs(true);
      getDataVM({ dispatch, activeHost, activeUserService });
    }
  };

  const sendType = { guid, name: "status_action_reload" };

  useEffect(() => {
    const MAX_RETRIES = 3; // Максимальное количество попыток
    let count = 0;

    const checkStatusVP = async () => {
      while (count < MAX_RETRIES) {
        try {
          const sendData = { upid: item?.reload_upid, guid: item?.guid };
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

        await new Promise((resolve) => setTimeout(resolve, 3000)); // Ожидание 2 сек перед повтором
      }
    };

    const load = async () => {
      if (!!dataReload.guid && !!status_action_reload) {
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
  }, [dataReload.guid, dispatch, item]);

  const closeModal = () => {
    dispatch(logsActionsVM_FN([]));
    setDataReload({});
  };

  return (
    <div className="shupdownActions">
      <div className="shupdownActions__action">
        <Tooltip title="Перезагрузить" placement="top">
          <button onClick={openModalBackUpFN}>
            <img src={repeat} alt="#" />
          </button>
        </Tooltip>
        <ConfirmModal
          state={!!dataReload.guid && !!!status_action_reload && !viewLogs}
          title={`Перезагрузить ${dataReload.name}`}
          yes={shutdownContainer}
          no={closeModal}
        />
      </div>
      <div className="shupdownActions__logs">
        <Modals
          openModal={!!dataReload.guid && viewLogs}
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
    </div>
  );
});

export default ReloadVM;
