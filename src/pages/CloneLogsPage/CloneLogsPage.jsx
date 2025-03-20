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
import boxWhite from "../../assets/icons/boxWhite.svg";
import warningWhite from "../../assets/icons/warningWhite.svg";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ArrowRight from "@mui/icons-material/ArrowForward";
import DeleteIcon from "../../assets/MyIcons/DeleteIcon";

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

  const st = { width: 19, height: 19, fill: "rgba(23, 224, 23, 0.397)" };

  const objStatusAll = {
    0: <MiniLoader />,
    1: <p style={{ color: "rgb(255 255 255 / 35%)" }}>Ожидание</p>,
    2: <MiniLoader />,
    3: <CheckIcon sx={st} />,
    "-1": <p style={{ color: "rgba(255, 0, 0, 0.638)" }}>Ошибка</p>,
    "-2": <p>Пропущен</p>,
  };

  const clickTable = (item) => {
    const send = {
      guid: item?.guid_vm,
      upid: item?.action_upid,
      host: item?.host_guid,
    };
    dispatch(viewActiveStackFn(item));
    dispatch(getLogBackUpReq(send));
  };

  const objIcon = {
    1: download,
    2: repeat,
    3: stopCircle,
    4: playCircle,
    7: warningWhite,
    8: boxWhite,
  };

  const objClass = { "-1": "errorTrStatus", "-2": "skipStack" };

  const activeStack = ({ guid }) => {
    if (viewActiveStack?.guid == guid) return "activeStack";
  };

  return (
    <div className="mainLogs">
      <div className="mainLogs__inner">
        <div className="leftTable">
          <TableVirtuoso
            style={{ height: "100%", width: "100%" }}
            data={listActionsVm}
            overscan={50} //  Подгружаем элементы заранее
            fixedHeaderContent={(index, user) => (
              <tr className="header">
                <th>№</th>
                <th style={{ width: "15%" }}>Время начала</th>
                <th style={{ width: "15%" }}>Время завершения</th>
                <th style={{ width: "15%" }}>Хост</th>
                <th style={{ width: "16%" }}>Описание</th>
                <th style={{ width: "8%" }}>Статус</th>
                <th style={{ width: "15%" }}>Хранилище</th>
                <th style={{ width: "15%" }}>Описание</th>
                <th>...</th>
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
                  {!!item?.start_date &&
                    format(item?.start_date, "yyyy-MM-dd HH:mm", {
                      locale: ru,
                    })}
                </td>
                <td
                  onClick={() => clickTable(item)}
                  className={`${objClass?.[item?.action_status]} ${activeStack(
                    item
                  )}`}
                >
                  {!!item?.end_date &&
                    format(item?.end_date, "yyyy-MM-dd HH:mm", { locale: ru })}
                </td>
                <td
                  onClick={() => clickTable(item)}
                  className={`${objClass?.[item?.action_status]} ${activeStack(
                    item
                  )}`}
                >
                  <div>
                    <p>
                      {!!item?.end_host_name
                        ? item?.end_host_name
                        : item?.start_host_name}
                    </p>
                  </div>
                </td>
                <td
                  onClick={() => clickTable(item)}
                  className={`${objClass?.[item?.action_status]} ${activeStack(
                    item
                  )}`}
                  style={{ width: "15%" }}
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
                      vm {!!item?.new_id ? item?.new_id : item.vm_id} -{" "}
                      {item?.action_name}
                    </p>
                  </div>
                </td>
                <td
                  onClick={() => clickTable(item)}
                  className={`${objClass?.[item?.action_status]} ${activeStack(
                    item
                  )}`}
                  style={{ width: "8%" }}
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
                  className={`${objClass?.[item?.action_status]} ${activeStack(
                    item
                  )}`}
                >
                  <p className="comment">{item?.comment}</p>
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
    </div>
  );
};

export default CloneLogsPage;
