import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { TableVirtuoso } from "react-virtuoso";
import {
  getLogVmsReq,
  getLogVmsReqFn,
  viewActiveStackFn,
} from "../../store/reducers/logsVmSlice";
import {
  getLogBackUpReq,
  logsActionsVM_FN,
} from "../../store/reducers/actionsContaiersSlice";

///// style
import "./style.scss";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

import CheckIcon from "@mui/icons-material/Check";
import MiniLoader from "../../common/MiniLoader/MiniLoader";

////// icons
import download from "../../assets/icons/download.svg";
import repeat from "../../assets/icons/repeat.svg";
import playCircle from "../../assets/icons/play-circle.svg";
import stopCircle from "../../assets/icons/stop-circle.svg";
import warningWhite from "../../assets/icons/warningWhite.svg";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ArrowRight from "@mui/icons-material/ArrowForward";

////// components
import CrudStack from "../../components/CloneLogsPage/CrudStack/CrudStack";
import ViewLogs from "../../components/CloneLogsPage/ViewLogs/ViewLogs";

const CloneLogsPage = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { listActionsVm, viewActiveStack } = useSelector(
    (state) => state.logsVmSlice
  );

  const getData = async () => {
    const res = await dispatch(getLogVmsReq()).unwrap();
    dispatch(viewActiveStackFn(res?.[0]));
    if (res?.[0]?.action_upid) {
      const send = {
        guid: res?.[0]?.guid_vm,
        upid: res?.[0]?.action_upid,
        host: res?.[0]?.host_guid,
      };
      dispatch(getLogBackUpReq(send));
    } else dispatch(logsActionsVM_FN([]));
  };

  useEffect(() => {
    getData(); // Первый запрос сразу

    const interval = setInterval(() => {
      dispatch(getLogVmsReq());
    }, 1000 * 5);

    return () => {
      clearInterval(interval);
      dispatch(getLogVmsReqFn([])); // Очистка данных при размонтировании
      dispatch(logsActionsVM_FN([])); /// очистка логов
    };
  }, [dispatch, pathname]); // Перезапуск при изменении `pathname`

  // console.log(listActionsVm, "listActionsVm");

  const st = { width: 19, height: 19, fill: "rgba(23, 224, 23, 0.397)" };

  const objStatusAll = {
    0: <MiniLoader />,
    1: <p>Ожидание</p>,
    2: <MiniLoader />,
    3: <CheckIcon sx={st} />,
    "-1": <p style={{ color: "rgba(255, 0, 0, 0.638)" }}>Ошибка</p>,
    "-2": <p>Пропущен</p>,
  };

  const clickTable = (item) => {
    // if (item?.guid == viewActiveStack?.guid) return;
    const send = {
      guid: item?.guid_vm,
      upid: item?.action_upid,
      host: item?.host_guid,
    };
    dispatch(getLogBackUpReq(send));
    dispatch(viewActiveStackFn(item));
  };

  const objIcon = {
    1: download,
    2: repeat,
    3: stopCircle,
    4: playCircle,
    7: warningWhite,
  };

  const objClass = { "-1": "errorTrStatus", "-2": "skipStack" };

  const activeStack = ({ guid }) => {
    if (viewActiveStack?.guid == guid) return "activeStack";
  };

  return (
    <div className="mainLogs">
      <div className="leftTable">
        <TableVirtuoso
          style={{ height: "100%", width: "100%" }}
          data={listActionsVm}
          overscan={200} //  Подгружаем элементы заранее
          fixedHeaderContent={(index, user) => (
            <tr className="header">
              <th style={{}}>№</th>
              <th style={{}}>Время начала</th>
              <th style={{}}>Время завершения</th>
              <th style={{}}>Хост</th>
              <th style={{}}>Описание</th>
              <th style={{}}>Статус</th>
              <th style={{}}>Хранилище</th>
              <th style={{}}>...</th>
            </tr>
          )}
          itemContent={(index, item) => (
            <React.Fragment key={index}>
              <td
                onClick={() => clickTable(item)}
                className={`${objClass?.[item?.action_status]} ${activeStack(
                  item
                )}`}
              >
                {listActionsVm?.length - index}
              </td>
              <td
                onClick={() => clickTable(item)}
                className={`${objClass?.[item?.action_status]} ${activeStack(
                  item
                )}`}
              >
                {format(item?.start_date, "yyyy-MM-dd HH:mm", { locale: ru })}
              </td>
              <td
                onClick={() => clickTable(item)}
                className={`${objClass?.[item?.action_status]} ${activeStack(
                  item
                )}`}
              >
                {format(item?.start_date, "yyyy-MM-dd HH:mm", { locale: ru })}
              </td>
              <td
                onClick={() => clickTable(item)}
                className={`${objClass?.[item?.action_status]} ${activeStack(
                  item
                )}`}
              >
                <div>
                  <p>{item?.start_host_name}</p>
                  {!!item?.end_host_name && (
                    <>
                      <ArrowRight sx={{ width: 17, height: 17 }} />
                      <p>{item?.end_host_name}</p>
                    </>
                  )}
                </div>
              </td>
              <td
                onClick={() => clickTable(item)}
                className={`${objClass?.[item?.action_status]} ${activeStack(
                  item
                )}`}
              >
                <div>
                  {item?.action_status == "-1" ? (
                    <div className="errIcon">
                      <ErrorOutlineIcon />
                      <ErrorOutlineIcon />
                    </div>
                  ) : (
                    <img src={objIcon?.[item?.action_codeid]} alt="" />
                  )}

                  <p>
                    vm {item.vm_id} - {item?.action_name}
                  </p>
                </div>
              </td>
              <td
                onClick={() => clickTable(item)}
                className={`${objClass?.[item?.action_status]} ${activeStack(
                  item
                )}`}
              >
                {objStatusAll?.[item?.action_status]}
              </td>
              <td
                onClick={() => clickTable(item)}
                className={`${objClass?.[item?.action_status]} ${activeStack(
                  item
                )}`}
              >
                {item?.storage}
              </td>
              <td
                onClick={() => clickTable(item)}
                className={`${objClass?.[item?.action_status]} ${activeStack(
                  item
                )}`}
              >
                <CrudStack item={item} />
              </td>
            </React.Fragment>
          )}
        />
      </div>
      <div className="rightTable">
        <ViewLogs />
      </div>
    </div>
  );
};

export default CloneLogsPage;
