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

/////// style
import "./style.scss";

const ViewEveryTasks = ({ content }) => {
  const dispatch = useDispatch();

  const objClass = {
    0: {
      tag: <PendingActionsIcon sx={{ width: 19, height: 19, margin: "2px" }} />,
      text: "Ожидание",
    },
    1: {
      tag: (
        <TaskAltIcon
          sx={{ width: 21, height: 21, fill: "rgba(29, 174, 29, 0.912)" }}
        />
      ),
      text: "Успешно выполнен",
    },
    2: {
      tag: (
        <div className="errIcon">
          <ErrorOutlineIcon sx={{ width: 17, height: 17, fill: "red" }} />
        </div>
      ),
      text: "Ожидание",
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

  console.log(content, "content");

  return (
    <div
      className={`viewEveryTasks`}
      onClick={editFN}
      style={{ background: content?.colorss }}
    >
      <p>
        {content?.command}, {content?.vm_name}, {content?.description}
        <div className={`icons ${content?.status == 0 ? "" : "shadow"}`}>
          <Tooltip title={objClass?.[content?.status]?.text} placement="top">
            {objClass?.[content?.status]?.tag}
          </Tooltip>
        </div>
      </p>
      {/* <span>{content?.command}</span>
      <b>{content?.description}</b> */}
    </div>
  );
};
export default ViewEveryTasks;
