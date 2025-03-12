//////// hooks
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useState } from "react";

///// style
import "./style.scss";

////// components
import Modals from "../../common/Modals/Modals";

////// fns
import { viewModalLogFn } from "../../store/reducers/logsVmSlice";

////// icons
import download from "../../assets/icons/download.svg";
import repeat from "../../assets/icons/repeat.svg";
import playCircle from "../../assets/icons/play-circle.svg";
import warning from "../../assets/icons/warning.svg";

const ModalsListLogs = () => {
  const dispatch = useDispatch();

  const { viewModalLog } = useSelector((state) => state.logsVmSlice);
  const [listBtn, setListBtn] = useState([
    { name: "Stop", id: 3, bool: true },
    { name: "Restart", id: 1, bool: false },
    { name: "Skip ", id: 2, bool: false },
    { name: "Stop all ", id: 4, bool: false },
  ]);

  console.log(viewModalLog, "viewModalLog");

  const closeModal = () => {
    dispatch(viewModalLogFn({}));
    setListBtn([
      { name: "Stop", id: 3, bool: true },
      { name: "Restart", id: 1, bool: false },
      { name: "Skip ", id: 2, bool: false },
      { name: "Stop all ", id: 4, bool: false },
    ]);
  };

  const clickBtn = (item) => {
    const new_list = listBtn?.map((i) => {
      if (i.id == item.id) return { ...i, bool: true };
      else return { ...i, bool: false };
    });
    setListBtn(new_list);
  };


  return (
    <div className="logsVms">
      <div className="types">
        {listBtn?.map((i) => (
          <button
            className={i.bool ? "activeBtn" : ""}
            onClick={() => clickBtn(i)}
          >
            {i?.name}
          </button>
        ))}
      </div>
      <div className="infoLog">
        <p>
          starting new backup job: vzdump 300015 --node cluster03 --storage
          px-huawei --mode snapshot --compress zstd --remove 0
        </p>
        <p>Starting Backup of VM 300015 (lxc)</p>
        <p>Backup started at 2025-03-12 19:25:29</p>
        <p>status = stopped</p>
        <p>backup mode: stop</p>
        <p>
          starting new backup job: vzdump 300015 --node cluster03 --storage
          px-huawei --mode snapshot --compress zstd --remove 0
        </p>
        <p>Starting Backup of VM 300015 (lxc)</p>
        <p>Backup started at 2025-03-12 19:25:29</p>
        <p>status = stopped</p>
        <p>backup mode: stop</p>
        <p>
          starting new backup job: vzdump 300015 --node cluster03 --storage
          px-huawei --mode snapshot --compress zstd --remove 0
        </p>
        <p>Starting Backup of VM 300015 (lxc)</p>
        <p>Backup started at 2025-03-12 19:25:29</p>
        <p>status = stopped</p>
        <p>backup mode: stop</p>
      </div>
    </div>
  );
};

export default ModalsListLogs;
