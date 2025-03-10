/////// hooks
import { useDispatch, useSelector } from "react-redux";
import React, { useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

////// components

////// helpers
import { listActionTime } from "../../../helpers/LocalData";

////// fns
import {
  activeTimeFN,
  getListAllComandsReq,
} from "../../../store/reducers/todosSlice";

////// icons

/////// style
import "./style.scss";

const ViewEveryTasks = ({ content }) => {
  const dispatch = useDispatch();

  const objClass = { 0: "pending", 1: "accessTodos", 2: "rejectTodos" };

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
      className={`viewEveryTasks ${
        objClass?.[content?.status] || "rejectTodos"
      }`}
      onClick={editFN}
    >
      <p>
        {content?.command}, {content?.vm_name}, {content?.description}
      </p>
      {/* <span>{content?.command}</span>
      <b>{content?.description}</b> */}
    </div>
  );
};
// ?.event?._def?.extendedProps
export default ViewEveryTasks;
