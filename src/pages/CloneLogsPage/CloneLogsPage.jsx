import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { TableVirtuoso } from "react-virtuoso";
import { getLogVmsReq, getLogVmsReqFn } from "../../store/reducers/logsVmSlice";

///// style
import "./style.scss";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

import CheckIcon from "@mui/icons-material/Check";
import MiniLoader from "../../common/MiniLoader/MiniLoader";

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
  const objMigration = {
    0: <CheckIcon sx={st} />,
    1: <MiniLoader />,
    "-1": <p>Ошибка</p>,
  };

  const objStatusAll = {
    0: "...",
    1: <MiniLoader />,
    2: <MiniLoader />,
    3: <CheckIcon sx={st} />,
    "-1": <p>Ошибка</p>,
  };

  return (
    <div className="mainLogs">
      <TableVirtuoso
        style={{ height: "100%", width: "100%" }}
        data={listActionsVm}
        overscan={200} //  Подгружаем элементы заранее
        fixedHeaderContent={(index, user) => (
          <tr className="header">
            <th style={{}}>№</th>
            <th style={{}}>Время начала</th>
            <th style={{}}>Время завершения</th>
            <th style={{}}>Номер Vm</th>
            <th style={{}}>Статус</th>
            <th style={{}}>Выбранное хранилище</th>

            <th style={{}}>Бэкап</th>
            <th style={{}}>Восстановление</th>
            <th style={{}}>Отключение</th>
            <th style={{}}>Включение</th>
          </tr>
        )}
        itemContent={(index, item) => (
          <React.Fragment
            key={index}
            className={item?.status_migration == -1 ? "errorTrStatus" : ""}
          >
            <td className={item?.status_migration == -1 ? "errorTrStatus" : ""}>
              {listActionsVm?.length - index}
            </td>
            <td className={item?.status_migration == -1 ? "errorTrStatus" : ""}>
              {format(item.date, "yyyy-MM-dd HH:mm", { locale: ru })}
            </td>
            <td className={item?.status_migration == -1 ? "errorTrStatus" : ""}>
              {format(item.date, "yyyy-MM-dd HH:mm", { locale: ru })}
            </td>
            <td className={item?.status_migration == -1 ? "errorTrStatus" : ""}>
              {item.vm_id}
            </td>
            <td
              className={item?.status_migration == -1 ? "errorTrStatus" : ""}
              style={{ color: item?.status_migration == "-1" && "#fff" }}
            >
              {objMigration?.[item?.status_migration]}
            </td>
            <td className={item?.status_migration == -1 ? "errorTrStatus" : ""}>
              {item.type_storage}
            </td>
            <td className={item?.status_migration == -1 ? "errorTrStatus" : ""}>
              {objStatusAll?.[item.backup_status]}
            </td>
            <td className={item?.status_migration == -1 ? "errorTrStatus" : ""}>
              {objStatusAll?.[item.restore_status]}
            </td>
            <td className={item?.status_migration == -1 ? "errorTrStatus" : ""}>
              {objStatusAll?.[item.stop_status]}
            </td>
            <td className={item?.status_migration == -1 ? "errorTrStatus" : ""}>
              {objStatusAll?.[item.start_status]}
            </td>
          </React.Fragment>
        )}
      />
    </div>
  );
};

export default CloneLogsPage;
