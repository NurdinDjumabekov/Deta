import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { TableVirtuoso } from "react-virtuoso";
import {
  getLogVmsReq,
  getLogVmsReqFn,
  viewModalLogFn,
} from "../../store/reducers/logsVmSlice";

///// style
import "./style.scss";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

import CheckIcon from "@mui/icons-material/Check";
import MiniLoader from "../../common/MiniLoader/MiniLoader";
import ModalsListLogs from "../../components/CloneLogsPage/ModalsListLogs";

////// icons
import download from "../../assets/icons/download.svg";
import repeat from "../../assets/icons/repeat.svg";
import playCircle from "../../assets/icons/play-circle.svg";
import warning from "../../assets/icons/warning.svg";

const CloneLogsPage = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { listActionsVm } = useSelector((state) => state.logsVmSlice);

  useEffect(() => {
    dispatch(getLogVmsReq()); // Первый запрос сразу

    const interval = setInterval(() => {
      dispatch(getLogVmsReq());
    }, 1000 * 5);

    return () => {
      clearInterval(interval);
      dispatch(getLogVmsReqFn([])); // Очистка данных при размонтировании
    };
  }, [dispatch, pathname]); // Перезапуск при изменении `pathname`

  console.log(listActionsVm, "listActionsVm");

  const st = { width: 19, height: 19, fill: "rgba(23, 224, 23, 0.397)" };

  const objStatusAll = {
    0: <MiniLoader />,
    1: <MiniLoader />,
    2: <MiniLoader />,
    3: <CheckIcon sx={st} />,
    "-1": <p>Ошибка</p>,
  };

  const clickTable = (item) => {
    dispatch(viewModalLogFn({ ...item, action_type: 1 })); /// обычный просмотр
  };
  const objIcon = { 1: download, 2: repeat, 3: warning, 4: playCircle };

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
            </tr>
          )}
          itemContent={(index, item) => (
            <React.Fragment key={index}>
              <td
                onClick={() => clickTable(item)}
                className={item?.action_status == -1 ? "errorTrStatus" : ""}
              >
                {listActionsVm?.length - index}
              </td>
              <td
                onClick={() => clickTable(item)}
                className={item?.action_status == -1 ? "errorTrStatus" : ""}
              >
                {format(item?.start_date, "yyyy-MM-dd HH:mm", { locale: ru })}
              </td>
              <td
                onClick={() => clickTable(item)}
                className={item?.action_status == -1 ? "errorTrStatus" : ""}
              >
                {format(item?.start_date, "yyyy-MM-dd HH:mm", { locale: ru })}
              </td>
              <td
                onClick={() => clickTable(item)}
                className={item?.action_status == -1 ? "errorTrStatus" : ""}
              >
                {item?.host_name}
              </td>
              <td
                onClick={() => clickTable(item)}
                className={item?.action_status == -1 ? "errorTrStatus" : ""}
              >
                <div>
                  <img src={objIcon?.[item?.action_codeid]} alt="" />
                  <p>
                    vm {item.vm_id} - {item?.action_name}
                  </p>
                </div>
              </td>
              <td
                onClick={() => clickTable(item)}
                className={item?.action_status == -1 ? "errorTrStatus" : ""}
                style={{ color: item?.action_status == "-1" && "#fff" }}
              >
                {objStatusAll?.[item?.action_status]}
              </td>
              <td
                onClick={() => clickTable(item)}
                className={item?.action_status == -1 ? "errorTrStatus" : ""}
              >
                {item?.storage}
              </td>
            </React.Fragment>
          )}
        />
      </div>
      <div className="rightTable">
        <ModalsListLogs />
      </div>
    </div>
  );
};

export default CloneLogsPage;
