/////// hooks
import { useDispatch, useSelector } from "react-redux";
import React, { useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

////// components
import { Tooltip } from "@mui/material";

////// helpers
import { listActionTime } from "../../../helpers/LocalData";

////// fns
import {
  activeTimeFN,
  getListAllComandsReq,
} from "../../../store/reducers/todosSlice";

////// icons
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CheckIcon from "@mui/icons-material/Check";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

/////// style
import "./style.scss";

const ViewEveryTasks = ({ content }) => {
  const dispatch = useDispatch();

  const objClass = {
    0: {
      tag: <AccessTimeIcon sx={{ width: 18, height: 18, fill: "#fff" }} />,
      text: "Ожидание",
      background: "#1976d2",
    },
    1: {
      tag: <TaskAltIcon sx={{ width: 18, height: 18, fill: "#fff" }} />,
      text: "Успешно выполнен",
      background: "rgba(29, 174, 29, 0.912)",
    },
    2: {
      tag: (
        <div className="errIcon">
          <ErrorOutlineIcon sx={{ width: 17, height: 17, fill: "#fff" }} />
        </div>
      ),
      text: "Ошибка",
      background: "rgba(255, 0, 0, 0.393)",
    },
  };

  const editFN = async () => {
    const res = await dispatch(getListAllComandsReq()).unwrap();

    const interval_type = listActionTime?.find(
      (i) => i?.value == content?.interval_type
    );
    const comandObj = res?.find((i) => i?.guid == content?.guid_shedule_task);
    if (res?.length > 0) {
      const past = {
        guid: content?.guid,
        guid_task: content?.guid_shedule_task,
        time: content?.last_run_,
        action_type: 2,
        interval_type,
        comment: content?.comment,
        comand: {
          label: `${comandObj?.vm_name} - ${comandObj?.vm_name} - ${comandObj?.description}`,
          value: comandObj?.guid,
        },
      };
      dispatch(activeTimeFN(past));
    }
  };

  return (
    <div
      className={`viewEveryTasks`}
      onClick={editFN}
      style={{ background: content?.colorss }}
    >
      <p>
        {content?.command}, {content?.vm_name}, {content?.description}
        <div
          className={`icons `}
          style={{ background: objClass?.[content?.status]?.background }}
        >
          <Tooltip title={objClass?.[content?.status]?.text} placement="top">
            {objClass?.[content?.status]?.tag}
          </Tooltip>
        </div>
      </p>
    </div>
  );
};
export default ViewEveryTasks;
