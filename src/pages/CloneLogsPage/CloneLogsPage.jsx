import { useSelector } from "react-redux";
import "./style.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updatedCloneLogs } from "../../store/reducers/requestSlice";
import { useLocation } from "react-router-dom";
import { getCloneLogs } from "../../store/reducers/virtualMachineSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
const CloneLogsPage = () => {
  const dispatch = useDispatch();
  const { listCloneLogs, listCallStack } = useSelector(
    (state) => state.virtualMachineSlice
  );
  const { pathname } = useLocation();

  console.log(listCloneLogs, "listCloneLogs");

  useEffect(() => {
    dispatch(getCloneLogs());

    const disconnectProv = dispatch(updatedCloneLogs());
    return () => {
      disconnectProv();
    };
  }, [pathname]);

  return (
    <div className="containerClone">
      <div className="hoverScroll">
        <h3>Стек очереди</h3>
        <TableContainer className="logsTable hoverScroll">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    width: "3%",
                    color: "#c0c0c0",
                    textAlign: "left",
                    padding: 0,
                  }}
                >
                  #
                </TableCell>
                <TableCell
                  style={{
                    width: "15%",
                    color: "#c0c0c0",
                    paddingVertical: 0,
                    paddingHorizontal: 3,
                  }}
                >
                  Время создания
                </TableCell>

                <TableCell
                  style={{
                    width: "60%",
                    color: "#c0c0c0",
                    paddingVertical: 0,
                    paddingHorizontal: 3,
                  }}
                >
                  Задача
                </TableCell>

                <TableCell
                  style={{
                    width: "15%",
                    color: "#c0c0c0",
                    paddingVertical: 0,
                    paddingHorizontal: 3,
                    textAlign: "center",
                  }}
                >
                  Статус
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listCallStack?.map((item, index) => (
                <TableRow
                  className="tableRow"
                  key={index}
                  sx={{ background: statusTask(item?.status) }}
                >
                  <TableCell style={{ width: "3%", padding: 0 }}>
                    <p>{listCallStack.length - index}</p>
                  </TableCell>
                  <TableCell style={{ width: "20%", padding: 0 }}>
                    <p>{item?.date_system}</p>
                  </TableCell>
                  <TableCell style={{ width: "70%", padding: 0 }}>
                    <p>{item?.task_name}</p>
                  </TableCell>
                  <TableCell
                    style={{
                      width: "15%",
                      padding: 0,
                      textAlign: item?.status == 1 ? "center" : "center",
                    }}
                  >
                    {item.status == 1 ? (
                      <CircularProgress style={{ width: 20, height: 20 }} />
                    ) : (
                      <p style={{ color: statusTaskStatus(item?.status) }}>
                        {item.status == 2 ? "Успешно" : "Ожидание"}
                      </p>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className="hoverScroll">
        <h3>Логи выполнения задач</h3>
        <TableContainer className="logsTable hoverScroll">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    width: "3%",
                    color: "#c0c0c0",
                    textAlign: "left",
                    padding: 0,
                  }}
                >
                  №
                </TableCell>
                <TableCell
                  style={{
                    width: "5%",
                    color: "#c0c0c0",
                    paddingVertical: 0,
                    paddingHorizontal: 3,
                  }}
                >
                  Время начало
                </TableCell>
                <TableCell
                  style={{
                    width: "5%",
                    color: "#c0c0c0",
                    paddingVertical: 0,
                    paddingHorizontal: 3,
                    textAlign: "center",
                  }}
                >
                  Время завершения
                </TableCell>
                <TableCell
                  style={{
                    width: "20%",
                    color: "#c0c0c0",
                    paddingVertical: 0,
                    paddingHorizontal: 3,
                  }}
                >
                  Задача
                </TableCell>
                <TableCell
                  style={{
                    width: "30%",
                    color: "#c0c0c0",
                    paddingVertical: 0,
                    paddingHorizontal: 3,
                  }}
                >
                  Описание задачи
                </TableCell>
                <TableCell
                  style={{
                    width: "7%",
                    color: "#c0c0c0",
                    paddingVertical: 0,
                    paddingHorizontal: 3,
                  }}
                >
                  Статус выполнения
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listCloneLogs?.map((item, index) => (
                <TableRow
                  className="tableRow"
                  key={index}
                  sx={{ background: statusTask(item?.status) }}
                >
                  <TableCell style={{ width: "3%", padding: 0 }}>
                    <p>{listCallStack.length - index}</p>
                  </TableCell>
                  <TableCell style={{ width: "7%", padding: 0 }}>
                    <p>{item?.start_date}</p>
                  </TableCell>
                  <TableCell
                    style={{
                      width: "6%",
                      padding: 0,
                      textAlign: item?.status == 1 ? "center" : "center",
                    }}
                  >
                    {item.status == 1 ? (
                      <CircularProgress style={{ width: 20, height: 20 }} />
                    ) : (
                      <p>{item?.end_date}</p>
                    )}
                  </TableCell>
                  <TableCell style={{ width: "20%", padding: 0 }}>
                    <p>{item?.status_task}</p>
                  </TableCell>
                  <TableCell style={{ width: "30%", padding: 0 }}>
                    <p>{item?.task_description}</p>
                  </TableCell>
                  <TableCell
                    style={{
                      width: "6%",
                      padding: 0,
                      textAlign: "center",
                    }}
                  >
                    {item.status == 1 ? (
                      <CircularProgress style={{ width: 13, height: 13 }} />
                    ) : (
                      <CheckOutlinedIcon
                        sx={{ width: 25, height: 25, fill: "#73c991" }}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default CloneLogsPage;

const statusTask = (status) => {
  if (status == 1) {
    return "#292d32";
  } else if (status == 2) {
    return "#292d32";
  } else if (status == 3) {
    return "#292d32";
  } else {
    return "#292d32";
  }
};

const statusTaskStatus = (status) => {
  if (status == 1) {
    return "#c0c0c0";
  } else if (status == 2) {
    return "#6bdd89";
  } else if (status == 3) {
    return "#ff00008c";
  } else {
    return "#c0c0c0";
  }
};
