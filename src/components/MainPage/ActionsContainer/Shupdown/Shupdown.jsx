/////// hooks
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

////// imgs
import stopCircle from "../../../../assets/icons/stop-circle.svg";

////// components
import { Tooltip } from "@mui/material";
import Modals from "../../../../common/Modals/Modals";
import ConfirmModal from "../../../../common/ConfirmModal/ConfirmModal";

////// helpers

////// fns
import {
  getStatusVMReq,
  logsActionsVM_FN,
  shutdownContainerFN,
  updateStatusActionVM_Req,
} from "../../../../store/reducers/actionsContaiersSlice";
import {
  getContainers,
  getContainersInMenu,
} from "../../../../store/reducers/requestSlice";

/////// style
import "./style.scss";

const Shupdown = ({ item }) => {
  const { guid, vm_id, vm_name, status_action_shupdown } = item;

  const dispatch = useDispatch();
  const intervalRef = useRef(null);

  const { logsActionsVM } = useSelector((state) => state.actionsContaiersSlice);
  const { activeUserService } = useSelector(
    (state) => state.actionsContaiersSlice
  );
  const { activeHost } = useSelector((state) => state.stateSlice);
  const [dataShupdown, setDataShupdown] = useState({});
  const [viewLogs, setViewLogs] = useState({});

  const openModalBackUpFN = async () => {
    setDataShupdown({ name: `${vm_id} - ${vm_name}`, guid });
    if (!!status_action_shupdown) setViewLogs(true);
    else setViewLogs(false);
  };

  const shutdownContainer = async () => {
    const res = await dispatch(shutdownContainerFN(dataShupdown)).unwrap();
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
      if (!!dataShupdown.guid && !!status_action_shupdown) {
        if (intervalRef.current) return; // Если интервал уже запущен, не запускаем новый
        intervalRef.current = setInterval(async () => {
          try {
            const sendData = { upid: item?.shupdown_upid, guid: item?.guid };
            const res = await dispatch(getStatusVMReq(sendData)).unwrap();
            if (res.data.exitstatus == "OK" || res.data.status == "stopped") {
              const name = "status_action_shupdown";
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
            console.error("❌ Ошибка в getStatusVMReq:", error);
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
  }, [dataShupdown.guid, dispatch, item]);

  const closeModal = () => {
    dispatch(logsActionsVM_FN([]));
    setDataShupdown({});
  };

  return (
    <div className="shupdownActions">
      <div className="shupdownActions__action">
        <Tooltip title="Мягкое выключение" placement="top">
          <button onClick={openModalBackUpFN}>
            <img src={stopCircle} alt="#" />
          </button>
        </Tooltip>
        <ConfirmModal
          state={!!dataShupdown.guid && !!!status_action_shupdown && !viewLogs}
          title={`Отключение ${dataShupdown.name}`}
          yes={shutdownContainer}
          no={closeModal}
        />
      </div>
      <div className="shupdownActions__logs">
        <Modals
          openModal={!!dataShupdown.guid && viewLogs}
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
    </div>
  );
};

export default Shupdown;
