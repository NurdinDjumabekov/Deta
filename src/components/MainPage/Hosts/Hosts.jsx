/////// hooks
import React from "react";

/////// imgs
import del from "../../../assets/icons/delete.svg";
import diagram from "../../../assets/icons/diagram.svg";
import repeat from "../../../assets/icons/repeat.svg";
import edit from "../../../assets/icons/edit.svg";

////// styles
import "./style.scss";

/////// componets
import MemoryComp from "../MemoryComp/MemoryComp";
import { setActiveHost } from "../../../store/reducers/stateSlice";
import { useDispatch, useSelector } from "react-redux";

const Hosts = ({ item }) => {
  const { node_model, node_name, vmbr } = item;
  const { host_ip, node_comment, host_status, id } = item;
  const { percent, GB } = item;
  //////////////
  const { host_name, node_uptime_sec, guid } = item;
  const { array_storages } = item;
  const { storage_name } = item;

  // console.log(storage_content, "storage_content");

  const dispatch = useDispatch();

  const { activeHost } = useSelector((state) => state.stateSlice);

  const lisVmbr = vmbr?.split(",");

  const clickHost = () => dispatch(setActiveHost(guid));

  const err = host_status == 5 ? "lineError" : "";

  const active = activeHost == guid ? "activeHost" : "";

  return (
    <div className={`hostsMain ${err} ${active}`} onClick={clickHost}>
      <h4>{node_model}</h4>
      <div className="actions">
        <p>
          {host_name}(<b>{node_uptime_sec}</b>)
        </p>

        <button>
          <img src={repeat} alt="x" />
          <span className="moreInfo">Обновить данные хоста</span>
        </button>
        <button className="edit">
          <img src={edit} alt="x" />
          <span className="moreInfo">Изменить</span>
        </button>
        <button className="del">
          <img src={del} alt="x" />
          <span className="moreInfo">Удалить</span>
        </button>
      </div>

      <div className="vmbrBlock">
        {array_storages?.map((item, index) => (
          <div key={index}>
            <p>vmbr {index}</p>
            <img src={diagram} alt="0" />
            <span>{item?.storage_name}</span>
          </div>
        ))}
      </div>

      <p className="ip_host">{host_ip}</p>

      <MemoryComp percent={percent} GB={GB} />

      <p className="comment">{node_comment}</p>
    </div>
  );
};

export default Hosts;
