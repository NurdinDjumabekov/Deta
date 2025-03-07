/////// hooks
import { useDispatch, useSelector } from "react-redux";
import React, { useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

////// components

////// helpers

////// fns

////// icons

/////// style
import "./style.scss";

const ViewEveryTasks = ({ content }) => {
  console.log(content, "content");

  const objClass = { 0: "pending", 1: "accessTodos", 2: "rejectTodos" };

  return (
    <div
      className={`viewEveryTasks ${
        objClass?.[content?.status] || "rejectTodos"
      }`}
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
